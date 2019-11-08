# Bootcamp 2019 - Gympoint

## Backend

### Setup and run

```shell
cd backend
yarn
yarn sequelize db:init
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn dev
```

### Routes

| Path          | Method | Description                               | Body JSON fields                                                                  | Authentication Required |
| ------------- | :----: | ----------------------------------------- | --------------------------------------------------------------------------------- | ----------------------- |
| /sessions     |  POST  | Creates a new session (generates a token) | email: string, password: string                                                   | No                      |
| /users        |  POST  | Creates a new user                        | name: string, email: string, password: string                                     | No                      |
| /users        |  PUT   | Updates an user                           | name: string, email: string, [password: string]                                   | yes                     |
| /students     |  GET   | Retrieves all students                    | N/A                                                                               | yes                     |
| /students/:id |  GET   | Retrieves a student by id                | N/A                                                                               | yes                     |
| /students     |  POST  | Creates a new student                     | name: string, email: string, age: integer, weight: float, height: float           | yes                     |
| /students/:id |  PUT   | Updates a student                           | [name: string], [email: string], [age: integer], [weight: float], [height: float] | yes                     |
| /plans        |  GET   | Retrieves all plans                    | N/A                                                                               |    yes                     |
| /plans/:id |  GET   | Retrieves a plan by id                | N/A                                                                               |    yes                     |
| /plans     |  POST  | Creates a new plan                     | title: string, duration: integer, price: float           |    yes                     |
| /plans/:id |  PUT   | Updates a plan                           | [title: string], [duration: integer], [price: float] |    yes                     |
| /plans/:id |  DELETE   | Deactivates a plan by id                | N/A                                                                               |    yes                     |

Where authetication is required, use token provided as header (authentication: bearer <token>).
