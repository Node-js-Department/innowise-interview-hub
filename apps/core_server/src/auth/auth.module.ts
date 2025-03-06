import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [GoogleStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
