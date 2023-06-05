export const authorPopulate = {
  path: 'author',
  model: 'User',
  match: { isDeleted: false },

  select: {
    username: 1,
    accountStatus: 1,
    userProfile: 1,
  },
  populate: {
    path: 'userProfile',
    model: 'UsersProfile',
    select: {
      'profilePicture.url': 1,
    },
  },
};
