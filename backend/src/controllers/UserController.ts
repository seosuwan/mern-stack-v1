import express, { NextFunction, Request, Response } from "express";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import errorGenerator from "../errors/errorGenerator";
import { check, validationResult } from "express-validator";
import { IUserInPutDTO } from "../interfaces/IUser";
import { UserService } from "../services";
import User from "../models/User";


// const router = express.Router();

// import auth from "../api/middleware/auth";
// import User from "../models/User";
import token from "jsonwebtoken";

const exist = async (req: Request, res: Response, next: NextFunction) => {
    // const { email }: IUserInPutDTO = req.body;
    // console.log(req.url.substr(1))
    // console.log('email: ' + email)
    // console.log("중복체크와썹?")
    // console.log(check("email").isEmpty());
    try {
        // console.log(req)
        const errors = validationResult(req);
        if (!errors.isEmpty()) return console.log("에러남"), errorGenerator({ statusCode: 400 });

        const email = req.url.substring(1);
        // console.log(`************${email}`)
        const foundEmail = await UserService.findEmail({email});
        console.log(foundEmail)
        if (foundEmail) {
            return console.log("이메일 찾았음"), errorGenerator({ statusCode: 401 });
        }
        console.log(foundEmail)
        return res.status(201).json(foundEmail)
    } catch (err) {
        next(err);
    }

}
// const token = 'MySecretKey1$1$234';
const join = async (req: Request, res: Response, next: NextFunction) => {
    console.log("**********여기 회원가입")
    check("username", "Name is required").not().isEmpty();
    check("phone", "phone is required").not().isEmpty();
    check("birth", "birth is required").not().isEmpty();
    check("email", "Please include a valid email").isEmail();
    check("password", "Please enter a password with 8 or more characters").isLength({ min: 8 });
    const { username, email, password, birth, phone, address }: IUserInPutDTO = req.body;
    try {

        const errors = validationResult(req.body);
        if (!errors.isEmpty()) {
            return console.log("비어서와씀?/"), res.status(400).json({ errors: errors.array() });
        }

        const foundUser = await UserService.findLogin({ email, password });
        if (foundUser) errorGenerator({ statusCode: 409 });  // 이미 가입한 유저 //

        const createdUser = await UserService.createUser({ username, email, password, phone, address, birth });
        res.status(201).json({ message: 'created', createdUserEmail: createdUser.email })

        const payload = {
            user: {
                email: createdUser.email,
            },
        };
        console.log("jwt 하러가욤")
        // 
        
        return jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: '14d'},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );
} catch (err) {
    next(err);
}
console.log(JSON.stringify(token.verify))
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    console.log("로그인 들어와따 ")
    // console.log(req.body)
    check("email", "Please include a valid email").isEmail();
    check("password", "password is required").exists();
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return console.log("에러남"), errorGenerator({ statusCode: 400 });

        const { email, password } = req.body;
        const user = await UserService.findLogin({ email, password });
        if (!user) {
            return console.log("에러남2"), errorGenerator({ statusCode: 401 });
        }
        console.log(user)
        return res.status(201).json({ user })

        const payload = {
            user: {
                email: user.email,
            },
        };
        console.log("jwt 하러가욤")
        jwt.sign(
            payload,
            config.jwtSecret,
            { expiresIn: 36000 },
            (err, token) => {
                if(err)     throw err;
                res.json({ token }); 
            }
        );
    } catch(err) {
        next(err);
    }
    console.log( res.json({ token }))
}
export default {
    join,
    login,
    exist
}

