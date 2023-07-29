# Blogs API

An API built using Node and Express to manage a simple blog. The development process focused on gaining a comprehensive understanding of CRUD operations, web development routing, and the implementation of the model-service-controller architecture, while also integrating authentication features. MySQL was chosen as the database to store data, and Sequelize was employed as the ORM.

## Table of Contents

* [Technologies Used](#technologies-used)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation and Running the API with docker](#installation-and-running-the-api-with-docker)
* [API Endpoints](#api-endpoints)
* [Authentication](#authentication)
* [Acknowledgments](#acknowledgments)

## Technologies Used

- Express.js: A popular web application framework for Node.js, used to build the API's backend.
- MySQL: A relational database management system utilized as the API's data store.
- Sequelize ORM: A powerful Object-Relational Mapping library used for database interactions.
- Docker/Docker-compose: Containerization platform used to package the API and its dependencies.
- JSON Web Tokens (JWT): Utilized for implementing authentication.

## Features

- Create, Read, Update, and Delete (CRUD) operations for blog posts.
- Create, Read, Update, and Delete (CRUD) operations for user accounts.
- Retrieve a list of categories and add new categories to the database.
- User authentication using JSON Web Tokens (JWT) to secure API endpoints.

## Prerequisites

Before running the project, make sure you have Docker and Docker Compose installed on your system. If you don't have them installed, follow the instructions below:

- Install Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Install Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Installation and Running the API with docker

1. Clone the repository:
    ```bash
    git clone https://github.com/tormelo/blogs-api.git
    ```
2. Navigate to the project folder:
    ```bash
    cd blogs-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the MySQL and API containers using Docker Compose:
    ```bash
    docker-compose up -d
    ```
5. Access the blogs_api container terminal by running the command:
    ```bash
    docker exec -it blogs_api bash
    ```
6. Inside the container terminal run the command to create and populate the database:
    ```bash
    npm run db:reset
    ```
7. Inside the container terminal, start the API:
    ```bash
    npm run debug
    ```
    or
     ```bash
    npm start
    ```
8. The API will be accessible at `http://localhost:3000`.

## API Endpoints

### Login
- **POST /login**: This is the user authentication endpoint. Here, you can obtain an authentication token by submitting your credentials.

### Users
- **GET /user**: Retrieve information about all the users.
- **GET /user/:id**: Retrieve information about a specific user identified by their ID.
- **POST /user**: Register a new user by providing all the necessary information.
- **DELETE /user/me**: Delete the account of the currently logged-in user.

### Categories
- **GET /categories**: Retrieve a list of categories from the database.
- **POST /categories**: Add new categories to the database.

### Posts
- **GET /post**: Retrieve a list of posts from the database.
- **GET /post/:id**: Retrieve information about a specific post identified by its unique ID.
- **GET /post/search?q=query**: Search for posts based on a query.
- **POST /post**: Create a new post.
- **PUT /post/:id**: Update an existing post identified by its ID.
- **DELETE /post/:id**: Delete a post identified by its ID.

## Authentication

The Blogs API implements authentication to secure certain routes. Users are required to register and log in to access protected endpoints. After a successful login, a token is provided, which must be included in the request headers to access protected routes.

## Acknowledgments

This project was developed during the Web Development course at Trybe. Special thanks to all the instructors who contributed to the learning process and helped in the development of this project.