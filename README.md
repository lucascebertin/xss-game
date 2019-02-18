# XSS Game

Este projeto tem como objetivo a importância de se preocupar com vulnerabilidades do tipo XSS.

Muitos sistemas e times negligenciam este tipo de problema por entenderem que é algo que se restringe em modificações visuais no cliente, o que não é verdade.

Ataques bem projetados vão de roubo de sessões logadas até execução de código com privilégios de root/admin.

Composto de três (3) desafios, você poderá executar XSS nas categorias a seguir:
- Reflected (refletido)
- Persistent (persistente)

Ao entrar na home do game, haverá um menu contendo o link dos desafios bem como a dificuldade e objetivo de cada um.

Divirtam-se, happy (real) hacking!

## Requisitos e dependências
- Nodejs 9.5.0 ou maior
- MongoDB 4.1.8
- Docker e Docker-compose

## Como rodar
Com docker-compose, simplesmente execute:
`docker-compose up`

E aguarde a aplicação ficar disponível em:
`localhost:1337`
