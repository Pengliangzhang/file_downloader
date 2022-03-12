import { Controller, Post, Get, Body, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { FileService } from './file.service';
import { FileUploadReqDto } from '../dto/fileUploadReq.dto';
import { FileDownloadReqDto } from '../dto/fileDownloadReq.dto';
import { common_file } from './file.entity';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) { }

  // Get all files
  @Get()
  async getAllFiles() {
    return "Test get all files";
  }

  @Post()
  async queryAllFiles( @Body('fileDownloadInfo') fileDownloadInfo: FileDownloadReqDto, @Res() res: Response) {
    const stream = await this.fileService.getAllFiles(fileDownloadInfo);
    stream.pipe(res);
  }

  // Upload file db
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body('scenarioInfo') scenarioInfo: FileUploadReqDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.fileService.uploadMulterFile("T10101010", scenarioInfo, file);
  }
}
