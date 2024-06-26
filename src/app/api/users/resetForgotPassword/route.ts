import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {hashedEmail, newPassword, confirmPassword} = reqBody

        let user;

        const users = await User.find()
        for(let userItem of users) {
            const match = await bcryptjs.compare(userItem.email, hashedEmail)
            if(match) {
                user = userItem
            }
        }

        if(!user) {
            return NextResponse.json({
                message: "Invalid email, User not Found!"
            }, {status: 404})
        }

        if(newPassword !== confirmPassword) {
            return NextResponse.json({
                message: "New Password Wasn't Confirmed!"
            }, {status: 406})
        }

        const salt = await bcryptjs.genSalt(12)
        const newHashedPassword = await bcryptjs.hash(newPassword, salt)
        user.password = newHashedPassword
        await user.save()

        return NextResponse.json({
            message: "Password Updated Successfully",
            success: true
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}