# TaskNest

TaskNest is a To-Do List and productivity application built on [Secura_Auth](https://secura-auth.vercel.app), leveraging Next.js 14 and MongoDB for robust task management and collaboration. TaskNest ensures secure task organization with advanced data encryption techniques and non-alien authentication methods, ensuring independence from third-party strategies like Google or GitHub. It features alert email notifications for tasks, enhancing productivity and timely task management. With TaskNest, prioritize efficiency and security in managing your daily tasks and projects.

## Visit My TaskNest Website

You are warmly invited to try out my [TaskNest](https://yours-tasknest.vercel.app/) yourself.  
Feel absolutely free to give any feedback.  
Visit at: https://yours-tasknest.vercel.app/.

## Features

- **Task Management**: Create, edit, and delete tasks.
- **Due Dates**: Assign tasks according to due dates.
- **Task Completion**: Mark tasks as completed.
- **Task Alert**: Set and get alert for a task reminder at the very time set by you.
- **Secure Authentication**: Leveraging Secura_Auth for robust local authentication.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Technologies Used

- **Next.js**: Framework for building React applications with server-side rendering and logic.
- **React**: Frontend library for building user interfaces.
- **MongoDB**: NoSQL database for storing application data.
- **Tailwind CSS**: Beautiful, responsive and scalable design.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Aritra-Dey-117-XT/TaskNest
   cd TaskNest
2. **Install dependencies:**

   ```bash
   npm install

3. **Set up environment variables:**

Create a .env file in the root directory and add the following variables:

   ```bash
   # Example .env file

MONGODB_URI=<your_mongodb_uri>
TOKEN_SECRET=<token_secret> # a random secure string
DOMAIN=<your_domain> # like for port 3000 in local server: "https://localhost:3000"

# email sending -- steps to follow (A Google Mail Account is preferred.)

# 1. select or create a new email id for this purpose. 
# 2. Activate 2-Factor-Authentication in your gmail.
# 3. Now go to App Password (search if you unable to find) and create a new App.
# 4. A App password will be generated. You need to use it as <your_email_app_password>, not your account password.

TASKNEST_EMAIL=<your_email_id>
TASKNEST_APP_PASSWORD=<your_email_app_password>
```

4. **Run the application:**

   ```bash
   npm run dev
   ```

The application will be running at http://localhost:3000.

## Usage

- **User Registration:** Provide a secure registration process for new users.
- **Login:** Authenticate users securely using encrypted credentials.
- **Task Management**: Create, edit, delete, and manage tasks.
- **Due Dates**: Assign and manage due dates for tasks.
- **Task Alert**: Get reminder for task on selected time.
- **Task Completion**: Mark tasks as completed.
- **Profile Management:** Allow users to update their profiles securely.
- **Session Handling:** Manage user sessions with secure token-based authentication.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## Acknowledgments

- Thanks to and ChatGPT(OpenAI) for Help with the Designing part and helping by resolving my queries and problems.