# DiceBettingAPI
A basic dice betting API with Typescript, Sequelize &amp; GraphQL using PostgreSQL Database

Basic steps in order to run this project smoothly:

1.Clone the repo locally

2.Change the connection details in the .env file to use your local database

3.Open a terminal inside your local repo

4.Run 'npm install' to restore the node_modules folder and add the required packages 

5.Run 'npx sequelize-cli db:migrate' to run the migrations and create the tables in your local database

6.Optional: If you prefer to have some example data in your database, you can uncomment the two function invocations (createUsers(), createBets()) in src/index.ts. These two functions populate the database with seed data. Remember to comment them out again, however, as they will keep creating duplicate records in the DB on each subsequent run.

7.Run 'npm run dev' to run the application

8.Open "http://localhost:4000/" in your web browser to access the GraphQL Playground where you can build and test queries and mutations on the API!
