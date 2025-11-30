# Norestate Backend

This is the backend for the Norestate application, a modern full-stack real estate listing and management application. It is built with [Payload CMS](https://payloadcms.com/) and [Fastify](https://www.fastify.io/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd norestate-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the database:**

    ```bash
    docker-compose up -d
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Admin Panel

The Payload CMS admin panel is available at `http://localhost:3000/admin`.

**Default Admin Credentials:**

-   **Email:** `admin@norestate.com`
-   **Password:** `password`

## Collections

The application has the following collections:

-   **Users:** Manages users of the application. Users can have the role of `admin` or `agent`.
-   **Properties:** Manages real estate properties.
-   **Media:** Manages media files, such as images for properties.

## API

The application exposes a GraphQL API. The GraphQL playground is available at `http://localhost:3000/api/graphql`.
