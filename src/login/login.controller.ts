import { Controller,Get, Render } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService){}

    @Get()
    @Render('login/login')
    getLoginPage(){
        return{
            word: 'LoginPage',
            activeMenu: 'login'
        };
    }
    @Get('Register')
    @Render('login/register')
    getRegisterPage(){
        return{
            word: 'Register NA'
        };
    }
    @Get('forgetPass')
    @Render('login/forgetPass')
    getForgetPass(){
        return {
            title: 'ForgetPass'
        };
    }
}
