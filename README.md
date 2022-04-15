# Servidor NodeJS em Docker

## Rodando o projeto como desenvolvimento
```
ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts
```
ou
```
yarn dev
```

## Criação da imagem inicial
> *Permite criar uma imagem para o projeto*

Rodar na raiz do projeto:
```
docker build -t rentx .
```
ou 
```
yarn docker:build
```

## Criação de container a partir da imagem do projeto
> *Cria um container a partir da imagem do projeto, na porta 3333*

```
docker run -p 3333:3333 rentx
```
ou
```
yarn docker:run
```

## Documentação do projeto

[swagger-doc](http://localhost:3333/api-docs/)