import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),AuthModule, UserModule, PrismaModule, EmployeesModule],
})
export class AppModule {}
