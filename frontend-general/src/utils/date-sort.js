export const dateTimeSort = (array) => {
  return [...array].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
};
