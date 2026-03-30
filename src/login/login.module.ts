import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Acc } from './entities/login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Acc])],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
