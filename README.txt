Project Overview
This project is an expense management system which allows a user to manage expense transactions. The application includes functionality to list all the expenses that have been entered into the system so far.

Task
You are provided simple code to Add submit/approve/reject/archive workflow states for the expense report. Clicking  a report in the report list and clicking action button(approve,archive..)
An error occurs.
- No effect.
- Deliverable

You are required to fix the code so that the workflow states setting functionality works correctly. To test your code,  open the Firefox browser from the bottom bar of the workspace and go to the url -  http://localhost:3000/login. You can click on the button <create an account> and register a new user in the expense management system. Then use the new account to log in.

Technical Overview
The user data is stored in a mongodb collection. Each user document in the collection has the following fields - updatedAt, createdAt, username, email and password.

The expenses are stored in a mongodb collection. Each expense document in the collection has the following fields -  updatedAt, createdAt, title, amount, status, description, and username.

Relevant Project Files -
Look at the client/src/components/Report_s.js
Technology Stack
Frontend: React, Redux, React-dom, Redux-saga
Backend: Node.JS, Express framework
Database: MongoDB
Unit testing tool: Mocha
