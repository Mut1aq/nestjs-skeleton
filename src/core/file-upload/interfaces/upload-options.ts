export interface UploadOptions {
  folder: string;
  allowedFormats: string[];
  resourceType: 'image' | 'video';
  tags?: string[];
}
