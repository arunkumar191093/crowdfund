## Crowdfunding App

This application will be used by innovator (that post their projects) and public donors (that fund the projects)
Innovators can create projects, request contributions to their projects, and also browse their previous projects.
Public donors are able to browse projects from innovators and contribute to fund the projects. When donation on a project reaches requested amount, the project is archived and donation is transferred to innovator

In order to run the application locally, follow below steps - 

## Installation

After cloning the project run the below command to install

```bash
  npm install
```

Before running the code, there are few properites that needs to be available for the code.
Create a `.env` file and add below properties with appropriate values.

```
DB_URI=mongodb+srv://<username>:<password>@crownfund-app.iepdj.mongodb.net/?retryWrites=true&w=majority&appName=crownfund-app&ssl=true
USER_NAME=aron91jones
PASSWORD=Crowdfunding12345
DB_NAME=crowdFund
REACT_APP_API_URL=http://localhost:3002
```


    
## Run Locally

This is a monolith repo holding both client and server code.
Open two separate terminals for client and server code and run below commands

Clone the project

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

For backend: 
```bash
  npm run server-start
```

For front-end code: 
```bash
  npm run start
```


Schemas/Tables

User
  - username/email
  - full name
  - role

Project
  - title
  - description
  - goal
  - raised
  - innovator
  - archived


Future scopes: 
 - Along with donations, we can show to total no. of users who donated so far
 - Can show top 5 donations and the name ( either Anonymous or if someone provided their name)
 - Can have carousel and videos of the projects
 - Can have more details about the project when donator click on the project title
 - Can have login via gmail 
 - have end date for every project enabled for donation
 - Make description in create project as rich text editor