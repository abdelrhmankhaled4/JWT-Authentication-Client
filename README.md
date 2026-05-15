JWT Authentication Client

A modern JWT Authentication Client built with Angular that provides a complete authentication flow including Login, Register, Protected Routes, JWT Token Handling, and Role-Based Authorization integration with ASP.NET Core Web API.

🚀 Features
User Registration & Login
JWT Authentication
Role-Based Authorization
Protected Routes using Angular Guards
Token Storage using LocalStorage
HTTP Interceptor for JWT Token
Responsive UI
Authentication State Management
Logout Functionality
🛠️ Tech Stack
Angular
TypeScript
HTML5
CSS3
Bootstrap
JWT Authentication
ASP.NET Core Web API (Backend)
📂 Project Structure
src/
│
├── app/
│   ├── components/
│   ├── services/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   ├── pages/
│   └── shared/
│
├── assets/
└── environments/
🔐 Authentication Flow
User logs in using email and password.
Backend validates credentials.
JWT Token is generated from the API.
Angular stores the token locally.
HTTP Interceptor automatically attaches the token to requests.
Protected routes are accessible only for authenticated users.

JWT authentication is widely used for secure authorization and stateless authentication systems.

⚙️ Installation

Clone the repository:

git clone https://github.com/abdelrhmankhaled4/JWT-Authentication-Client.git

Navigate to the project folder:

cd JWT-Authentication-Client

Install dependencies:

npm install

Run the project:

ng serve

The application will run on:

http://localhost:4200
🔗 Backend API

This project works with an ASP.NET Core JWT Authentication API.

Example API features:

Login
Register
Role Management
JWT Token Generation
Authorization
📸 Screenshots
Login Page
Register Page
Dashboard
Protected Pages
🧩 JWT Security Notes
Tokens are attached automatically using an HTTP Interceptor.
Protected endpoints require valid authentication tokens.
Role-based authorization can restrict pages and API access.
JWT tokens should never contain sensitive data like passwords.
📦 Future Improvements
Refresh Tokens
Email Verification
Password Reset
Dark Mode
Google Authentication
User Profile Page
👨‍💻 Author

Developed by <PRIVATE_PERSON>

GitHub Repository:
JWT Authentication Client Repository

⭐ Support

If you like this project:

Star the repository
Fork the project
Share feedback
Contribute to improvements

Built with ❤️ using Angular & ASP.NET Core Web API.
