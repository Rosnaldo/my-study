export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  namespace: 'ton.com.br',
  key: 'visits',
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
})
