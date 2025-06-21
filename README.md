# TASK MANAGER
# task_manager_api (backend project)
The Task Manager ✅ API is a robust backend service that helps users manage their tasks 📋 efficiently and securely.
Users can create, update, and delete tasks 🛠️, track progress with status updates ⏳, and retrieve task details with ease.
JWT-based authentication 🔐 ensures only authorized users can access or modify their tasks, maintaining data privacy.
Built with Node.js 🟢, Express 🚀, TypeScript 📜, and MongoDB 🍃, the API is modular 🧱, scalable ⚡, and easy to maintain.
It supports clean architecture for clear separation of concerns, making the system testable 🧪 and production-ready.
Whether you're tracking personal goals 🎯 or managing daily work tasks 🗂️, this API keeps you organized and productive.

### Postman Pic https://documenter.getpostman.com/view/25014777/2sB2xBEAHC
![task_manager_postman](https://github.com/user-attachments/assets/851e6469-e25e-4718-9f8e-14b9425f1fc7)



## About 
* 👋 Hi, I’m Chidike Henry
* 😎 I’m a backend developer
* 💻 This is Task Manager API, which I built that users manage their tasks 📋 efficiently and securely.
* 💞️ I’m looking to collaborate on JS and DevOps projects
* 📫 How to reach me chidike.henry@gmail.com 

## Technologies Used
* NodeJS
* ExpressJS
* MongoDB
* mongoose
* Express Rate Limit
* Cors
* Bcrypt
* JWT
* Jest
* Supertest
* Nodemon
* Postman 

## Getting Started
## Mini-project   task_manager_api 

## Project Description: “Task Manager API” 📝
The Task Manager API is built using a modular monolith architecture, enabling clean separation of concerns across modules such as auth, users, and tasks. This architecture provides a unified yet scalable structure ideal for mid-sized applications—simplifying code organization, testing, and long-term maintenance.

MongoDB was chosen for its document-oriented flexibility, enabling dynamic task data structures and efficient querying based on status or user ownership. The API is designed with developer experience and security in mind, making it suitable for personal task tracking as well as small team collaboration tools.

## Key Features & Enhancements:
✔ Authentication & Access Control: Secure endpoints using JWT authentication and middleware-based access control. Only authenticated users can create, update, or delete tasks.
✔ Structured Error Handling: Consistent responses via custom exceptions (400, 404, 500) and centralized error middleware for clean debugging.
✔ RESTful API Design: Resource-based routes (/tasks, /users, /auth) using appropriate HTTP methods, combined with robust validation via Joi schemas.
✔ Task Status Workflow: Tasks can be tracked with statuses (pending, in-progress, completed) and updated in real-time with proper validation.
✔ Scalable & Testable: Modular services follow clean coding practices (e.g. public async methods with try-catch blocks) and support unit testing using Jest & Supertest.
✔ Documentation Ready: Includes a .env.sample for environment setup, and a full Postman collection to support API testing and onboarding.

Designed with extensibility, performance, and security at its core, the Task Manager API provides a solid backend foundation for any task-tracking or productivity tool. ✅🚀

## Prerequisites
1. Ensure you have Node.js installed on your machine. You can download it from nodejs.org.
2. MongoDB Database access with either Mongo DB Compass or Atlas installed on your machine.

## Installation
1. Clone the repository: `git clone https://github.com/lacegiovanni17/task_manager.git`
2. Navigate to the project root directory: `cd task_manager`
3. Install dependencies: `npm install`
4. Setup your environment variables `.env` file in the root directory

## Running the API from your terminal
1. From the parent directory change to the backend folder of the project by running the following command `cd task_manager`
2. run `npm install` to install all packages in package.json file
3. From the root folder run the following command to start the backend server: `npm run dev` 
4. The backend server will be running at http://localhost:4404.
5. Use MongoDB URL in .env file to connect to Database.

## Endpoints
Note: All endpoints are accessible under the /api/v1 prefix (e.g., /api/v1/auth/login, /api/v1/users/all). There are no root-level shortcuts without the /api/v1 prefix.

* router.use("/auth", applyAuthRateLimit, authRoutes); // Authentication (Login, Register)
* router.use("/users", applyAuthRateLimit, userRouter); // User management (Users)
* router.use("/tasks", applyTaskRateLimit, taskRouter);  // Task-specific routes 

## Database pic 
![task_managerDB](https://github.com/user-attachments/assets/f4c373a5-e387-451f-8819-fe3d564a611e)


## 🛠️ Key Skills Assessed

* ⚙️ API Design: Clean RESTful endpoints with intuitive resource-based routes and versioning (/api/v1/)

* 🔐 Security: JWT authentication, role-based access control (RBAC), and rate limiting to prevent abuse

* 📈 Scalability: Modular monolith architecture allowing seamless expansion without microservices overhead

* 🧠 Database Architecture: Flexible MongoDB schema with efficient indexing and embedded documents for performance

* 🧪 Validation & Error Handling: Robust input validation using Joi and centralized error middleware for consistent responses 
 
* 🛠️ Testing: Robust testing with JEST and SUPERTEST 

## Core Database Models
* tasks
* users

## ⚙️ Technical Highlights
✅ MongoDB used for flexible, schema-less task modeling
🚀 Database indexing applied to optimize read and write performance
🔁 Connection pooling ensures scalable and efficient DB access under load
💉 Dependency injection applied to services and utilities for consistency and testability
⚠️ Centralized error handling & Joi validation for cleaner, more predictable API responses

## Security Considerations
* Some endpoints use JWT authentication (except registration, login, and public searches)
* Role-based authorization for sensitive operations
* Input validation on some endpoints
* Rate limiting to prevent abuse

## Documentation
Access documentation here - https://documenter.getpostman.com/view/25014777/2sB2cSgiao

## Error Handling
The application provides appropriate error handling for invalid inputs and unexpected scenarios.
* 400 Bad Request - Invalid request data/validation errors
* 401 Unauthorized - Missing or invalid authentication
* 404 Not Found - Resource doesn't exist
* 422 Unprocessable Entity - Semantic errors in request
* 500 Internal Server Error - Unexpected server errors 

## ✅ Testing
# TESTING pic success with JEST and SUPERTEST
![task_manager_testing](https://github.com/user-attachments/assets/9f2a8926-e8b5-4d66-81c8-a37b1e0a9b7e)
1. Import the Postman collection from /postman/Task_Manager_API.postman_collection.json
This collection includes all core endpoints for user registration, authentication, and task CRUD operations.

2. Set up a Postman environment with the following variables for seamless testing:
* baseUrl: The API base URL (e.g., http://localhost:4404)
* token: Automatically set after a successful login and used for protected routes
* user_id, task_id: Captured dynamically as you create users and tasks

3. Each endpoint in the collection is configured with pre-request and test scripts to:
* Store JWT tokens
* Chain requests together (e.g., login → create task → update task → delete task)
* Validate responses with expected status codes and payload structure

4. Automated Tests are written using Jest and Supertest to cover core features:
* User registration and login
* Auth-protected task creation, update, and deletion
* Public access to task listings and individual task views
* Validation errors and response formats

5. Test Coverage Goals:
* Ensure clean request/response cycles
* Validate authentication middleware
* Confirm business logic in auth, users, and tasks modules behaves as expected
* Postman documentation: https://documenter.getpostman.com/view/25014777/2sB2xBEAHC
## Future Enhancements
* Add reviews and ratings for artists
* Implement real-time notifications
* Add payment gateway integration
* Create admin dashboard
* Add more analytics and reporting features

## Author
#### 👤 Author1
- GitHub: [@lacegiovanni17]https://github.com/lacegiovanni17
- Twitter: [@ChidikeC] https://twitter.com/ChidikeC
- LinkedIn: [LinkedIn]https://www.linkedin.com/in/chidike-chizoba-25628a40/

## Contributing 
Contributions, issues, critics and feature requests are welcome!

## Show your support
Please give a ⭐️ if you like this project! 

## Acknowledgments
- Hat tip to smartrob
- Inspiration to all devs
- etc
