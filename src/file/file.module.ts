import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FileService } from './file.service';
import { File } from './file.entity';
import { FileController } from './file.controller';

@Module({
  imports: [
    // TypeOrmModule.forFeature([File]),
    ConfigModule,
  ],
  providers: [FileService],
  exports: [FileService],
  controllers: [FileController]
})
export class FileModule {}
