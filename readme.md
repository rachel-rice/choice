# Maybe/So

Maybe/So (formerly Choice) is a full-stack web application designed to help users make decisions by randomly selecting items from customizable lists. Users can use the app as guests or create an account to save and manage their own lists and items. The app also includes a selection of random games for added fun.

**Link to project:** Not deployed (local development)

![Screenshot of the application](img/screenshot-placeholder.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB, Bootstrap  
**Dependencies:** bcrypt, connect-flash, cors, dotenv, ejs, express, express-ejs-layouts, express-session, method-override, mongoose, morgan, passport, passport-local, uuid

Maybe/So is built as a full-stack application following the MVC architecture. The backend is powered by Node.js and Express, with MongoDB storing users, lists, and items. Mongoose schemas define the data structure and relationships, while Passport and bcrypt provide local authentication for user accounts. Sessions are managed with express-session and flash messages are handled via connect-flash.

The frontend is rendered using EJS templates with Bootstrap for styling. Users can create, edit, and delete lists and their items. Each list’s items can be selected at random, allowing for quick decision-making. Guests can interact with the app without creating an account, while authenticated users can save their data and return later.

The app emphasizes full-stack fundamentals including authentication, data modeling, CRUD operations, and integration of server-rendered views with dynamic data.

## Optimizations

Initial optimizations focused on ensuring proper CRUD functionality, secure password handling, and clear separation of concerns following MVC principles. Bootstrap was used to create a consistent and responsive UI across devices.

## Future Improvements

Planned enhancements include:  
- Improved UI/UX and interactive design  
- Sorting and filtering of lists and items    
- Additional random games and interactive features  
- Enhanced accessibility and performance optimizations  

## Lessons Learned:

This project reinforced key full-stack development concepts, including MVC architecture, authentication, data modeling, and managing session state. Working on the random selection functionality and user-specific data storage highlighted best practices for combining server-side logic with dynamic frontend rendering. It also emphasized the importance of planning for scalable features and designing a responsive, user-friendly interface.