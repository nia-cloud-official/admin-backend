# COHS Admin Dashboard Backend

## Description
This is the backend server for the COHS (Company's Online Help System) Admin Dashboard. It provides authentication using Auth0, session management, and routes for login, dashboard, and logout.

## Installation
1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up the MySQL database and update the connection details in the code.

## Usage
To start the server, run `npm start`. The server will run on port 3000 by default.

## Routes
- `/` - Welcome message for the COHS Admin Dashboard.
- `/login` - Initiates the authentication process using Auth0.
- `/callback` - Callback route for Auth0 authentication.
- `/dashboard` - Access the dashboard if authenticated, otherwise redirects to the login page.
- `/logout` - Logs out the user and redirects to the home page.

## Technologies Used
- Node.js
- Express
- Auth0 for authentication
- MySQL for database
- Passport for session management

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
