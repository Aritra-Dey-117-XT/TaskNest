import { connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todoModel";
import {NextRequest, NextResponse} from "next/server"

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {id} = reqBody

        try {
            await Todo.findByIdAndDelete(id)
            return NextResponse.json({message: "Task deleted successfully!.", success: true}, {status: 200})
        } catch (error) {
            return NextResponse.json({message: "Unable to delete task."}, {status: 400})
        }
        

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}