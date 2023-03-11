export const authorPopulate = {
  path: 'author',
  model: 'User',
  match: { isDeleted: false },
  select: {
    _id: 1,
    'profilePicture.url': 1,
    username: 1,
    isVerified: 1,
  },
};
