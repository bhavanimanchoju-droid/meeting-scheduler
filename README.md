Meeting Scheduler Backend

1. Project Overview

This project is a backend service that allows users to create accounts and schedule meetings while preventing overlapping time slots.

The main objective of this assignment was to implement correct scheduling logic and clean backend architecture. The system ensures that a user cannot book two meetings that overlap in time. If a conflict is detected, the request is rejected with an appropriate error message.

The focus of this implementation is on business logic correctness, relational database design, and clear separation between routing, service logic, and persistence layers.

2. Tech Stack

Node.js – Runtime environment

Express.js – HTTP server framework

Sequelize ORM – ORM for database interaction

MySQL – Relational database

This stack was chosen to demonstrate REST API design, structured database modeling, and conflict detection using SQL-backed queries.

3. Project Structure
src/
  modules/
    meeting/
      index/
      interface/
      dto/
      model/
      service/
      routes/
  middlewares/
  config/
  utils/


modules/meeting/index

Acts as the entry point for the meeting module. It aggregates routes and exposes a single router to the main application.

interface (Controllers):
This layer handles:

Reading request data (req.body, req.params, req.query)
Calling service functions
Sending HTTP responses
No database logic exists here. Controllers remain thin and only deal with HTTP-related concerns.

dto:
Reserved for shaping request/response data if required. This helps control what is exposed to clients.

model:
Defines Sequelize models and relationships:

User

Meeting

Associations between them

Models define structure and relationships only. They do not contain business logic.

service
This is the core logic layer. It handles:
Validation
Conflict detection
Meeting creation rules
Update logic
Deletion logic

All business rules are centralized here so they can evolve without affecting routing logic.

routes:
Defines Express routes and maps them to controller functions.

middlewares
Contains reusable middleware such as the global error handler.

config
Includes configuration files, such as Sequelize database connection setup.

utils
Reserved for helper functions if needed in future improvements.


The application follows a layered architecture:

Controllers → HTTP handling

Services → Business logic

Models → Database structure

This separation ensures:

Business logic changes do not affect routing.

Database changes do not directly impact controllers.

Code remains maintainable and easier to test.

While building this project, I intentionally kept controllers thin and moved all validation and conflict logic into the service layer to maintain clear responsibilities.

4. Database Design
Users Table

Fields:

id (Primary Key, auto-increment)

name (Required)

email (Required, unique)

createdAt

updatedAt

The email field is unique to prevent duplicate user accounts.

Meetings Table

Fields:

id (Primary Key, auto-increment)

title (Required)

startTime (Required, DateTime)

endTime (Required, DateTime)

userId (Foreign Key → Users.id)

createdAt

updatedAt

A foreign key relationship ensures that a meeting cannot exist without a valid user.

Relationship

One User → Many Meetings

Each Meeting belongs to one User

Indexing Decisions

Indexes were added on:

userId

startTime

endTime

These fields are frequently used during conflict detection queries. Indexing improves performance when filtering meetings by user and time range.

SQL: 

A relational database was chosen because:

Meetings are tightly coupled with users.

Foreign key constraints enforce data integrity.

Time-range queries are efficiently supported.

Scheduling systems benefit from structured relational design.

5. Business Logic – Conflict Detection

The most important rule in this system is preventing overlapping meetings.

The conflict condition used is:

existing.startTime < new.endTime
AND
existing.endTime > new.startTime


This logic correctly detects overlapping intervals.

Working Flow:

If an existing meeting starts before the new meeting ends,

And the existing meeting ends after the new meeting starts,

Then the two time intervals overlap.

This condition catches:

Partial overlaps

Full overlaps

Edge overlaps

If a conflict is found for the same user, the API returns:

400 Bad Request
{
  "message": "Time slot already booked"
}


This check is performed using a database query rather than in-memory filtering to ensure scalability as the number of meetings grows.

6. API Endpoints
User APIs
POST /users

Create a new user.

Request:

{
  "name": "Bhavani",
  "email": "bhavani@test.com"
}


Response (201):

{
  "id": 1,
  "name": "Bhavani",
  "email": "bhavani@test.com",
  "createdAt": "...",
  "updatedAt": "..."
}

GET /users/:id

Fetch user by ID.

Meeting APIs
POST /meetings

Create a meeting.

Request:

{
  "title": "Project Discussion",
  "startTime": "2026-02-10T10:00:00",
  "endTime": "2026-02-10T11:00:00",
  "userId": 1
}


Success (201):

Returns created meeting object.

Conflict (400):

{
  "message": "Time slot already booked"
}

GET /meetings

List all meetings.

Optional filters:

/meetings?userId=1

GET /meetings/:id

Fetch a meeting by ID.

PUT /meetings/:id

Update meeting details.

During update, conflict detection excludes the current meeting using:

id != currentId

DELETE /meetings/:id

Delete a meeting.

Response:

204 No Content

7. Validation & Error Handling

The system validates:

Required fields (title, startTime, endTime, userId)

startTime < endTime

Valid user existence

Time conflict detection

HTTP status codes used:

201 – Created

200 – Success

204 – No Content

400 – Validation or conflict error

404 – Resource not found

500 – Internal server error

A global error handler ensures consistent error responses across the application.

8. Setup Instructions
1. Clone Repository
git clone <repository-url>
cd meeting-scheduler

2. Install Dependencies
npm install

3. Create MySQL Database
CREATE DATABASE meeting_scheduler;

4. Configure Database Credentials

Update:

src/config/database.js


Set:

Database name

Username

Password

5. Run Server
node src/server.js


Server runs on:

http://localhost:3000

9. How to Test

Create a user using POST /users

Create a meeting for that user

Attempt to create another meeting with overlapping time

Confirm that the API returns:

400 - Time slot already booked


Update meeting and test conflict logic again

Delete a meeting and verify 204 response

10. Assumptions Made

All users operate in the same time zone.

Authentication is not implemented (focus was on scheduling logic).

Meetings belong to a single user.

No recurring meetings are supported.

Pagination is not implemented for listing endpoints.

11. Future Improvements

If extended further, the following can be added:

JWT-based authentication

Pagination

Soft deletes

Rate limiting middleware

Unit tests for service layer

Time zone support

Logging and monitoring

Caching frequently queried results