const { CronJob } = require('cron')
const puppeteer = require('puppeteer')
const axios = require('axios')
const querystring = require('querystring')


// TODO: Fazer com que o admin consiga relogar caso o JWT expire (depois de 24hrs logado)

const main = async () => {
  console.log('** Iniciando chrome **')
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME || 'chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  })
  const page = await browser.newPage()

  console.log('Acessando página de cadastro')
  await page.goto(`${process.env.URL}/nivel/3/cadastrar`, { waitUntil: 'networkidle2' })
  console.log('- OK')

  const email = 'hack@me.plz'
  const senha = '@h4ckM3Plz$#%'
  const elementoNome = await page.waitForSelector('#nome')
  const elementoEmail = await page.waitForSelector('#email')
  const elementoSenha = await page.waitForSelector('#senha')
  const elementoConfirmacaoDeSenha = await page.waitForSelector('#confirme')

  await elementoNome.type('admin')
  await elementoEmail.type(email)
  await elementoSenha.type(senha)
  await elementoConfirmacaoDeSenha.type(senha)

  console.log('Tentando criar cadastro como admin')
  const botaoSubmit = await page.waitForSelector('#submit')
  await botaoSubmit.click()

  await page.waitForNavigation({
    waitUntil: 'networkidle2'
  })

  const usuarioJaExiste = (await page.$('#erro') !== null)
  if(usuarioJaExiste) {
    console.log('- Usuário já criado')

    console.log('Tentando autenticar')
    await page.goto(`${process.env.URL}/nivel/3/autenticar`, { waitUntil: 'networkidle2' })

    const elementoEmailAutenticacao = await page.waitForSelector('#email')
    const elementoSenhaAutenticacao = await page.waitForSelector('#senha')
    const botaoSubmitAutenticacao = await page.waitForSelector('#submit')

    await elementoEmailAutenticacao.type(email)
    await elementoSenhaAutenticacao.type(senha)

    await botaoSubmitAutenticacao.click()

    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    })

    if((await page.$('#boas-vindas')) === null)
      return console.error('Problemas com autennticação do admin... encerrando execução!')

    const cookies = await page.cookies()
    const cookiesEmTexto = cookies.map(x => `${x.name}, ${x.path}, ${x.value}`)
    console.log(`- Autenticado com sucesso! c00kies: ${cookiesEmTexto}`)
  } else {
    console.log('Criando anotação com uma flag e mensagem de sucesso')

    const titulo = 'P4r4b&n$! V0c3 H4K30U o S1S7&M4'
    const descricao = '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    const cookies = await page.cookies()
    const cookiesEmTexto = cookies.map(x => `${x.name}=${x.value}`)

    axios.post(`${process.env.URL}/nivel/3/anotacao/`,
      querystring.stringify({
        titulo: titulo,
        descricao: descricao
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": cookiesEmTexto
        }
      }).then(function(response) {
        console.log('Anotação criada com sucesso')
      })
  }

  new CronJob('*/60 * * * * *', async () => {
    console.log(`Verificando links em ${new Date().toISOString()}`)
    await page.goto(`${process.env.URL}/nivel/3/anotacao`, {
      waitUntil: 'networkidle2'
    })

    const links = await page.evaluate(() => {
      const anchors = document.querySelectorAll('.visualizar');
      return [].map.call(anchors, a => a.href);
    })

    if(links && links.length > 0) {
      console.log(`- ${links.length} encontrados`)
      for(let i = 0; i < links.length; i++){
        const link = links[i]

        console.log(`- Visualizando link: ${link}`)

        await page.goto(link, {
          waitUntil: 'networkidle2'
        })

        console.log('- Link visitado')
      }
    } else {
      console.log('- Nenhum link encontrado...')
    }

    //1)Logar-se como admin no webapp
    //2)Procurar novos registros compartilhados com o admin
    //3)Executar loop para abrir registros com Puppeteer
    //4)Marcar com uma flag cada registro visitado
    //5)Notificar via terminal os links que foram visitados
  } , async () => {
    await browser.close()
  }, true, 'America/Los_Angeles', null, true)
}

main()

