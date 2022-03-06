import { Controller, Post, Get, Delete, Req, Param, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { FileService } from './file.service';
import { File } from './file.entity';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) {}

  // Get all files
  @Get()
  async getAllFiles() {
    return "Test get all files";
  }

  @Post()
  async queryAllFiles(@Res() res: Response) {
    const stream = await this.fileService.getAllFiles();
    stream.pipe(res);
  }
}
