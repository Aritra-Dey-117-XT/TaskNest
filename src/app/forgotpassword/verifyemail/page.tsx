"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function VerifyEmailPage() {

    const [data, setData] = useState({
        hashedEmail: "",
        otp: "",
    })

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        
        if(!data.hashedEmail) {
            const email = window.location.search.split("=")[1]
            setData({...data, hashedEmail: email})
        }

        if(data.otp) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [data.otp])

    const onVerify = async () => {
        try {
            console.log(data)
            setLoading(true)
            toast.dismiss()
            toast.loading("Verifying...")
            await axios.post("/api/users/verifyForgotPasswordOtp", data)
            toast.dismiss()
            toast.success("OTP Verified Successfully, Welcome!")
            router.push(`reset?email=${data.hashedEmail}`)
            
        } catch (error: any) {

            toast.dismiss()
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
                {isLoading ? "Verifying OTP..." : "Verify OTP"}
            </h1>
            <hr className="mb-6" />

            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">Enter OTP sent to your email</label>
            <input
                type="text"
                name="otp"
                id="otp"
                value={data.otp}
                onChange={(event) => setData({...data, otp: event.target.value})}
                placeholder="Enter OTP"
                required
                autoComplete="off"
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />

            <button
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={onVerify}
                disabled={isButtonDisabled}
            >
                {isButtonDisabled ? "Enter OTP to Submit" : "Verify"}
            </button>

            <br />
            <Link href="/login" className="block text-center mt-4 text-blue-500 hover:text-yellow-500">
                Go Back to Login Page
            </Link>
        </div>
    </div>
    )
}