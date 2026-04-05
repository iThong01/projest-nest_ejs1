import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Acc } from './entities/login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Acc]),
  JwtModule.register({
    secret: 'my-super-secret-jwt-key',
    signOptions: {expiresIn: '1h'}
  }),
  ],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
