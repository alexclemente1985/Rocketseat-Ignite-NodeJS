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
docker run -p 3333:3333 --name rentx-container rentx
```
ou
```
yarn docker:run
```

## Criação de container a partir da imagem do projeto usando docker-compose
> *Cria um container a partir da imagem do projeto, na porta 3333, usando o arquivo docker-compose, iniciando também todos os services relacionados*

```
docker-compose up --force-recreate
```
ou
```
yarn dcompose:up
```

## Verificação dos logs do container, caso se tenha utilizado -d no comando anterior

```
docker logs rentx-container -f
```

ou

```
yarn docker:logs
```

## Iniciando o container já anteriormente criado

```
docker start rentx-container
```

ou

```
yarn docker:start
```

## Parando o container em andamento

```
docker stop rentx-container
```

ou

```
yarn docker:stop
```

## Removendo o container

```
docker container rm rentx-container
```

ou

```
yarn docker:rmcontainer
```

## Removendo a imagem do server

```
docker image rm rentx
```

ou

```
yarn docker:rmimage
```

## Acessando o container
> *Caso se deseje verificar o conteúdo do container*

```
docker exec -it rentx-container /bin/bash
```

ou

```
yarn docker:exec
```

## Removendo o container com docker-compose
> *Remove todos os containers gerados pelo arquivo docker-compose após o comando "up"*

```
docker-compose down
```

ou

```
yarn dcompose:down
```

## Iniciando os containers do projeto com docker-compose
> *Inicia todos os container já criados anteriormente com o comando "docker-compose up"; executar na raiz do projeto* 

```
docker-compose start
```

ou

```
yarn dcompose:start
```

## TypeORM

### Versão
Projeto utiliza a versão 0.2.45, requisitando a criação de arquivo **ormconfig.json** na raiz do projeto.

```
yarn add typeorm@0.2.45 reflect-metadata
```

Requer também a instalação da tipagem para node

```
yarn add -D @types/node
```

É necessário também a alteração dos seguintes campos do arquivo **tsconfig.json**:
```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

### Banco de dados utilizado
Foi utilizado o postgres para o projeto.

```
yarn add pg
```

## Documentação do projeto

[swagger-doc](http://localhost:3333/api-docs/)