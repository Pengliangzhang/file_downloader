import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class FileUploadReqDto {
  @IsString()
  @IsNotEmpty()
  scenarioName: string;

  @IsString()
  @IsNotEmpty()
  checkName: string;

  @IsString()
  @IsNotEmpty()
  checkAlias: string;

  @IsString()
  @IsNotEmpty()
  xmlType: string;
}
