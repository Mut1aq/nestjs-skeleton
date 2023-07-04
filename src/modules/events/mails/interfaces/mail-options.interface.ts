export interface MailOptions {
  to: string | string[];
  fileName: string;
  subject: string;
  priority: 'high' | 'normal' | 'low';
  data: {
    [name: string]: any;
  };
}
