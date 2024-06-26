import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {NextRequest, NextResponse} from "next/server"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {

    const reqBody = await request.json()
    const {hashedEmail, otp} = reqBody

    try {

        let email = "lol"

        const users = await User.find()
        for(let user of users) {
            const match = await bcryptjs.compare(user.email, hashedEmail)
            if(match) {
                email = user.email
            }
        }           


        const user = await User.findOne({email: email})
        if(!user) {
            return NextResponse.json({message: "User not found with this email!"}, {status: 404})
        }

        const hashedOTP = user.verifyOTP
        const authenticated = await bcryptjs.compare(otp, hashedOTP)

        if(!authenticated) {
            return NextResponse.json({message: "OTP did not match!"}, {status: 401})
        }

        if(Date.now() > user.verifyOTPExpiry) {
            return NextResponse.json({message: "OTP Expired!"}, {status: 401})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        user.isVerified = true
        user.verifyOTP = undefined
        user.verifyOTPExpiry = undefined

        await user.save()

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({message: "OTP Verified Successfully!", success: true}, {status: 200})

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}