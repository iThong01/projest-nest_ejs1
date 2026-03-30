import { Body, Controller, Get, Render, Post, Res, Session } from '@nestjs/common';
import { LoginService } from './login.service';
import type { Response } from 'express';
import type { MySessionData } from '../shop/interfaces/cart.interface';

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

    @Post()
    async login(
        @Body() body: any,
        @Session() session: MySessionData,
        @Res() res: Response
    ) {
        const user = await this.loginService.findUsername(body.user);
        if (user && user.password === body.password) {
            session.userId = user.id;
            session.username = user.user;
            session.role = user.role;
            return res.redirect('/shop');
        } else {
            return res.render('login/login', {
                errorMsg: 'ชื่อ หรือ รหัสผ่านไม่ถูกต้อง',
                word: 'LoginPage',
                activeMenu: 'login'
            });
        }
    }

    @Get('logout')
    logout(
        @Session() session: any,
        @Res() res: Response
    ) {
        session.destroy((err) => {
            console.log('Session destroyed');
        });
        return res.redirect('/login');
    }

    @Get('Register')
    @Render('login/register')
    getRegisterPage(){
        return{
            word: 'Register',
            activeMenu: 'login'
        };
    }

    @Post('Register')
    async register(
        @Body() body: any,
        @Res() res: Response
    ) {
        await this.loginService.createItem({
            name: body.name,
            lname: body.lname,
            email: body.email,
            user: body.user,
            password: body.password,
            role: 'costomer'
        });
        return res.redirect('/login');
    }

    @Get('forgetPass')
    @Render('login/forgetPass')
    getForgetPass(){
        return {
            title: 'ForgetPass',
            activeMenu: 'login'
        };
    }

    @Post('search-user')
    @Render('login/register')
    async searchUser(@Body('searchName') searchName: string){
        const foundUser = await this.loginService.findUsername(searchName);
        if(foundUser){
            return {userAcc: foundUser, activeMenu: 'login'};
        }else{
            return {errorMsg:'Not Found User', activeMenu: 'login'};
        }
    }

    @Post('update-user')
    async updateUser(
        @Body() body:any,
        @Res() res: Response
    ){
        await this.loginService.editItem({
            id: parseInt(body.id),
            password: body.password
        });
        return res.redirect('/login/register')
    }
}