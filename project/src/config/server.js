export const serverConfig = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};