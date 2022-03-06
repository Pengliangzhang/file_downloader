import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { File } from './file.entity';
import { Express } from 'express';
import { Readable } from 'stream';
import * as fs from 'fs-extra';
const archiver = require('archiver');
import * as path from 'path';

// import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor() {
  }

  getAllFiles() {
    const finalReportPath = __dirname + "/xml/abc.xml";
    return fs.createReadStream(finalReportPath);
  }
}
