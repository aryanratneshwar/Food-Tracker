const router = require("express").Router();
const User = require("../models/User");




//GET ALL USER
router.get("/", async (req, res) => {

  try {
    let users;
   
      users = await User.find();
    
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {

    try {
      const user = await User.findById(req.params.id);

    
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true ,useFindAndModify: false}
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    res.status(401).json("You can up date only your account!");
  }
}); 

module.exports = router;