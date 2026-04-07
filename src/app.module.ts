import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { LoginModule } from './login/login.module';
import { ArticleModule } from './article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rejects } from 'assert';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'T12345678',
      database: process.env.DB_NAME || 'greenmarket',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      charset: 'utf8mb4',
      ssl: process.env.DB_SSL === 'true' ? {rejectUnauthorized:false} : false ,
    }),
    ShopModule,
    LoginModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
