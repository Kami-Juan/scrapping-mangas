export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: process.env.JWT_KEY,
  typeBD: process.env.TYPE_DATABASE,
});