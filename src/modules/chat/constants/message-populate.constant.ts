import { EmptyMongoQuery } from '@shared/interfaces/general/empty-mongodb-query.interface';

export const messagePopulate = (
  perDocumentLimit: number,
  skip: number,
  sort: EmptyMongoQuery,
) => {
  return {
    path: 'messages',
    model: 'Message',
    select: { text: 1, author: 1, receiver: 1 },
    perDocumentLimit,
    options: { skip, sort },
    populate: [
      {
        path: 'author',
        model: 'User',
        select: { userProfile: 1, username: 1 },
        populate: {
          path: 'userProfile',
          model: 'UsersProfile',
          select: {
            'profilePicture.url': 1,
          },
        },
      },
      {
        path: 'receiver',
        model: 'User',
        select: { userProfile: 1, username: 1 },
        populate: {
          path: 'userProfile',
          model: 'UsersProfile',
          select: {
            'profilePicture.url': 1,
          },
        },
      },
    ],
  };
};
