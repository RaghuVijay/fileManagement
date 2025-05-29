import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';
import { s3 } from 'aws/aws.config.ts';

jest.mock('aws/aws.config', () => ({
  s3: {
    upload: jest.fn(),
    headObject: jest.fn(),
    getObject: jest.fn(),
  },
}));

describe('UploadService', () => {
  let service: UploadService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-bucket'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('upload', () => {
    it('should upload file to S3 and return key and url', async () => {
      const mockFile = {
        originalname: 'file.pdf',
        buffer: Buffer.from('file content'),
        mimetype: 'application/pdf',
      } as Express.Multer.File;

      const mockUploadResult = { Location: 'https://s3-url/file.pdf' };
      (s3.upload as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue(mockUploadResult),
      });

      const result = await service.upload(mockFile);

      expect(s3.upload).toHaveBeenCalledWith(
        expect.objectContaining({
          Bucket: 'test-bucket',
          Key: expect.stringContaining('file.pdf'),
          Body: mockFile.buffer,
          ContentType: mockFile.mimetype,
        }),
      );
      expect(result).toEqual({
        key: expect.any(String),
        url: mockUploadResult.Location,
      });
    });
  });

  describe('getFileMetadata', () => {
    it('should get file metadata from S3', async () => {
      const mockHeadOutput = { ContentType: 'application/pdf' };
      (s3.headObject as jest.Mock).mockReturnValue({
        promise: jest.fn().mockResolvedValue(mockHeadOutput),
      });

      const key = 'test-key.pdf';
      const metadata = await service.getFileMetadata(key);

      expect(s3.headObject).toHaveBeenCalledWith({
        Bucket: 'test-bucket',
        Key: key,
      });
      expect(metadata).toEqual(mockHeadOutput);
    });
  });

  describe('download', () => {
    it('should get S3 file stream', async () => {
      const mockStream = { pipe: jest.fn() };
      (s3.getObject as jest.Mock).mockReturnValue({
        createReadStream: jest.fn().mockReturnValue(mockStream),
      });

      const key = 'test-key.pdf';
      const stream = await service.download(key);

      expect(s3.getObject).toHaveBeenCalledWith({
        Bucket: 'test-bucket',
        Key: key,
      });
      expect(stream).toBe(mockStream);
    });
  });
});
