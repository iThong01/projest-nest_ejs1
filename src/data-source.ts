import 'reflect-metadata';
    import { DataSource } from 'typeorm';
    import * as dotenv from 'dotenv';
    dotenv.config();
   
    export const AppDataSource = new DataSource({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'T12345678',
      database: process.env.DB_NAME || 'greenmarket',
      synchronize: false,
      logging: false,
      entities: ['src/**/*.entity{.ts,.js}'],
      migrations: ['src/migrations/**/*{.ts,.js}'],
      subscribers: [],
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    });