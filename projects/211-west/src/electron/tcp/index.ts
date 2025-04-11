import net from 'net';

export async function sendMessage(
  ip: string,
  port: string,
  message: string
): Promise<void> {
  const client = new net.Socket();

  await new Promise<void>((resolve) =>
    client.connect({ host: ip, port: parseInt(port) }, () => resolve())
  );

  await new Promise<void>((resolve) =>
    client.write(message, (error) => {
      return resolve();
    })
  );

  await new Promise<void>((resolve) => client.end(() => resolve()));
}
