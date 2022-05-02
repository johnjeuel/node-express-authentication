import { UserModel } from "../models/user";
import  bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { IUserInputDTO } from "../interfaces/user";
import { Request, Response } from "express";

/**
 * @Todo Add typechecking
 */
export const createUser = async (req: Request, res: Response) => {
  const user: IUserInputDTO = req.body;
  const saltRounds = 10;

  try {
    const existingEmail = await UserModel.findOne({ email: user.email })
    const existingUsername = await UserModel.findOne({ username: user.username })

    if(existingEmail) return res.status(400).json({ success: false, message: 'Email already existed!'});
    if(existingUsername) return res.status(400).json({ success: false, message: 'Username already existed!'});
    
    const salt = await bcrypt.genSaltSync(saltRounds)
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    await UserModel.create(user);
    console.log({ user });
    return res.status(201).json({ success: true, message: 'Registration Successful!'});
  } catch (err) {
    return res.status(400).json({ success: false, message: 'Registration Failed'});
  }
};

export const loginUser = async (req: Request, res: Response) => {

  const user = req.body;
  let accessToken;

  try {
    const savedUser = await UserModel.findOne({ username: user.username })
   
    if(savedUser === undefined) return res.status(401).json({ success: false, message: 'Wrong Credentials.'})

    const match = await bcrypt.compare(user.password, savedUser.password)

    if(match){
      accessToken = jsonwebtoken.sign({ sub: savedUser._id }, process.env.JWT_SECRET)
      return res.status(200).json({success: true, message: 'Login Success', data: {access_token: accessToken}})
    } else {
      return res.status(401).json({ success: false, message: 'Wrong Password.'})
    }
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Login Failed.'})
  }
}