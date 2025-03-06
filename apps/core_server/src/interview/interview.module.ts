import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InterviewController, UserController],
  providers: [InterviewService, UserService ],
})
export class InterviewModule {}
