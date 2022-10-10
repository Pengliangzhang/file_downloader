import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';

import { common_file } from './file/file.entity'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          name: 'hdi_shared',
          type: configService.get('TYPEORM_DB_TYPE'),
          host: configService.get('TYPEORM_DB_HOST'),
          port: configService.get('TYPEORM_DB_PORT'),
          username: configService.get('TYPEORM_DB_USERNAME'),
          password: configService.get('TYPEORM_DB_PASSWORD'),
          logging: configService.get('TYPEORM_DB_DEBUG'),
          synchronize: false,
          encrypt: true,
          extra: {
            sslValidateCertificate: true,
            sslTrustStore: configService.get('TYPEORM_DB_AUTOLOADENTITIES'),
            sslCryptoProvider: 'openssl',
          },
          entities: [ common_file ],
          schema: configService.get('TYPEORM_DB_SCHEMA'),
        } as TypeOrmModuleOptions;
      }
    }),
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
