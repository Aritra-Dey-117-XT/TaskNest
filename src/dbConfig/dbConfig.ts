import mongoose, {connection} from "mongoose"

export async function connect() {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on("success", () => {
            console.log("connected To MongoDB Atlas Database Successfully!")
        })

        connection.on("error", (error) => {
            console.log("Unable to connect to MongoDB Atlas Daytabase: ", error.message)
        })

    } catch (error: any) {
        console.log("Error Establishing Connection with MongoDB Atlas Database: ", error.message)
    }
}