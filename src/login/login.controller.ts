import {
  Body,
  Controller,
  Get,
  Render,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { LoginService } from './login.service';
import type { Response } from 'express';
import type { MySessionData } from '../shop/interfaces/cart.interface';
import * as bcrypt from 'bcrypt';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @Render('login/login')
  getLoginPage() {
    return {
      word: 'LoginPage',
      activeMenu: 'login',
    };
  }

  @Post()
  async login(
    @Body() body: any,
    @Session() session: MySessionData,
    @Res() res: Response,
  ) {
    const user = await this.loginService.findUsername(body.user);
    let isMatch = false;
    if (user) {
      isMatch = await bcrypt.compare(body.password, user.password);
    }
    if (!user || !isMatch) {
      return res.render('login/login', {
        errorMsg: 'ชื่อ หรือ รหัสผ่านไม่ถูกต้อง',
        word: 'LoginPage',
        activeMenu: 'login',
      });
    }
    const payload = {
      sub: user.id,
      username: user.user,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    res.cookie('green-market', token, {
      httpOnly: true,
      maxAge: 3600000,
    });
    session.userId = user.id;
    session.username = user.user;
    session.role = user.role;
    return res.redirect('/shop');
  }

  @Get('logout')
  logout(@Session() session: any, @Res() res: Response) {
    session.destroy((err) => {
      console.log('Session destroyed');
    });
    return res.redirect('/login');
  }

  @Get('Register')
  @Render('login/register')
  getRegisterPage() {
    return {
      word: 'Register',
      activeMenu: 'login',
    };
  }

  @Post('Register')
  async register(@Body() body: any, @Res() res: Response) {
    try {
      // console.log('Data send from form', body);

      const hashlength = 10;
      const hashedPassword = await bcrypt.hash(body.password, hashlength);

      await this.loginService.createItem({
        name: body.name,
        lname: body.lname,
        email: body.email,
        user: body.user,
        password: hashedPassword,
        role: 'costomer',
      });
      return res.redirect('/login');
    } catch (error) {
      console.error('wrong on register: ', error);
    }
  }

  @Get('forgetPass')
  @Render('login/forgetPass')
  getForgetPass() {
    return {
      title: 'ForgetPass',
      activeMenu: 'login',
    };
  }

  @Post('search-user')
  @Render('login/register')
  async searchUser(@Body('searchName') searchName: string) {
    const foundUser = await this.loginService.findUsername(searchName);
    if (foundUser) {
      return { userAcc: foundUser, activeMenu: 'login' };
    } else {
      return { errorMsg: 'Not Found User', activeMenu: 'login' };
    }
  }

  @Post('update-user')
  async updateUser(@Body() body: any, @Res() res: Response) {
    await this.loginService.editItem({
      id: parseInt(body.id),
      password: body.password,
    });
    return res.redirect('/login/register');
  }
  @Post('check-password')
  async checkPassword(@Body() body: { password: string }) {
    const pass = body.password || '';
    let score = 0;
    let message = '';
    let colorClass = '';
    let widthClass = '';

    if (pass.length === 0) {
      return {
        score: 0,
        message: 'รอการพิมพ์...',
        colorClass: 'text-gray-500',
        widthClass: 'w-0 bg-gray-400',
      };
    }

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) {
      message = 'อ่อนแอ (Weak)';
      colorClass = 'text-red-500';
      widthClass = 'w-1/4 bg-red-500';
    } else if (score === 2) {
      message = 'ปานกลาง (Fair)';
      colorClass = 'text-orange-500';
      widthClass = 'w-2/4 bg-orange-400';
    } else if (score === 3) {
      message = 'ดี (Good)';
      colorClass = 'text-yellow-500';
      widthClass = 'w-3/4 bg-yellow-400';
    } else {
      message = 'ปลอดภัยมาก (Strong)';
      colorClass = 'text-green-600';
      widthClass = 'w-full bg-green-500';
    }

    return {
      score: score,
      message: message,
      colorClass: colorClass,
      widthClass: widthClass,
    };
  }
}
