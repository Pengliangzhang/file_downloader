import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { common_file } from './file.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import { Readable } from 'stream';
import * as fs from 'fs-extra';
const archiver = require('archiver');
import { FileReqDto } from './../dto/fileReq.dto';
// import * as path from 'path';

// import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(common_file)
    private filesRepository: Repository<common_file>
  ) {

  }

  getAllFiles() {
    const finalReportPath = __dirname + "/../../resources/xml/abc.xml";
    const finalReportPath2 = __dirname + "/../../resources/xml/header.xml";
    const fileOne = fs.createReadStream(finalReportPath);
    const fileTwo = fs.createReadStream(finalReportPath2);
    // this.zipFiles();
    return fs.createReadStream(finalReportPath);
  }

  // zipFiles() {
  //   const output = fs.createWriteStream(__dirname + '/../../example.zip');
  //   const archive = archiver('zip', {
  //     zlib: { level: 9 } // Sets the compression level.
  //   });

  //   // listen for all archive data to be written
  //   // 'close' event is fired only when a file descriptor is involved
  //   output.on('close', function () {
  //     console.log(archive.pointer() + ' total bytes');
  //     console.log('archiver has been finalized and the output file descriptor has closed.');
  //   });

  //   // This event is fired when the data source is drained no matter what was the data source.
  //   // It is not part of this library but rather from the NodeJS Stream API.
  //   // @see: https://nodejs.org/api/stream.html#stream_event_end
  //   output.on('end', function () {
  //     console.log('Data has been drained');
  //   });

  //   // good practice to catch warnings (ie stat failures and other non-blocking errors)
  //   archive.on('warning', function (err) {
  //     if (err.code === 'ENOENT') {
  //       // log warning
  //     } else {
  //       // throw error
  //       throw err;
  //     }
  //   });

  //   // good practice to catch this error explicitly
  //   archive.on('error', function (err) {
  //     throw err;
  //   });

  //   // pipe archive data to the file
  //   archive.pipe(output);

  //   // append a file from stream
  //   const file1 = __dirname + "/../../resources/xml/abc.xml";
  //   const readFile = fs.createReadStream(file1);
  //   console.log(readFile);
  //   archive.append(readFile, { name: 'file1.txt' });

  //   // append a file from string
  //   archive.append('string cheese!', { name: 'file2.txt' });

  //   // append a file from buffer
  //   const buffer3 = Buffer.from('buff it!');
  //   archive.append(buffer3, { name: 'file3.txt' });

  //   // append a file
  //   archive.file('file1.txt', { name: 'file4.txt' });

  //   // finalize the archive (ie we are done appending files but streams have to finish yet)
  //   // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  //   archive.finalize();
  // }

  async uploadMulterFile(
    userId: string,
    scenarioInfo: FileReqDto,
    file: Express.Multer.File
  ) {
    if (!file.originalname.match(/\.(xml)$/)) {
      throw new Error('Only xml files are allowed!');
    }  
    const newFileRecord = await this.filesRepository.create({
      scenario_name: "RCX",
      check_name: "ABAP",
      check_alias: "ABAP",
      blob: file.buffer,
      isVaild: 1,
      downloaded: 0,
      created_user: userId,
      updated_user: userId,
    });

    await this.filesRepository.save(newFileRecord);

    return newFileRecord;
  }
}
