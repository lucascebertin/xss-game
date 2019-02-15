const { CronJob } = require('cron')
const puppeteer = require('puppeteer')

const main = async () => {

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium-browser',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  })
  const page = await browser.newPage()
  await page.goto(`${process.env.URL}/nivel/3/cadastrar`, { waitUntil: 'networkidle2' })
  await browser.close()
}

main()

new CronJob('*/15 * * * * *', () => {
  console.log(new Date())
  //1)Logar-se como admin no webapp
  //2)Procurar novos registros compartilhados com o admin
  //3)Executar loop para abrir registros com Puppeteer
  //4)Marcar com uma flag cada registro visitado
  //5)Notificar via terminal os links que foram visitados
} , null, true, 'America/Los_Angeles')
