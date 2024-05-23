const User = require("../models/User");

const signup = async (req, res) => {
  if (await User.isEmailTaken(req.body.email)) {
    //throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    return res.status(200).json({
      success: false,
      user: false,
      message: "Email already taken",
    });
  }

  const user = await User.create(req.body);

  return res.status(200).json({
    success: true,
    user,
    message: "Created a user!",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    return res.status(400).json({
      success: false,
      user: false,
      message: "Incorrect name or password",
    });
  }

  return res.status(200).json({
    success: true,
    user: user,
    message: "Successfully logged in!",
  });
};

const getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res
        .status(200)
        .json({ success: true, data: users, message: `User is empty` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

const updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    user.name = body.name;
    user.lastname = body.lastname;
    user.email = body.email;
    user.password = body.password;
    user.role = body.role;
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

const deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

const getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

const insertUser = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an user",
    });
  }
  console.log("testing");
  const user = new User(body);

  if (!user) {
    return res.status(400).json({ success: false, error: err });
  }
};

module.exports = {
  login,
  signup,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  insertUser,
};
