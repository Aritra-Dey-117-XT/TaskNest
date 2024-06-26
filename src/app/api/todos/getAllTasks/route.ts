import { connect } from "@/dbConfig/dbConfig";
import Todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {

    const reqBody = await request.json()
    const {user, date} = reqBody

    try {

        const allTodos = await Todo.find({user: user, date: date})
        const allTasks = allTodos.map(todos => ({id: todos._id, task: todos.task, checked: todos.checked}))

        return NextResponse.json({
            message: "Tasks Successfully Found!",
            success: true,
            allTasks
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}