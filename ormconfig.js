module.exports = {
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true, // dev only
  logging: false,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
};