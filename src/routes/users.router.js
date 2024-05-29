const { Router } = require("express");
const userModel = require("../models/users");

const usersRouter = Router();

usersRouter.get("/premium/:uid", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.uid });
  await userModel.updateOne(
    { _id: user.id },
    { ...user, rol: rol == "user" ? "premium" : "user" }
  );
  res.send({ status: "success", message: "Logger test" });
});

module.exports = usersRouter;
