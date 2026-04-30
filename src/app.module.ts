import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
