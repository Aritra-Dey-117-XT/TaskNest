import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendAlertMail } from "@/helpers/sendAlertMail";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {task, date, time} = reqBody
        const data = await getDataFromToken(request)

        const dateTime = `on ${date}, at ${time}`

        try {

            await sendAlertMail({
                email: data.email,
                task: task,
                dateTime: dateTime
            })

            return NextResponse.json({message: `Alert Created! An email will be sent to you ${dateTime}`}, {status: 200})

        } catch (error: any) {
            return NextResponse.json({message: `Problem Setting Alert: ${error.message}`}, {status: 400})
        }
        

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}