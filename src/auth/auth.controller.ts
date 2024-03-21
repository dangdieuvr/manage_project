import { Body, Controller, Get, HttpCode, HttpStatus,Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  singup(@Body() dto:AuthDto){
    return this.authService.signup(dto);
  }
  @Post('signin')
  singin(@Body() dto:AuthDto){
    return this.authService.signin(dto);
  }
  @Post('verify-token')
  async verifyToken(@Body('token') accessToken: string): Promise<any> {
    const user = await this.authService.getUserFromToken(accessToken);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}  