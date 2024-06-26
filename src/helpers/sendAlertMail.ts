import { connect } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer"
import schedule from "node-schedule"

connect()

export const sendAlertMail = async({email, task, dateTime}: any) => {
    try {

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
            subject: "REMINDER: " + task,
            html: 
            `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Urgent Task Reminder</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        background-color: #28a745;
                        color: #ffffff;
                        padding: 10px 20px;
                        text-align: center;
                    }
                    .content {
                        padding: 20px;
                        color: #333333;
                    }
                    .content h2 {
                        color: #28a745;
                    }
                    .task-details {
                        background-color: #e6f4ea;
                        padding: 15px;
                        border: 1px solid #c3e6cb;
                        margin-bottom: 20px;
                        font-family: 'Georgia', serif;
                        color: #155724;
                    }
                    .task-details p {
                        margin: 0 0 10px;
                        font-size: 18px;
                    }
                    .task-title {
                        font-size: 24px;
                        font-weight: bold;
                        color: #155724;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        background-color: #f4f4f4;
                        color: #666666;
                        font-size: 12px;
                    }
                    .button {
                        display: inline-block;
                        background-color: #28a745;
                        color: #ffffff;
                        padding: 15px 25px;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 16px;
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Urgent Task Reminder</h1>
                    </div>
                    <div class="content">
                        <h2>Hi User,</h2>
                        <p>This is an urgent reminder for the following task:</p>
                        <div class="task-details">
                            <p class="task-title">Task: ${task}</p>
                            <p><strong>Due Date and Time:</strong> ${dateTime}</p>
                        </div>
                        <p>Please ensure that the task is completed by the due date.</p>
                        <p>Thank you!</p>
                        <p>Best regards,</p>
                        <p>
                            <span style="
                                font-size: 1em; 
                                font-weight: bold; 
                                display: inline-block;
                                color: orange;
                            ">
                                TaskNest
                            </span>
                        </p>
                        <a href="${process.env.DOMAIN}/todolist" class="button">View Tasks</a>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Aritra Dey. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>

            `

        };

        const dateArr = dateTime.split(",")[0].split(" ")[1].split("-")
        const [year, month, date] = dateArr.map(Number)

        const timeArr = dateTime.split(",")[1].split(" ")[2].split(":")
        const [hours, mins] = timeArr.map(Number)

        const sendingDateTime = new Date(year, month - 1, date, hours, mins, 0); // Year, Month (0-based), Day, Hour, Minute, Second

        // schedule.scheduleJob(sendingDateTime, async() => {
        //     const mailResponse = await transporter.sendMail(mailOptions)
        //     return mailResponse
        // })

        schedule.scheduleJob(sendingDateTime, async() => {
            console.log("Sending email...");
            const mailResponse = await transporter.sendMail(mailOptions);
            console.log("Mail sent:", mailResponse);
            return mailResponse;
        });

    } catch(error: any) {
        throw new Error(error.message)
    }

}
