export type EmptyMongoQuery =
  | string
  | {
      [key: string]: any;
    }
  | null
  | undefined;
