# IamStore

Existem duas maneiras para rodar esse projeto:

## 1. Docker

Caso você possua docker na sua máquina, abra `Docker Desktop`, ou dê start no docker engine pelo terminal.

Abra um terminal no diretório raíz do projeto e rode:

```zsh
docker-compose up
```

Esse comando irá buildar duas imagens do docker e subir ambas as imagens, a aplicação se encontrará no endereço [http://localhost:4200/](http://localhost:4200/).

## 2. Node

Caso não tenha Docker instalado, mas tenha `Node` e `npm`:

Abra um terminal no diretório raíz do projeto e rode:

```zsh
npm run server
```

Em _outro_ terminal, no mesmo diretório, e rode:

```zsh
ng server
```

A aplicação se encontrará no endereço [http://localhost:4200/](http://localhost:4200/).

### Pontos de melhora no projeto

- Testes: o coverage de testes é bem baixo, infelizmente por uma limitação própria de conhecimento sobre o próprio angular.

- Padronização: alguns conceitos de ngModel, ReactiveForms, entre outros, são relativamente novos para mim, conforme fui criando a aplicação, fui aprendendo conceitos melhores e adaptando.
