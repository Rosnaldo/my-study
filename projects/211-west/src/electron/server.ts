import Koa from 'koa';
import KoaRouter from '@koa/router';
import KoaCors from '@koa/cors';
import { ArgumentType } from 'node-osc';

import { BrowserWindow } from 'electron';
import { Server } from 'http';
import * as UDP from './udp';
import * as TCP from './tcp';
import { sendLog } from './log';

const PORT = parseInt(process.env.PORT || '8088');

type KoaContext<TBody = unknown> = Koa.ParameterizedContext<
  Koa.DefaultState,
  Koa.DefaultContext &
    KoaRouter.RouterParamContext<Koa.DefaultState, Koa.DefaultContext> & {
      request: { body: TBody };
    },
  unknown
>;

interface IUDPMessageData {
  path: string;
  data: Array<ArgumentType>;
  messageType: UDP.UDPMessageType;
  model: {
    ip: string;
    port: string;
  };
}

interface ITCPMessageData {
  message: string;
  device: {
    ip: string;
    port: string;
  };
}

const jsonBodyParser = (ctx: KoaContext, next: Koa.Next) =>
  new Promise((resolve) => {
    let data = '';
    ctx.req.on('data', (chunk) => {
      data += chunk;
    });
    ctx.req.on('end', () => {
      ctx.request.body = JSON.parse(data);
      resolve(next());
    });
  });

export function initServer(
  mainWindowGetter: () => BrowserWindow | null
): Server {
  const app = new Koa();
  const router = new KoaRouter();

  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  });

  router.get('/heartbeat', (ctx, next) => {
    ctx.body = 'OK';
  });

  router.post('/message', jsonBodyParser, async (ctx, next) => {
    const mainWindow = mainWindowGetter();

    if (mainWindow) {
      sendLog(mainWindow, `Message: ${JSON.stringify(ctx.request.body)}`);
      mainWindow.webContents.send('api::message', ctx.request.body);
      ctx.body = 'OK';
    } else {
      ctx.body = 'ERROR: No window instance found.';
    }
  });

  router.post('/udp-message', jsonBodyParser, async (ctx, next) => {
    const mainWindow = mainWindowGetter();

    try {
      if (mainWindow) {
        const { path, data, model, messageType } = ctx.request
          .body as IUDPMessageData;

        try {
          sendLog(
            mainWindow,
            `UDP Message: ${JSON.stringify(ctx.request.body)}`
          );
          await UDP.sendMessage(messageType, model.ip, model.port, path, data);
        } catch (err) {
          sendLog(mainWindow, `Error: ${JSON.stringify(err)}`);
        }

        ctx.body = 'OK';
      } else {
        ctx.body = 'ERROR: No window instance found.';
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = `ERROR: ${(err as Error).message}`;
    }
  });

  router.post('/tcp-message', jsonBodyParser, async (ctx, next) => {
    const mainWindow = mainWindowGetter();

    try {
      if (mainWindow) {
        const { message, device } = ctx.request.body as ITCPMessageData;

        sendLog(mainWindow, `TCP Message: ${JSON.stringify(ctx.request.body)}`);

        TCP.sendMessage(device.ip, device.port, message).catch((err) =>
          sendLog(mainWindow, `Error: ${JSON.stringify(err)}`)
        );

        ctx.body = 'OK';
      } else {
        ctx.body = 'ERROR: No window instance found.';
      }
    } catch (err) {
      console.error(`Init server error. ${(err as Error).message}`);
      ctx.status = 500;
      ctx.body = `ERROR: ${(err as Error).message}`;
    }
  });

  app.use(KoaCors());
  app.use(router.routes()).use(router.allowedMethods());

  const server = app.listen(PORT);

  return server;
}
