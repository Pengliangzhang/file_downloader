import { Controller, Post, Get, Body, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { UserService } from './user.service';
import { common_user } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  // Get all files
  @Get()
  async getAllUsers() {
    return "Test get all files";
  }
}
