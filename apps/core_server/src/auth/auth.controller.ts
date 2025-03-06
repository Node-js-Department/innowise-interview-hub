import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { TAny } from '@packages/shared';

import { AuthService } from './auth.service';
import { Public } from './auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @Get('google')
  @UseGuards(AuthGuard('google')) // Triggers Google OAuth flow
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Handles the callback from Google
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const { username, email } = req.user as TAny;

    if (!username || !email) {
      console.log('Google OAuth callback did not return username or email');
      return;
    }

    const payload = await this.authService.signIn(username, email);
    res.setHeader('Set-Cookie', `access_token=${payload.access_token}; HttpOnly; Path=/; Max-Age=3600`);

    // TODO: change this to use the env variables
    res.status(200).redirect(`http://localhost:${this.configService.get('NEXT_PUBLIC_PORT', 3000)}`);
  }

  // TODO: throttle this endpoint to avoid token fishing?
  @Get('validate')
  async validate(@Req() req: Request) {
    const token = req.headers.cookie?.split('=')[1] ?? '';

    try {
      const payload = await this.authService.validateToken(token);

      return { isValid: true, user: payload };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { isValid: false };
    }
  }
}
