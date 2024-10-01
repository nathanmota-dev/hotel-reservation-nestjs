import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';

@Module({
  imports: [AuthModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
