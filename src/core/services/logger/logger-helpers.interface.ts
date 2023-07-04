export type Message =
  | 'CREATED'
  | 'UPDATED'
  | 'DELETED'
  | 'FOLLOWED'
  | 'UNFOLLOWED'
  | 'REPORTED'
  | 'BLOCKED';

export type ObjectType =
  | 'POST'
  | 'COMMENT'
  | 'REPORT'
  | 'FOLLOWER'
  | 'FOLLOWING';

export type UserType = 'ADMIN' | 'SERVICE PROVIDER' | 'DEFAULT' | 'DOCTOR';

export type Action = 'CONNECTED' | 'MESSAGED' | 'DISCONNECTED';
