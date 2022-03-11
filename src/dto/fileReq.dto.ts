import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class FileReqDto {
  @IsString()
  @IsNotEmpty()
  scenarioName: string;

  @IsBoolean()
  @IsNotEmpty()
  checkName: string;

  @IsString()
  @IsNotEmpty()
  checkAlias: string;
}
