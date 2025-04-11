import dgram from 'dgram';

const LOCAL_UDP_PORT = Number(process.env.UDP_PORT) || 12892;
const socket = dgram.createSocket('udp4');
socket.bind(LOCAL_UDP_PORT);

export async function sendMessage(
  ip: string,
  port: string,
  message: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    socket.send(message, Number(port), ip, (err, bytes) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}
