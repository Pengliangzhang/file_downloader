import { Controller, Post, Get, Body, Res, UploadedFile, UseGuards, UseInterceptors, Param, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { FileService } from './file.service';
import { FileUploadReqDto } from '../dto/fileUploadReq.dto';
import { CheckReqDo } from '../do/checkReq.do';
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
    const path = await this.fileService.getAllFiles(fileDownloadInfo);
    res.status(200).send(path);
  }

  @Get('zip/:path')
  async getAZipFile(@Param('path') path: string, @Res() res: Response) {   
    path = path.replace('&', '/');
    const stream = await this.fileService.getZipFile(path);
    await res.set({
      'Content-Type': 'blob',
      'Content-Disposition': `attachment; filename="${path}.zip"`
    });
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

  // Upload file db
  @Get('vaildScenario')
  async getVaildScenarios() {
    return this.fileService.queryVaildScenario();
  }

  // Upload file db
  @Get('vaildCheckByScenario/:scenario')
  async getVaildChecksByScenario(
    @Param('scenario') scenario: string
  ) {
    return this.fileService.queryVaildScenarioCheck(scenario);
  }
}
