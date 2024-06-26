import {NextRequest, NextResponse} from "next/server"
import jwt from "jsonwebtoken"

export async function getDataFromToken(request: NextRequest) {
    try {
        
        const token = request.cookies.get("token")?.value || ""
        const data: any = await jwt.verify(token, process.env.TOKEN_SECRET!)

        return data

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}