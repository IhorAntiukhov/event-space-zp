import {
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { UsersService } from "src/users/users.service";

export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException("Invalid token.");
    }

    const user: { id: string } = await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow("JWT_SECRET_KEY"),
    });

    const existingUser = await this.usersService.findById(user.id);

    if (!existingUser) {
      throw new NotFoundException("User was not found.");
    }

    return true;
  }

  private extractTokenFromRequest(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : null;
  }
}
