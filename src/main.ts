import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'));

  app.setBaseViewsDir(join(process.cwd(), 'views'));

  app.setViewEngine('ejs');

  app.use(cookieParser());

  app.use(
    session({
      secret: 'my-secret-key-shop',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
