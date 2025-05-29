import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'image/jpg',
        ];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Invalid file type. Only images and PDFs are allowed.',
            ),
            false,
          );
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required and must be valid.');
    }
    return this.uploadService.upload(file);
  }

  @Get('download/:key')
  async downloadFile(@Param('key') key: string, @Res() res: Response) {
    try {
      const headData = await this.uploadService.getFileMetadata(key);

      res.set({
        'Content-Type': headData.ContentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${key}"`,
      });

      const fileStream = await this.uploadService.download(key);
      fileStream.pipe(res);
    } catch (err) {
      throw new HttpException(
        'File not found or error fetching file',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
