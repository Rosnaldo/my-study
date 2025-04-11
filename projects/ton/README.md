# Ton API


## Description
O framework <strong>Nestjs</strong> foi escolhido por se tratar de uma pequena <strong>API Rest</strong>. Facilita bastante na construção de uma arquitetura limpa com injeções de dependencias, divisão de camadas <strong>(controller, use-case, service, repository)</strong> e isolamento de entidades. Além disso automatiza a construção do <strong>swagger</strong> e isola as bibliotecas com baixo acoplamento. As entidades estão com suas validações centralizadas <strong>(class-validator, mongoose, e swagger annotations).</strong> <br>
Os testes estão isolados em uma pasta à parte para não atrapalharem no build do projeto. Os testes unitários não cobrem todo o projeto porém estão cobrindo os pontos mais críticos onde concentram as regras de negócio. Os testes de integração estão marcados com <strong>*.2e2.spec.ts</strong> e carregam arquivos <strong>*.json</strong> na pasta <strong>seeds</strong> mockando os dados.<br>
As exceptions estão sendo tratados por um catchs globais e escopados. Erros do tipo <strong>HttpException</strong> retornam mensagens customizadas através dos endpoints.
Cenários de erros customizados que não são do tipo <strong>HttpException</strong> são tradados por catch escopados.
O <strong>Sentry</strong> monitora os erros que eventualmente estourem em produção.<br>
As configurações do webpack foram sugeridas pela propria documentação do Nestjs para ativar o modo <strong>(Hot-Module Replacement)</strong> permitindo rápido recarremento durante o desenvolvimento.<br>
O projeto está hostado pelo <strong>Heruko</strong>.<br>
Em questões de segurança estão configurados o cors,o helmet e o throttler. <br>
O <strong>helmet</strong> intercepta os endpoints globalmente e traz medidas de segurança configuradas por default. <br>
O <strong>Throttler</strong> protege contra ataques de massificação de requisições e individualiza por ip. <br>
O <strong>cors</strong> não possui restrições. <br>
No começo eu usei o <strong>fastify</strong> por questões de velocidade. Porém para implementar o <strong>serverless</strong> tive que retirar pois as bibliotecas adaptadoras estão com o suporte desatualizados. <br>
O <strong>serverless</strong> roda bem no modo offline.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# tests watch
$ npm run test:watch

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

```bash
# docker up
$ docker-compose up
```

## Serveless offline

```bash
# serveless
$ sls offline
```

## Deploy
https://ton-7653.herokuapp.com/docs
