import { connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todoModel";
import {NextRequest, NextResponse} from "next/server"

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {id} = reqBody

        try {
            
            const todo = await Todo.findById(id)
            const checked = todo.checked

            todo.checked = !checked
            await todo.save()

            return NextResponse.json({message: "Successfully checked status updated."}, {status: 200})

        } catch (error: any) {
            return NextResponse.json({message: "Problem finding and checking task."}, {status: 404})
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}