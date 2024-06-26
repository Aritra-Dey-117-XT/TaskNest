import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import {NextRequest, NextResponse} from "next/server"

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

        const hashedOTP = user.forgotPasswordOTP
        const authenticated = await bcryptjs.compare(otp, hashedOTP)

        if(!authenticated) {
            return NextResponse.json({message: "OTP did not match!"}, {status: 401})
        }

        if(Date.now() > user.forgotPasswordOTPExpiry) {
            return NextResponse.json({message: "OTP Expired!"}, {status: 401})
        }

        user.forgotPasswordOTP = undefined
        user.forgotPasswordOTPExpiry = undefined

        await user.save()

        return NextResponse.json({message: "OTP Verified Successfully!", success: true}, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}