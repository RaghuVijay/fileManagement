import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { s3 } from 'src/aws/aws.config.ts';
import { v4 as uuid } from 'uuid';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.get<string>('AWS_BUCKET_NAME');
    console.log('Using S3 Bucket:', this.bucket);
  }

  public async upload(
    file: Express.Multer.File,
  ): Promise<{ key: string; url: string }> {
    const key = `${uuid()}-${file.originalname}`;

    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await s3.upload(params).promise();

    return {
      key,
      url: result.Location,
    };
  }

  public async getFileMetadata(key: string): Promise<S3.HeadObjectOutput> {
    const params: S3.HeadObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };
    return s3.headObject(params).promise();
  }

  public async download(key: string): Promise<NodeJS.ReadableStream> {
    const params: S3.GetObjectRequest = {
      Bucket: this.bucket,
      Key: key,
    };

    return s3.getObject(params).createReadStream();
  }
}
