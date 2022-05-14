const express = require("express");
const router = express.Router();
const { Post } = require("../models");
const { Comment } = require("../models");
const auth = require("../services/auth");

/* POST DASHBOARD POSTS - User sees all his posts */
router.post("/getPost", async (req, res) => {
  res.setHeader("Acess-Control-Allow-Origin", "http://localhost:3000");

  let token = req.body.jwt;

  if (token) {
    auth.verifyUser(token).then((user) => {
      if (user) {
        // console.log(user);
        Post.findOne({
          where: {
            UserId: user.id,
          },
        }).then((response) => {
          console.log(response);
          res.json(response);
        });
      }
    });
  }
});
/* GET POST - User gets post to edit */
router.get("/getPost/:id", async (req, res) => {
    const postId = req.params.id;
  // res.setHeader("Acess-Control-Allow-Origin", "http://localhost:3000");

  // let token = req.body.jwt;

  // if (token) {
  //   auth.verifyUser(token).then((user) => {
  //     if (user) {
  // console.log(user);
  Post.findOne({
    where: {
      id: postId
    },
  }).then((response) => {
    // console.log('response', response)
    res.json(response);
  });
});

/* POST CREATE POSTS - User creates a new post */
router.post("/", async (req, res, next) => {
  const user = req.body;

  if (!user) {
    res.status(403).send("Please log in!");
    return;
  }

  // if (user.user_name != req.body.username){
  //     // console.log(user.user_name);
  //     // console.log(req.body.user_name);

  //     res.status(403).send('You do not have priviledge for this..');
  //     return;
  // };

  Post.create({
    user_name: req.body.username,
    description: req.body.description,
    location: req.body.location,
    UserId: user.id,
  })
    .then((newPost) => {
      // console.log('new', newPost)
      res.status(201).send({
        user_name: newPost.user_name,
        location: newPost.location,
        description: newPost.description,
        createdAt: newPost.createdAt,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/* POST CREATE COMMENT - User creates a comment on a post */
router.post("/comment", async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(403).send("Please log in!");
    return;
  }

  // if (user.user_name != req.body.user_name){
  //     res.status(403).send('You do not have priviledge for this..');
  //     return;
  // };
  const postId = Post.id;
  Comment.create({
    comment: req.body.comment,
    PostId: postId,
  })
    .then((newComment) => {
      res.status(201).send({
        comment: newComment.comment,
        createdAt: newComment.createdAt,
        PostId: newComment.postId,
      });
    })
    .catch(() => {
      res.status(400).send();
    });
});

/* PUT UPDATE POST - User updates a post */
router.put("/:id", async (req, res, next) => {
  const postId =parseInt(req.params.id);

//   if (!postId || postId <= 0) {
//       res.status(400).send("Invalid ID");
//       return;
//   };
//   const user = req.user;
//   if (!user){
//       res.status(403).send('Please log in!');
//       return;
//   };
//   if (user.user_name != req.body.user_name){
//       res.status(403).send('You do not have priviledge for this..');
//       return;
//   };

  Post.update(
    {
      description: req.body.description,
      location: req.body.location,
    },
    {
      where: {
        id: postId
      },
    }
  )
    .then(() => {
      res.status(200).send("Update success!");
    })
    .catch(() => {
      res.status(400).send();
    });
});

/* DELETE DELETE POST - User deletes a post */
router.delete("/:id", (req, res, next) => {
  const postId = parseInt(req.params.id);

  if (!postId || postId <= 0) {
    res.status(400).send("Invalid id!");
    return;
  }
  const user = req.user;
  if (!user) {
    res.status(403).send("Please log in!");
    return;
  }

  // if (user.user_name != req.body.user_name){
  //     res.status(403).send('You do not have priviledge for this..');
  //     return;
  // };

  Post.destroy({
    where: {
      id: postId,
    },
  })
    .then(() => {
      res.status(204).send("Post successfully deleted!");
    })
    .catch(() => {
      res.status(400).send();
    });
});

/* USER LIKES - User adds a like to a post */
router.post("/like", async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(403).send("Please Log In!");
    return;
  }

  Comment.create({
    like: req.body.like,
  })
    .then((newState) => {
      res.json({
        like: newState.like,
      });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

/* USER LOVES - User adds a love */
router.post("/love", async (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.status(403).send("Please Log In!");
    return;
  }

  Comment.create({
    love: req.body.love,
  })
    .then((newState) => {
      res.json({
        love: newState.love,
      });
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
});

module.exports = router;
