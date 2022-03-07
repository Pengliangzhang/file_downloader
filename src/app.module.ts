import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('TYPEORM_DB_TYPE'),
          host: configService.get('TYPEORM_DB_HOST'),
          port: configService.get('TYPEORM_DB_PORT'),
          username: configService.get('TYPEORM_DB_USERNAME'),
          password: configService.get('TYPEORM_DB_PASSWORD'),
          database: configService.get('TYPEORM_DB_DATABASE'),
          autoLoadEntities: configService.get('TYPEORM_DB_AUTOLOADENTITIES'),
          synchronize: configService.get('TYPEORM_DB_SYNCHRONIZE'),
        } as TypeOrmModuleOptions;
      }
    }),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
