import { CreateUserDTO } from '@/user/user.dto';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async signIn(name: string, email: string): Promise<{ access_token: string }> {
    let user = await this.userService.findOneByEmail(email);

    if (!user) {
      const data: CreateUserDTO = {
        email,
        name,
      };

      user = await this.userService.create(data);
    }

    const payload = { email: user.email, sub: user.id, name: user.name };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}