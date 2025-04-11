import { ArgumentType, Client } from 'node-osc';

export async function sendMessage(
  ip: string,
  port: string,
  path: string,
  data: Array<ArgumentType>
): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = new Client(ip, parseInt(port));
    client.send([path, ...data], (err) => {
      if (err) {
        client.close(() => reject(err));
        return;
      }

      client.close(() => resolve());
    });
  });
}
