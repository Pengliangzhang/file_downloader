import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { common_user } from './user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([common_user]),
    ConfigModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
