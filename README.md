# XSS Game

```bash
XXXXXXX       XXXXXXX   SSSSSSSSSSSSSSS    SSSSSSSSSSSSSSS
X:::::X       X:::::X SS:::::::::::::::S SS:::::::::::::::S
X:::::X       X:::::XS:::::SSSSSS::::::SS:::::SSSSSS::::::S
X::::::X     X::::::XS:::::S     SSSSSSSS:::::S     SSSSSSS
XXX:::::X   X:::::XXXS:::::S            S:::::S
   X:::::X X:::::X   S:::::S            S:::::S
    X:::::X:::::X     S::::SSSS          S::::SSSS
     X:::::::::X       SS::::::SSSSS      SS::::::SSSSS
     X:::::::::X         SSS::::::::SS      SSS::::::::SS
    X:::::X:::::X           SSSSSS::::S        SSSSSS::::S
   X:::::X X:::::X               S:::::S            S:::::S
XXX:::::X   X:::::XXX            S:::::S            S:::::S
X::::::X     X::::::XSSSSSSS     S:::::SSSSSSSS     S:::::S
X:::::X       X:::::XS::::::SSSSSS:::::SS::::::SSSSSS:::::S
X:::::X       X:::::XS:::::::::::::::SS S:::::::::::::::SS
XXXXXXX       XXXXXXX SSSSSSSSSSSSSSS    SSSSSSSSSSSSSSS

        GGGGGGGGGGGGG
     GGG::::::::::::G
   GG:::::::::::::::G
  G:::::GGGGGGGG::::G
 G:::::G       GGGGGG  aaaaaaaaaaaaa      mmmmmmm    mmmmmmm       eeeeeeeeeeee
G:::::G                a::::::::::::a   mm:::::::m  m:::::::mm   ee::::::::::::ee
G:::::G                aaaaaaaaa:::::a m::::::::::mm::::::::::m e::::::eeeee:::::ee
G:::::G    GGGGGGGGGG           a::::a m::::::::::::::::::::::me::::::e     e:::::e
G:::::G    G::::::::G    aaaaaaa:::::a m:::::mmm::::::mmm:::::me:::::::eeeee::::::e
G:::::G    GGGGG::::G  aa::::::::::::a m::::m   m::::m   m::::me:::::::::::::::::e
G:::::G        G::::G a::::aaaa::::::a m::::m   m::::m   m::::me::::::eeeeeeeeeee
 G:::::G       G::::Ga::::a    a:::::a m::::m   m::::m   m::::me:::::::e
  G:::::GGGGGGGG::::Ga::::a    a:::::a m::::m   m::::m   m::::me::::::::e
   GG:::::::::::::::Ga:::::aaaa::::::a m::::m   m::::m   m::::m e::::::::eeeeeeee
     GGG::::::GGG:::G a::::::::::aa:::am::::m   m::::m   m::::m  ee:::::::::::::e
        GGGGGG   GGGG  aaaaaaaaaa  aaaammmmmm   mmmmmm   mmmmmm    eeeeeeeeeeeeee
```

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
- Docker e Docker-compose **

## Via docker-compose
Simplesmente execute:
`docker-compose up`

E aguarde a aplicação ficar disponível em:
`localhost:1337`
