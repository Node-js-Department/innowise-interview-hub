import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class CoreModule { }
