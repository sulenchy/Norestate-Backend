# API Documentation

This document outlines the API endpoints and data models for the Norestate Backend application.

## Base URL

The base URL for all API endpoints is: `https://norestate-api-7pjx.onrender.com/`

Payload REST API: https://payloadcms.com/docs/rest-api/overview

## Collections

### Users

**Slug:** `users`
**Authentication:** Required (via Payload CMS authentication)

**Access Control:**
*   **Create:** Admin only
*   **Read:** Admin only
*   **Update:** Self or Admin
*   **Delete:** Admin only

**Fields:**
*   `email` (string): User's email address (used as title in admin).
*   `password` (string): User's password.
*   `bio` (textarea): User's biography.
*   `phone` (text): User's phone number.
*   `role` (select): User's role.
    *   Options: `Admin`, `Agent`
    *   Default: `agent`
    *   Access: Admin only for create/update.

### Properties

**Slug:** `properties`
**Authentication:** Required (via Payload CMS authentication)

**Access Control:**
*   **Create:** Agent or Admin
*   **Read:** Public (anyone can read)
*   **Update:** Owner (agent who created the property) or Admin
*   **Delete:** Owner (agent who created the property) or Admin

**Fields:**
*   `title` (text): Title of the property. (required)
*   `description` (textarea): Detailed description of the property. (required)
*   `price` (number): Price of the property. (required)
*   `location` (point): Geographical coordinates of the property.
*   `availability` (select): Current availability status of the property. (required)
    *   Options: `For Sale`, `For Rent`, `Sold`, `Rented`
    *   Default: `for_sale`
*   `propertyType` (select): Type of the property. (required)
    *   Options: `House`, `Apartment`, `Condo`, `Land`
*   `bedrooms` (number): Number of bedrooms.
*   `bathrooms` (number): Number of bathrooms.
*   `agent` (relationship to `users`): The agent responsible for the property. (required)
    *   Access: Admin only for create/update.
    *   Default: Automatically set to the current agent user on creation if not specified.
*   `gallery` (array): A collection of images for the property.
    *   `image` (upload to `media`): Image file for the property. (required)

### Media

**Slug:** `media`
**Authentication:** Required (via Payload CMS authentication)

**Access Control:**
*   **Create:** Public (anyone can create)
*   **Read:** Public (anyone can read)
*   **Update:** Owner (user who uploaded the media) or Admin
*   **Delete:** Owner (user who uploaded the media) or Admin

**Upload Configuration:**
*   **Static Directory:** `media` (relative to project root)
*   **MIME Types:** `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg`

**Fields:**
*   `alt` (text): Alternative text for the image. (required)
*   `user` (relationship to `users`): The user who uploaded the media. (required)
    *   Access: Hidden in admin panel.
    *   Default: Automatically set to the current user on creation.

## Custom Endpoints

### GET /

**Description:** Redirects to the `/admin` panel.
**Authentication:** None required.

---

**Note:** This documentation is generated based on the Payload CMS configuration. For more detailed API interactions (e.g., specific query parameters, request/response bodies for CRUD operations), please refer to the Payload CMS auto-generated API documentation available in the admin panel (e.g., GraphQL playground or REST API explorer).
