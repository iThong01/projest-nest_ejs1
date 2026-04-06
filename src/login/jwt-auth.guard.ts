import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookie['green-market'];
    if (!token) {
      throw new UnauthorizedException('plz Login to Green Market');
      request.res.redirect('/login');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'my-super-secret-jwt-key',
      });
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException(' เซสชันหมดอายุ หนือ token ไม่ถูกต้อง');
    }
    return true;
  }
}
