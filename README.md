# Norestate Backend

A modern full-stack real estate listing and management application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js
*   npm
*   Docker and Docker Compose (for the database)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/sulenchy/Norestate-Backend
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `.env` file in the root of the project and add the following environment variables:
    ```
    PAYLOAD_SECRET=your-payload-secret
    DATABASE_URI=postgres://youruser:yourpassword@localhost:5432/yourdb
    ```
4.  Start the database using Docker Compose:
    ```sh
    docker-compose up -d
    ```

### Running the application

For development:
```sh
npm run dev
```

For production:
```sh
npm run build
npm run start
```

## API Endpoint

The production base API is available at: `https://norestate-api-7pjx.onrender.com/`

Read More at https://github.com/sulenchy/Norestate-Backend/blob/main/API_DOCUMENTATION.md



## Available Scripts

*   `npm run dev`: Starts the application in development mode with hot-reloading.
*   `npm run build`: Compiles the TypeScript code and builds the Payload admin panel.
*   `npm run serve`: Starts the application in production mode.
*   `npm run start`: A shortcut for `npm run serve`.
*   `npm run generate:types`: Generates TypeScript types based on your Payload collections.
*   `npm run seed`: Seeds the database with initial data.

## Technologies Used

*   [Payload CMS](https://payloadcms.com/) - A headless CMS and application framework.
*   [Fastify](https://www.fastify.io/) - A fast and low overhead web framework for Node.js.
*   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript.
*   [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
*   [Docker](https://www.docker.com/) - A platform for developing, shipping, and running applications in containers.
