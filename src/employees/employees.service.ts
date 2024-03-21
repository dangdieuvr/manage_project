import { Injectable, SetMetadata, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionGuard } from './guards/premission.guard';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService,private jwtService: JwtService) {}
    @SetMetadata('permissions', ['user'])
    @UseGuards(PermissionGuard)
    async getAllEmployees(): Promise<User[]>{
        return this.prisma.user.findMany();
    }

}
