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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiProduces,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('File Upload')
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
  @ApiOperation({
    summary: 'Upload a file',
    description:
      'Uploads a file to AWS S3 with a 5MB size limit. Allowed types: JPEG, PNG, GIF, PDF',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The file to upload (max 5MB)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File uploaded successfully',
    schema: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000-filename.jpg',
          description: 'Unique file identifier for future reference',
        },
        url: {
          type: 'string',
          example:
            'https://your-bucket.s3.amazonaws.com/123e4567-e89b-12d3-a456-426614174000-filename.jpg',
          description: 'Public URL to access the uploaded file',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid file type or no file provided',
  })
  @ApiResponse({
    status: 413,
    description: 'Payload Too Large - File exceeds 5MB limit',
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required and must be valid.');
    }
    return this.uploadService.upload(file);
  }

  @Get('download/:key')
  @ApiOperation({
    summary: 'Download a file',
    description: 'Downloads a file from AWS S3 by its unique key',
  })
  @ApiParam({
    name: 'key',
    description: 'File key returned from upload operation',
    example: '123e4567-e89b-12d3-a456-426614174000-filename.jpg',
  })
  @ApiProduces('application/octet-stream')
  @ApiResponse({
    status: 200,
    description: 'File download stream',
    headers: {
      'Content-Type': {
        description: 'MIME type of the file',
        schema: { type: 'string' },
      },
      'Content-Disposition': {
        description: 'Attachment filename',
        schema: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - File with specified key does not exist',
  })
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
