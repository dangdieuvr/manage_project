import { Controller, Get, UseGuards, Req, Res, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express';
import {JwtGaurd} from '../auth/guard'
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
@Controller('users')
export class UserController {
  @UseGuards(JwtGaurd)
  @Get('me')
  getMe(
    @GetUser('') user:User,
  ){
    return user;
  }

  @Patch()
  editUser(){

  }
}
