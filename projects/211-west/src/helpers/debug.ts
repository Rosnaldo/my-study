export function debug(topic: string, ...data: unknown[]) {
  if (process.env.DEBUG) {
    console.log(`[DEBUG] - ${topic}`, JSON.stringify(data));
  }
}
