const bcrypt = require("bcryptjs");
const User = require("../../models/user");

const jwt = require("jsonwebtoken");
const {dateToString} = require('../../helpers/date')

module.exports = {

  /**
   * users: List of all users of the system
   * 
   * @returns Array of Users
   */
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => ({ ...user._doc}));
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

  createUser: async (args) => {

    // control of the any error or exception
    try {
      const existingUser = await User.findOne({ email: args.input.email });

      // making sure that the email provided by the user does not exist
      if (existingUser) {
        throw new Error("Email already exist !");
      }

      // hashing the password before saving it, for security purpose
      const hashedPassword = await bcrypt.hash(args.input.password, 12);

      const user = new User({
        photo: args.input.photo,
        name: args.input.name,
        bio: args.input.bio,
        phone:args.input.phone,
        email: args.input.email,
        password: hashedPassword,
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
      "myPrivateKey",
      { expiresIn: "1h" }
    );
    
    // preparing of the data to send to the user
    const userData = { 
      userId: user.id, 
      email: user.email, 
      token, 
      tokenExpiration: 1,
      lastLogin: dateToString(user.lastLogin) 
     };

     //update of the time of last Login 
     user.lastLogin = new Date()
     await user.save()


     return userData
  },



  updateUser: async ({input}) => {
     // control of the any error or exception
     try {
       //change this by id****************
      const existingUser = await User.findById({ email: input.email });

      // making sure that the user exist
      if (!existingUser) {
        throw new Error("The user does not exist !");
      }

      // hashing the password before saving it, for security purpose
      const hashedPassword = await bcrypt.hash(args.input.password, 12);

      const user = new User({
        photo: args.input.photo,
        name: args.input.name,
        bio: args.input.bio,
        phone:args.input.phone,
        email: args.input.email,
        password: hashedPassword,
      });

      // update & persistence of the user into the database
      const savedUser = await user.save();

      // returning the newly created user
      return { ...savedUser._doc };
    } catch (error) {
      throw error;
    }
  },


  uploadPhoto: async ({url}) => {
    return url
  }
};
