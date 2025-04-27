
import bcrypt from "bcryptjs"
import db from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken"

export const register = async (req,res)=>{

    const {email , password,name} = req.body;

    try {
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return res.status(400).json({
                error:"User already exists"
            })
        }
// creating a hashePassword using bcryptjs
        const hashedPassword = await bcrypt.hash(password , 10)

        // creating a newuser in a data base 
        const newUser = await db.user.create({
            date:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        })
// generate a jwt token using jwt 
        const token = jwt.sign({id:newUser.id}, process.env.JWT_SECRET , {
            expiresIn:"7d"
        })
    // storing a jwt token in cookie using cookie parser

        res.cookie("jwt" , token , {

            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge:1000*60*60*24*7 // 7d
        } )

        res.status(201).json({
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image
            }
        })

    } catch (error) {
        console.error("Error creating a user")
        res.status(500).json({
            error:"Error creating a user"
        })
    }

}

export const login = async (req,res)=>{}
export const logout = async (req,res)=>{}
export const check = async (req,res)=>{}

