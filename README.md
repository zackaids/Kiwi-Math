# Kiwi Math - OwlHacks 2024 Winning Project - Inclusive Education
This project follows the theme of Inclusive Education. It is called "KiwiMath". KiwiMath is a website built for high-schoolers who struggle in Mathematics by evaluating their skills and progress.

**Link to demo:** https://youtu.be/oSEbcB-Dp0M

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, Python, Flask, MongoDB, OpenAI

Project was built using React framework for the frontend. It first greets you with an authentication screen which is connected to MongoDB, where it stores a user's information. If the user doesn't have an account, they'd have to create one, where the front page allows it to. This was achievable by using Flask for backend, where it just uses a function to push and pull data out and into the database on MongoDB. Once logged in, the user is greeted by a main menu consisting of options: Learn, Assessment Test, Options and Profile. Learn page allows the user to access a personalized learning plan based off of an Assessment Test that they should have taken. To take an Assessment Test, the program takes the user's grade and pulls the appropriate test for the user according to their grade by using Flask on the backend to pull the test out of the external MongoDB database. Once completed, the program assesses the user's knowledge in math and plans the learning plan for the user.

## Optimizations

When I first started working on the frontend, I neglected the thought of Routers when it comes to organizing the page, as I haven't used a Router before in React. During this project, I thought that creating Routing would cause me more trouble, however it wasn't hard to implement and has saved way more time for me. I had also ran into the problem of running multiple Flask servers for backend, however, I found it easier to create a single server with all the functions in there.

## Lessons Learned:

I learned how to use Flask and React in order to build a full-stack application. Being able to work in a team environment also allowed for a more professional experience. I was able to learn how to set a project on a set path and split the work between team members.