const { Router } = require("express");
const User = require("../models").user;
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (error) {
    next(error);
  }
});

router.post("/newuser", async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      res.status(400).send("must provide correct paramaters");
    } else {
      //   const newUser = await User.create(req.body);
      const newUser = await User.create({
        fullname,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      //both of the above options, after else, work the same. But the 2nd one makes sure no unwanted parameters are passed.
      res.json(newUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
