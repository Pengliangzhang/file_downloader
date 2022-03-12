import { IsString, IsNotEmpty, IsBoolean, IsArray } from 'class-validator';

export class FileDownloadReqDto {
  @IsString()
  @IsNotEmpty()
  scenarioName: string;

  @IsArray()
  @IsNotEmpty()
  checkList: [];
}
