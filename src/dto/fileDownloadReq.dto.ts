import { IsString, IsNotEmpty, IsBoolean, IsArray } from 'class-validator';
import { CheckReqDo } from '../do/checkReq.do';

export class FileDownloadReqDto {
  @IsString()
  @IsNotEmpty()
  scenarioName: string;

  @IsArray()
  @IsNotEmpty()
  checkList: Array<CheckReqDo>;
}
