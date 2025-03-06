import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { QuestionsModule } from './questions/questions.module';
import { ConfigModule } from '@/common/config/config.module';

import { InterviewModule } from './interview/interview.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    InterviewModule,
    QuestionsModule,
  ],
  controllers: [],
  providers: [],
})
export class CoreModule { }
