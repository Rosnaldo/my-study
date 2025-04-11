export default () => ({
  port: parseInt(process.env.PORT, 10) || 4002,
  domain: process.env.DOMAIN_REST || 'http://localhost:3001',
})
