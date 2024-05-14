const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;

  blogs.length === 0
    ? 0
    : blogs.forEach((blog) => {
        sum += blog.likes;
      });

  return sum;
};

const favoriteBlog = (blogs) => {
  let favorite = { likes: 0 };

  blogs.length === 0
    ? (favorite = null)
    : blogs.forEach((blog) => {
        if (blog.likes > favorite.likes) {
          favorite = blog;
        }
      });

  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
