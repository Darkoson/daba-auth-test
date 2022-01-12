const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const jwt = require("jsonwebtoken");
const { dateToString } = require("../../helpers/date");

module.exports = {
  /**
   * users: List of all users of the system
   *
   * @returns Array of Users
   */
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => ({ ...user._doc }));
    } catch (error) {
      throw error;
    }
  },

  /**
   * createUser: Creation of a new using (signup)
   *
   * @param {*} args
   * @returns User
   */

  register: async ({ email, password }) => {
    // control of the any error or exception
    try {
      const existingUser = await User.findOne({ email });

      // making sure that the email provided by the user does not exist
      if (existingUser) {
        throw new Error("Email already exist !");
      }

      // hashing the password before saving it, for security purpose
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        photo: "",
        name: "",
        bio: "",
        phone: "",
        email,
        password: hashedPassword,
        lastLogin: new Date(), // we are setting the first "last login" to the date the user is created
      });

      // persistence of the user into the database
      const savedUser = await user.save();

      // returning the newly created user
      return { ...savedUser._doc };
    } catch (error) {
      throw error;
    }
  },

  /**
   * login: The signin function
   *
   * @param {email , password} : credentials provided by the user
   * @returns AuthData
   */

  login: async ({ email, password }) => {
    // checking if the email provided is valid
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist !");
    }

    // checking if the password provided is valid
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect !");
    }

    // generation of the token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      `${process.env.BCRYPT_PRIVATE_KEY}`,
      { expiresIn: "1h" } // we are setting the token to expire in 1 hour
    );

    // preparing of the data to send to the user
    const userData = {
      ...user._doc,
      password: "",
      token,
      tokenExpiration: 1,
      lastLogin: dateToString(user.lastLogin),
    };

    //update of the time of last Login
    user.lastLogin = new Date();
    await user.save();

    return userData;
  },

  /**
   * updateUser: This updates the current user's details in the system
   *
   * @param  input : the user data to update
   * @returns
   */
  updateUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User not authenticated !");
    }
    // control of the any error or exception
    try {
      //geting the current user by ID
      const currentUser = await User.findById(req.userId);

      // making sure that the user exist: (This just an extra verification)
      if (!currentUser) {
        throw new Error("The user does not exist !");
      }

      const data = args.input;
      // hashing the password before saving it, incase it's been provided

      currentUser.password = data.password
        ? await bcrypt.hash(data.password, 12)
        : currentUser.password;
      currentUser.name = data.name ? data.name : currentUser.name;
      currentUser.email = data.email ? data.email : currentUser.email;
      currentUser.bio = data.bio ? data.bio : currentUser.bio;
      currentUser.phone = data.phone ? data.phone : currentUser.phone;

      // update & persistence of the user into the database
      const updatedUser = await currentUser.save();

      // returning the updated current user
      return { ...updatedUser._doc };
    } catch (error) {
      throw error;
    }
  },

  uploadPhoto: async ({ url }) => {
    return url;
  },
};
