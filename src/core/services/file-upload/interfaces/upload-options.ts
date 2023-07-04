export interface UploadOptions {
  folder: string;
  allowedFormats: 'image' | 'video';
  resourceType: 'image' | 'video';
  tags?: string[];
}

export const tags = {
  postVideo: ['Post', 'Video'],
  postImage: ['Post', 'Image'],
  identityPicture: ['ID', 'Picture'],
  sampleOfWork: ['Sample Of Work', 'Video'],
  profilePicture: ['Profile Picture', 'Image'],
  ad: ['Ad', 'Image'],
  QRCode: ['QR Code', 'Image'],
};
