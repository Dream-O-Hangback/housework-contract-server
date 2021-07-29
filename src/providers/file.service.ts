import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { promisify } from 'util';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

@Injectable()
export class FileService {
    s3: AWS.S3;

    constructor(
        private configService: ConfigService,
    ) {
        this.configService = configService;
        this.s3 = new AWS.S3();

        AWS.config.update({
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        });
    }

    async uploadFile(@Req() req, @Res() res, destination: string) {
        const upload = multer({
            storage: multerS3({
                s3: this.s3,
                bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
                key: function(req, file, cb) {
                    cb(null, `${destination}/${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
                },
            }),
        }).single('files');

        const uploadPromise = promisify(upload);

        
        return await uploadPromise(req, res);
    }
}
