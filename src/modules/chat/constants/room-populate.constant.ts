import { PopulateOptions } from '@shared/interfaces/general/populate.interface';

export const roomPaginationPopulate = [
  {
    path: 'secondParty',
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
    path: 'messagesContainer',
    model: 'MessagesContainer',
    select: { messages: 1 },
    populate: {
      path: 'messages',
      model: 'Message',
      options: {
        limit: 1,
        sort: { _id: -1 },
      },
      select: { text: 1, author: 1, receiver: 1, createdAt: 1 },
      populate: [
        {
          path: 'author',
          model: 'User',
          populate: {
            path: 'userProfile',
            model: 'UsersProfile',
            select: {
              'profilePicture.url': 1,
            },
          },
          select: { userProfile: 1 },
        },
        {
          path: 'receiver',
          model: 'User',
          populate: {
            path: 'userProfile',
            model: 'UsersProfile',
            select: {
              'profilePicture.url': 1,
            },
          },
          select: { userProfile: 1 },
        },
      ],
    },
  },
];

export const roomPopulate: PopulateOptions = {
  path: 'rooms',
  model: 'Room',
  perDocumentLimit: 40,
  select: { secondParty: 1, name: 1, messagesContainer: 1 },
  populate: roomPaginationPopulate,
};
