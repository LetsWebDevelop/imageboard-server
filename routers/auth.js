const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const User = require("../models").user;
const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).send("Wrong credentials");
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (validPassword) {
      console.log("Valid!");

      const token = toJWT({ userId: user.id });
      res.send({ message: "You successfully logged in", token });
    } else {
      res.status(400).send("Wrong credentials");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
