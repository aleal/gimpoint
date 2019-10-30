# Bootcamp 2019 - Gympoint

## Backend

### Setup and run

```shell
cd backend
yarn
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
| /students/:id |  GET   | Retrieves an student by id                | N/A                                                                               | yes                     |
| /students     |  POST  | Creates a new student                     | name: string, email: string, age: integer, weight: float, height: float           | yes                     |
| /students/:id |  PUT   | Updates an user                           | [name: string], [email: string], [age: integer], [weight: float], [height: float] | yes                     |

Where authetication is required, use token provided as header (authentication: bearer <token>).
