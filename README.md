# Servidor NodeJS em Docker - RentX

## Resumo do projeto
Server NodeJS responsável pelo gerenciamento de aluguéis de veículos.

## Regras de negócio da aplicação
> **_Legenda:_**
>> **RF**: *Requisito Funcional;*
>> **RNF**: *Requisito Não-Funcional;*
>> **RN**: *Regras de Negócio;*

### Cadastro de carro
**RF**
- Deve ser possível cadastrar um novo carro;

**RN**
- Não deve ser possível cadastrar um carro com placa já existente;
- Não deve ser possível alterar a placa de um carro já cadastrado;
- Carro deve ser cadastrado, por padrão, com disponibilidade;
- O usuário responsável pelo cadastro deve ser um usuário administrador;

### Listagem de carros
**RF**
- Deve ser possível listar todos os carros disponíveis, podendo realizar filtros por **_nome da categoria_**, **_nome da marca_** ou **_nome do carro_**;

**RN**
- O usuário não precisa estar logado no sistema para realização da listagem de carros;

### Cadastro de Especificação no carro
**RF**
- Deve ser possível cadastrar uma especificação para um carro;

**RN**
- Não deve ser possível cadastrar uma especificação para carro não cadastrado ou já existente no mesmo carro;
- O usuário responsável pelo cadastro deve ser um **_usuário administrador_**;

### Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro;

**RNF**
- Utilizar o multer para upload dos arquivos;

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- O usuário responsável pelo cadastro deve ser um **_usuário administrador_**;

### Aluguel de carro
**RF**
- Deve ser possível cadastrar um aluguel;

**RN**
- O aluguel deve ter duração mínima de 24 horas;
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
- O usuário deve estar logado na aplicação;
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível;

### Devolução de carro
**RF**
- Deve ser possível realizar a devolução de um carro;

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrada diária completa;
- Ao realizar a devolução, o carro e o usuário envolvidos deverão ser liberados para outro aluguel;
- Ao realizar a devolução, deverá ser calculado o total do aluguel;
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrada multa proporcional aos dias de atraso;
- Caso haja multa, deverá ser somada ao total do aluguel;
- O usuário deve estar logado na aplicação;

### Listagem de Aluguéis para usuário
**RF**
- Deve ser possível realizar a busca de todos os aluguéis para o usuário;

**RN**
- O usuário deve estar logado na aplicação;

### Recuperar Senha
**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail;
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha;
- O usuário deve conseguir inserir uma nova senha;

**RN**
- O usuário precisa informar uma nova senha;
- O link enviado para a recuperação deve expirar em 3 horas;


## Informações Gerais para Utilização do Server

### Rodando o projeto em desenvolvimento
```
ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts
```
ou
```
yarn dev
```

### Criação da imagem Docker inicial
> *Permite criar uma imagem para o projeto*

Rodar na raiz do projeto:
```
docker build -t rentx .
```
ou 
```
yarn docker:build
```

### Criação de container a partir da imagem do projeto
> *Cria um container a partir da imagem do projeto, na porta 3333*

```
docker run -p 3333:3333 --name rentx-container rentx
```
ou
```
yarn docker:run
```

### Criação de container a partir da imagem do projeto usando docker-compose
> *Cria um container a partir da imagem do projeto, na porta 3333, usando o arquivo docker-compose, iniciando também todos os services relacionados*

```
docker-compose up --force-recreate
```
ou
```
yarn dcompose:up
```

### Verificação dos logs do container, caso se tenha utilizado -d no comando anterior

```
docker logs rentx-container -f
```

ou

```
yarn docker:logs
```

### Iniciando o container já anteriormente criado

```
docker start rentx-container
```

ou

```
yarn docker:start
```

### Parando o container em andamento

```
docker stop rentx-container
```

ou

```
yarn docker:stop
```

### Removendo o container

```
docker container rm rentx-container
```

ou

```
yarn docker:rmcontainer
```

### Removendo a imagem do server

```
docker image rm rentx
```

ou

```
yarn docker:rmimage
```

### Acessando o container
> *Caso se deseje verificar o conteúdo do container*

```
docker exec -it rentx-container /bin/bash
```

ou

```
yarn docker:exec
```

### Removendo o container com docker-compose
> *Remove todos os containers gerados pelo arquivo docker-compose após o comando "up"*

```
docker-compose down
```

ou

```
yarn dcompose:down
```

### Iniciando os containers do projeto com docker-compose
> *Inicia todos os container já criados anteriormente com o comando "docker-compose up"; executar na raiz do projeto* 

```
docker-compose start
```

ou

```
yarn dcompose:start
```

### TypeORM

#### Versão
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

#### Banco de dados utilizado
Foi utilizado o postgres para o projeto.

```
yarn add pg
```

## Documentação do projeto no Swagger

[swagger-doc](http://localhost:3333/api-docs/)