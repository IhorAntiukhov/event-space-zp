import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignUpDto } from "./dto/signUp.dto";
import { UsersService } from "src/users/users.service";
import { compare, genSalt, hash } from "bcrypt";
import { SignInDto } from "./dto/signIn.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import isDevEnv from "src/common/utils/isDevEnv.util";
import { ConfigService } from "@nestjs/config";
import {
  ACCESS_TOKEN_EXPIRY_TIME,
  REFRESH_TOKEN_EXPIRY_TIME,
} from "./constants/tokensExpiryTime.constant";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp({ fullname, email, password }: SignUpDto) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException("A user with this email already exists.");
    }

    await this.prismaService.user.create({
      data: {
        fullname,
        email,
        password: await hash(password, await genSalt()),
      },
    });
  }

  async signIn({ email, password }: SignInDto, res: Response) {
    const existingUser = await this.usersService.findByEmail(email);

    if (!existingUser) {
      throw new NotFoundException("User was not found.");
    }

    const isMatch = await compare(password, existingUser.password);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials.");
    }

    const { accessToken, refreshToken } = await this.signTokens(
      existingUser.id,
    );

    res.cookie("access_token", accessToken, this.getCookieOptions(true));
    res.cookie("refresh_token", refreshToken, this.getCookieOptions(false));
  }

  async refreshToken(token: string, res: Response) {
    const user: { id: string } = await this.jwtService.verifyAsync(token, {
      secret: this.configService.getOrThrow("JWT_SECRET_KEY"),
    });

    const existingUser = await this.usersService.findById(user.id);

    if (!existingUser) {
      throw new NotFoundException("User was not found.");
    }

    const { accessToken, refreshToken } = await this.signTokens(
      existingUser.id,
    );

    res.cookie("access_token", accessToken, this.getCookieOptions(true));
    res.cookie("refresh_token", refreshToken, this.getCookieOptions(false));
  }

  private async signTokens(id: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        id,
      },
      {
        expiresIn: "15m",
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        id,
      },
      {
        expiresIn: "7d",
      },
    );

    return { accessToken, refreshToken };
  }

  private getCookieOptions(isAccessToken: boolean) {
    return {
      httpOnly: true,
      secure: !isDevEnv(this.configService),
      sameSite: "lax",
      maxAge: isAccessToken
        ? ACCESS_TOKEN_EXPIRY_TIME
        : REFRESH_TOKEN_EXPIRY_TIME,
    } as const;
  }
}
