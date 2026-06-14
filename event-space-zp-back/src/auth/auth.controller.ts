import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signUp.dto";
import type { Response } from "express";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(body, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  refresh(
    @Body("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(refreshToken, res);
  }
}
