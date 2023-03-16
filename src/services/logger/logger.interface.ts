export type Message =
  | 'CREATED'
  | 'UPDATED'
  | 'DELETED'
  | 'PROPOSED'
  | 'READ'
  | 'BOUGHT'
  | 'SOLD';

export type ObjectType = 'POST' | 'POSTS' | 'COMMENT' | 'COMMENTS' | 'PROPOSAL';

export type UserType =
  | 'ADMIN'
  | 'GROUP OWNER'
  | 'DEFAULT'
  | 'GROUP Participant';
