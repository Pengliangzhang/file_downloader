import { IsString, IsNotEmpty, IsBoolean, IsArray } from 'class-validator';

export class CheckReqDo {
  @IsString()
  @IsNotEmpty()
  checkName: string;

  @IsArray()
  @IsNotEmpty()
  type: string;
}