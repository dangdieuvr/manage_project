import { AuthService } from './../auth/auth.service';
import { JwtGaurd } from './../auth/guard/jwt.gaurd';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';


@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService,) {}
  @Get('GetAll')
  async getAllEmployees(): Promise<User[]> {
    return this.employeeService.getAllEmployees();
  }
  
}
