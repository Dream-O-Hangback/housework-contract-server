import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {  MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import * as path from 'path';

@Injectable()
export class FileService {
    s3: AWS.S3;
    bucket: string;

    constructor() {}

    static createMulterOptions(destination: string): MulterOptions | Promise<MulterOptions> {
        const configService = new ConfigService();
        const s3 = new AWS.S3();
        const bucket = configService.get<string>('AWS_S3_BUCKET_NAME');

        AWS.config.update({
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        });

        const storage = multerS3({
            s3,
            bucket,
            key: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, key: string) => void) => {
                cb(null, `${destination}/${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
            },
        });

        const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
              cb(null, true);
            } else {
              cb(new Error(), false);
            }
        };

        const limits = { fileSize: 3145728 };

        return {
            storage,
            fileFilter,
            limits,
        };
    }

    async uploadFile(file: Express.Multer.File, urlKey: string) {
        const params = {
            Bucket: this.bucket,
            Key: urlKey,
            Body: file.buffer,
        };

        const data = await this.s3.putObject(params).promise();

        return data;
    }
}
