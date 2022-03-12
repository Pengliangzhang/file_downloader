import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { common_file } from './file.entity';
import { Repository, getConnection, Connection } from 'typeorm';
import * as fs from 'fs-extra';
const archiver = require('archiver');
import { FileUploadReqDto } from '../dto/fileUploadReq.dto';
import { FileDownloadReqDto } from '../dto/fileDownloadReq.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(common_file)
    private filesRepository: Repository<common_file>,
    private connection: Connection
  ) {
  }

  async getAllFiles(fileDownloadInfo: FileDownloadReqDto) {
    const date = new Date();
    const folderName = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
    const folderPath = `${__dirname}/../../resources/${folderName}`
    const friendlyFileName = this.generateFriendlyFilename(fileDownloadInfo.scenarioName);
    const resourcesDir = `${folderPath}/${friendlyFileName}.zip`

    const yesMill = date.getTime() - 1000 * 60 * 60 * 24 * 3;
    const twoDatsAgo = new Date(yesMill);
    const deleteFolderName = `${twoDatsAgo.getFullYear()}-${twoDatsAgo.getMonth()+1}-${twoDatsAgo.getDate()+1}`
    const deleteFolderPath = `${__dirname}/../../resources/${deleteFolderName}`
    try {
      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
      }
      if (fs.existsSync(deleteFolderPath)){
        fs.rmdirSync(deleteFolderPath);
      }
    } catch(e) {
      console.log("An error occurred.")
    }
    
    await this.createZippedFile(fileDownloadInfo, resourcesDir);
    return fs.createReadStream(resourcesDir);
  }

  async createZippedFile(fileDownloadInfo: FileDownloadReqDto, fullPath: string) {
    const output = fs.createWriteStream(fullPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      console.log(err);
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append a file from buffer
    if (Array.isArray(fileDownloadInfo.checkList)) {
      await Promise.all(fileDownloadInfo.checkList.map(async (item) => {
        const vaildFile = await this.readVaildFile({scenarioName: fileDownloadInfo.scenarioName, checkName: item["checkName"], checkAlias: "", xmlType: item["type"]});
        if (vaildFile) {
          const buffer3 = Buffer.from(vaildFile.blob);
          archive.append(buffer3, { name: vaildFile.file_name });
        }
      }))
    }

    archive.finalize();
  }

  async uploadMulterFile(
    userId: string,
    scenarioInfo: FileUploadReqDto,
    file: Express.Multer.File
  ) {
    if (!file.originalname.match(/\.(xml)$/)) {
      throw new Error('Only xml files are allowed!');
    }
    if (file.size > 100000) {
      throw new Error('File size cannot exceed 100KB!');
    }
    const formattedData = JSON.parse(scenarioInfo.toString());
    const newFileRecord = await this.filesRepository.create({
      scenario_name: formattedData.scenarioName,
      check_name: formattedData.checkName,
      check_alias: formattedData.checkName,
      xml_type: formattedData.xmlType,
      blob: file.buffer,
      file_name: file.originalname,
      isVaild: 1,
      downloaded: 0,
      created_user: userId,
      updated_user: userId,
    });
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const currVaildFile = await this.readVaildFile(formattedData);      
      if (currVaildFile) {
        currVaildFile.isVaild = 0;
        await queryRunner.manager.save(currVaildFile);
      }
      await queryRunner.manager.save(newFileRecord);

      await queryRunner.commitTransaction();
    }catch (err) {
        await queryRunner.rollbackTransaction();
    }finally {
        await queryRunner.release();
    }

    return newFileRecord;
  }

  async readVaildFile(
    scenarioInfo: FileUploadReqDto,
  ) {
    let file = null;
    if (scenarioInfo.checkAlias) {
      file = await getConnection()
        .getRepository(common_file)
        .createQueryBuilder("file")
        .where("file.scenario_name = :scenario_name", { scenario_name: scenarioInfo.scenarioName })
        .andWhere("file.check_name = :check_name", { check_name: scenarioInfo.checkName })
        .andWhere("file.check_alias = :check_alias", { check_alias: scenarioInfo.checkAlias })
        .andWhere("file.isVaild = :isVaild", { isVaild: 1 })
        .getOne();
    } else {
      file = await getConnection()
        .getRepository(common_file)
        .createQueryBuilder("file")
        .where("file.scenario_name = :scenario_name", { scenario_name: scenarioInfo.scenarioName })
        .andWhere("file.check_name = :check_name", { check_name: scenarioInfo.checkName })
        .andWhere("file.isVaild = :isVaild", { isVaild: 1 })
        .getOne();
    }
    return file;
  }

  // Generate a friendly filename
  generateFriendlyFilename(scenarioName: string){
    // Generate a randomStr (UUID is not user-friendly and overskill here)
    const randomStr = Array(6)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    // Generate a new unique filename = "timestamp-"" + "randomnStr-" + "friendlyName"
    return `${scenarioName}-${new Date().getTime()}-${randomStr}`;
  }

}
