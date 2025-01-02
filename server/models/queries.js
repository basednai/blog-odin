const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addUser = async (user) => {
  try {
    const prismaUser = await prisma.users.create({
      data: {
        username: user.username,
        password: user.password,
      },
    });
  } catch (error) {
    return error;
  }
  return prismaUser;
};

exports.getUser = async (username) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    return error;
  }
};

exports.addPost = async (id, content, publish = true, parentId) => {
  try {
    const post = await prisma.post.create({
      data: {
        author: {
          connect: {
            id: id,
          },
        },
        parentComment: parentId && {
          connect: {
            id: parentId,
          },
        },
        content: content,
        publish: publish,
        type: parentId ? "comment" : "post",
      },
    });
    return post;
  } catch (error) {
    console.log(error);

    return error;
  }
};

exports.getPost = async (id) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        comments: {
          include: {
            author: true,
            comments: true,
          },
        },
        author: true,
      },
    });
    return post;
  } catch (error) {
    return error;
  }
};

exports.getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
        author: true,
      },
    });

    return posts;
  } catch (error) {
    return error;
  }
};

exports.getUserPosts = async (id) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: id,
      },
      include: {
        comments: true,
        author: true,
      },
    });


    return posts;
  } catch (error) {
    return error;
  }
};

exports.putPost = async (id, content, publish = true) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        content: content,
        publish: publish,
      },
    });
    return post;
  } catch (error) {
    return error;
  }
};

exports.disconnectPost = async (id) => {
  try {
    const getType = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        author: {
          disconnect: true,
        },
        content: `This ${getType.type} has been deleted`,
      },
    });
    return post;
  } catch (error) {
    return error;
  }
};

exports.publishPost = async (id) => {
  try {
    const getPub = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
       publish: !getPub.publish},
    });
    return post;
  } catch (error) {
    return error;
  }
};

exports.deletePost = async (id) => {
  return;
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/log-in");
  });
};
