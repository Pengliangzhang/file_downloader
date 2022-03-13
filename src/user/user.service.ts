import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { common_user } from './user.entity';
import { Repository, getConnection, Connection } from 'typeorm';
import * as fs from 'fs-extra';
const archiver = require('archiver');
import { FileUploadReqDto } from '../dto/fileUploadReq.dto';
import { FileDownloadReqDto } from '../dto/fileDownloadReq.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(common_user)
    private usersRepository: Repository<common_user>,
    private connection: Connection
  ) {
  }
}
