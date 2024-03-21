import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true; // Không yêu cầu quyền truy cập cụ thể
    }
    
    // Lấy thông tin người dùng từ request
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    let user;
    try {
      // Giải mã token và lấy thông tin người dùng từ payload
      const decodedToken = this.jwtService.verify(token);
      user = decodedToken; // Ở đây giả sử thông tin người dùng được lưu trong payload của token
    } catch (error) {
      return false; // Token không hợp lệ
    }

    // Kiểm tra xem người dùng có quyền truy cập hay không
    if (!user || !user.permission || !permissions.includes(user.permission)) {
      return false; // Người dùng không có quyền truy cập
    }
    if (user.permission === 'user') {
        // Thêm điều kiện kiểm tra nếu người dùng là user thì mới được phép
        // Ví dụ: chỉ cho phép user liệt kê nhân viên
        if (context.getHandler().name === 'getAllEmployees') {
          return true; // Cho phép user liệt kê nhân viên
        } else {
          return false; // Các phương thức khác không cho phép user truy cập
        }
      }
    return true; // Người dùng có quyền truy cập
  }
}