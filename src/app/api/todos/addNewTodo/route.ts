import { connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {task, user, date} = reqBody.todo

        const newTodo = new Todo({
            task: task,
            user: user,
            date: date,
            checked: false
        })

        try {

            await newTodo.save()
            return NextResponse.json({message: "Your Task Successfully Added!", success: true}, {status: 200})

        } catch (error: any) {
            return NextResponse.json({message: "Error Adding ToDo: " + error.message}, {status: 400})
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}