# Task Management

Task Management is a web application that enables users to create tasks and set deadlines for when the task should be completed.

## Description

Task Management is mainly designed for desktop devices and is mobile responsive. Users are able to manage tasks by using the drag and drop feature. This feature was implemented using the [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API). The feature does not work on mobile devices currently.

When a new task is created it goes into the "new task column" by default. To change the status of a task to active the user drags the selcted task into the "current tasks" column and when a task is completed it is dragged into the "completed tasks" column.

## Features

- Drag and Drop
- Change Theme
- App State Management
- Create User Accounts

## Dependencies

- [prisma](https://www.prisma.io/docs) - Object Relational Mapping (ORM) framework for working with databases
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Used to hash passwords
- [ejs](https://ejs.co/) - View template engine that generates HTML markup with JavaScript
- [express](https://expressjs.com/) - Node.js framework for building server side applications
- [express-session](https://expressjs.com/en/resources/middleware/session.html) - Express.js middleware for session management
- [helmet](https://helmetjs.github.io/) - Used to set HTTP response headers
- [morgan](https://github.com/expressjs/morgan#readme) - Express.js middleware for logging HTTP requests and errors
- [passport](https://www.passportjs.org/) - Node.js middleware for authenticaton
- [dotenv](https://github.com/motdotla/dotenv#readme) - Used to load environment variables from .env for Node.js apps
- [nodemon](https://nodemon.io/) - Used to automatically reload Node.js severs when an app is in development

## Upcoming Features

- Calendar
- Drag and drop on mobile devices
- Ability to set the priorty of tasks
