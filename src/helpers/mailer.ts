import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs';
import crypto from "crypto"

export const sendEmail = async({email, emailType, userID}: any) => {
    try {

        const genOTP = async () => {
            const digits = "0123456789"
            let otp = ""
            for(let i=0; i<6; ++i) {
                otp += digits[crypto.randomInt(0, digits.length)]
            }
            return otp
        }

        const OTP = await genOTP()
        
        const hashedOTP = await bcryptjs.hash(OTP, 10)

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyOTP: hashedOTP,
                verifyOTPExpiry: Date.now() + (5*60*1000)
            })
        } else {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordOTP: hashedOTP,
                forgotPasswordOTPExpiry: Date.now() + (5*60*1000)
            })
        }
        

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.TASKNEST_EMAIL,
                pass: process.env.TASKNEST_APP_PASSWORD
            }
        });
        
        let mailOptions = {
            from: process.env.TASKNEST_EMAIL,
            to: email,
            subject: emailType === "VERIFY" ? "OTP for Verify Your Email" : "OTP for Reset Your Password",
            html: 
            `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
            <h2 style="color: #333; text-align: center; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">OTP Verification</h2>
            <p style="color: #555; font-size: 16px;">Hello Dear User,</p>
            <p style="color: #555; font-size: 16px;">
                Please use the OTP below to verify your email address. This OTP is valid for only <span style="color: #ff0000;">5 minutes</span>.
            </p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="background-color: #4CAF50; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 24px; display: inline-block; letter-spacing: 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                    ${OTP}
                </span>
            </div>
            <p style="color: #555; font-size: 16px;">
                If you did not request this, please ignore this email.
            </p>
            <p style="color: #555; font-size: 16px;">Thank you!</p>
            <p style="color: #555; font-size: 16px;">Best regards,<br>
                <span style="
                    font-size: 1em; 
                    font-weight: bold; 
                    display: inline-block;
                    color: red;
                    animation: colorChange 3s infinite;
                    -webkit-animation: colorChange 3s infinite;
                ">
                    TaskNest
                </span>
            </p>
            <style>
                @keyframes colorChange {
                    0% {
                        color: #ff3b30; /* Iron Man's red */
                    }
                    33% {
                        color: #ffcc00; /* Iron Man's gold */
                    }
                    66% {
                        color: #8c8c8c; /* Iron Man's silver/gray */
                    }
                    100% {
                        color: #ff3b30; /* Back to Iron Man's red */
                    }
                }
                @-webkit-keyframes colorChange { /* For Safari and Chrome */
                    0% {
                        color: #ff3b30; /* Iron Man's red */
                    }
                    33% {
                        color: #ffcc00; /* Iron Man's gold */
                    }
                    66% {
                        color: #8c8c8c; /* Iron Man's silver/gray */
                    }
                    100% {
                        color: #ff3b30; /* Back to Iron Man's red */
                    }
                }
            </style>
        </div>`

        };

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch(error: any) {
        throw new Error(error.message)
    }

}
