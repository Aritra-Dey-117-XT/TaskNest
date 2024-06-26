import { connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todoModel";
import {NextRequest, NextResponse} from "next/server"

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {id, newTask} = reqBody

        try {
            
            await Todo.findByIdAndUpdate(id, {
                task: newTask
            })

            return NextResponse.json({message: "Task Updated Successfully!", success: true}, {status: 200})

        } catch (error: any) {
            return NextResponse.json({message: "Error Updating Task: " + error.message}, {status: 400})
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}