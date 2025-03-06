import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google')) // Triggers Google OAuth flow
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Handles the callback from Google
  async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
    const { username, email } = req.user as any;
  
    if (!username || !email) {
      console.log('Google OAuth callback did not return username or email');
      return;
    }

    const payload = await this.authService.signIn(username, email);
    res.setHeader('Set-Cookie', `access_token=${payload.access_token}; HttpOnly; Path=/; Max-Age=3600`);

    // TODO: change this to use the env variables
    res.status(200).redirect(`http://localhost:3000`);
  }

  // TODO: throttle this endpoint to avoid token fishing?
  @Get('validate')
  async validate(@Req() req: Request) {
    const token = req.headers.cookie?.split('=')[1] ?? '';

    try {
      const payload = await this.authService.validateToken(token);

      return { isValid: true, user: payload };
    } catch (error) {
      return { isValid: false };
    }
  }
}