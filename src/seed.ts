import type { Payload } from 'payload';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const apiDocContent = [
  {
    type: 'h1',
    children: [{ text: 'API Documentation' }],
  },
  {
    type: 'p',
    children: [
      {
        text: 'This document outlines the API endpoints and data models for the Norestate Backend application.',
      },
    ],
  },
  {
    type: 'h2',
    children: [{ text: 'Collections' }],
  },
  {
    type: 'h3',
    children: [{ text: 'Users' }],
  },
  {
    type: 'p',
    children: [
      { text: 'Slug:', bold: true },
      { text: ' `users`' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Authentication:', bold: true },
      { text: ' Required (via Payload CMS authentication)' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Access Control:', bold: true },
    ],
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: 'Create:', bold: true }, { text: ' Admin only' }] },
      { type: 'li', children: [{ text: 'Read:', bold: true }, { text: ' Admin only' }] },
      { type: 'li', children: [{ text: 'Update:', bold: true }, { text: ' Self or Admin' }] },
      { type: 'li', children: [{ text: 'Delete:', bold: true }, { text: ' Admin only' }] },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Fields:', bold: true },
    ],
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: 'email', bold: true }, { text: ' (string): User\'s email address (used as title in admin).' }] },
      { type: 'li', children: [{ text: 'password', bold: true }, { text: ' (string): User\'s password.' }] },
      { type: 'li', children: [{ text: 'bio', bold: true }, { text: ' (textarea): User\'s biography.' }] },
      { type: 'li', children: [{ text: 'phone', bold: true }, { text: ' (text): User\'s phone number.' }] },
      { type: 'li', children: [{ text: 'role', bold: true }, { text: ' (select): User\'s role.' }] },
    ],
  },
  {
    type: 'h3',
    children: [{ text: 'Properties' }],
  },
  {
    type: 'p',
    children: [
      { text: 'Slug:', bold: true },
      { text: ' `properties`' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Authentication:', bold: true },
      { text: ' Required (via Payload CMS authentication)' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Access Control:', bold: true },
    ],
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: 'Create:', bold: true }, { text: ' Agent or Admin' }] },
      { type: 'li', children: [{ text: 'Read:', bold: true }, { text: ' Public (anyone can read)' }] },
      { type: 'li', children: [{ text: 'Update:', bold: true }, { text: ' Owner (agent who created the property) or Admin' }] },
      { type: 'li', children: [{ text: 'Delete:', bold: true }, { text: ' Owner (agent who created the property) or Admin' }] },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Fields:', bold: true },
    ],
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: 'title', bold: true }, { text: ' (text): Title of the property. (required)' }] },
      { type: 'li', children: [{ text: 'description', bold: true }, { text: ' (textarea): Detailed description of the property. (required)' }] },
      { type: 'li', children: [{ text: 'price', bold: true }, { text: ' (number): Price of the property. (required)' }] },
      { type: 'li', children: [{ text: 'location', bold: true }, { text: ' (point): Geographical coordinates of the property.' }] },
      { type: 'li', children: [{ text: 'availability', bold: true }, { text: ' (select): Current availability status of the property. (required)' }] },
      { type: 'li', children: [{ text: 'propertyType', bold: true }, { text: ' (select): Type of the property. (required)' }] },
      { type: 'li', children: [{ text: 'bedrooms', bold: true }, { text: ' (number): Number of bedrooms.' }] },
      { type: 'li', children: [{ text: 'bathrooms', bold: true }, { text: ' (number): Number of bathrooms.' }] },
      { type: 'li', children: [{ text: 'agent', bold: true }, { text: ' (relationship to `users`): The agent responsible for the property. (required)' }] },
      { type: 'li', children: [{ text: 'gallery', bold: true }, { text: ' (array): A collection of images for the property.' }] },
    ],
  },
  {
    type: 'h3',
    children: [{ text: 'Media' }],
  },
  {
    type: 'p',
    children: [
      { text: 'Slug:', bold: true },
      { text: ' `media`' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Authentication:', bold: true },
      { text: ' Required (via Payload CMS authentication)' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Access Control:', bold: true },
    ],
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: 'Create:', bold: true }, { text: ' Public (anyone can create)' }] },
      { type: 'li', children: [{ text: 'Read:', bold: true }, { text: ' Public (anyone can read)' }] },
      { type: 'li', children: [{ text: 'Update:', bold: true }, { text: ' Owner (user who uploaded the media) or Admin' }] },
      { type: 'li', children: [{ text: 'Delete:', bold: true }, { text: ' Owner (user who uploaded the media) or Admin' }] },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Upload Configuration:', bold: true },
    ],
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: 'Static Directory:', bold: true }, { text: ' `media` (relative to project root)' }] },
      { type: 'li', children: [{ text: 'MIME Types:', bold: true }, { text: ' `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg`' }] },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Fields:', bold: true },
    ],
  },
  {
    type: 'ul',
    children: [
      { type: 'li', children: [{ text: 'alt', bold: true }, { text: ' (text): Alternative text for the image. (required)' }] },
      { type: 'li', children: [{ text: 'user', bold: true }, { text: ' (relationship to `users`): The user who uploaded the media. (required)' }] },
    ],
  },
  {
    type: 'h2',
    children: [{ text: 'Custom Endpoints' }],
  },
  {
    type: 'h3',
    children: [{ text: 'GET /' }],
  },
  {
    type: 'p',
    children: [
      { text: 'Description:', bold: true },
      { text: ' Redirects to the `/admin` panel.' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Authentication:', bold: true },
      { text: ' None required.' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: '---' },
    ],
  },
  {
    type: 'p',
    children: [
      { text: 'Note:', bold: true },
      { text: ' This documentation is generated based on the Payload CMS configuration. For more detailed API interactions (e.g., specific query parameters, request/response bodies for CRUD operations), please refer to the Payload CMS auto-generated API documentation available in the admin panel (e.g., GraphQL playground or REST API explorer).' },
    ],
  },
];

export const seed = async (payload: Payload) => {
  const adminUserResult = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'admin@example.com',
      },
    },
  });

  if (adminUserResult.docs.length === 0) {
    console.log('Seeding admin user...');
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'password',
        role: 'admin',
      },
    });
    console.log('Admin user created.');
  }

  const agentUserResult = await payload.find({
    collection: 'users',
    where: {
      email: {
        equals: 'agent@example.com',
      },
    },
  });

  let agentUser = agentUserResult.docs[0];

  if (!agentUser) {
    console.log('Seeding agent user...');
    agentUser = await payload.create({
      collection: 'users',
      data: {
        email: 'agent@example.com',
        password: 'password',
        role: 'agent',
      },
    });
    console.log('Agent user created.');
  }


  const mediaResult = await payload.find({
    collection: 'media',
    limit: 2,
  });

  if (mediaResult.docs.length === 0) {
    console.log('Seeding placeholder media...');
    const dummyImagePath = path.resolve(__dirname, '../media/1x1.jpg');
    const media1 = await payload.create({
      collection: 'media',
      data: {
        alt: 'Property Image 1',
        user: agentUser.id,
      },
      filePath: dummyImagePath,
    });
    const media2 = await payload.create({
      collection: 'media',
      data: {
        alt: 'Property Image 2',
        user: agentUser.id,
      },
      filePath: dummyImagePath,
    });
    console.log('Placeholder media created.');

    console.log('Seeding sample properties...');
    await payload.create({
      collection: 'properties',
      data: {
        title: 'Beautiful Family Home',
        description: 'A spacious family home with a large garden.',
        price: 500000,
        location: [10.0, 20.0], // Dummy coordinates
        availability: 'for_sale',
        propertyType: 'house',
        bedrooms: 4,
        bathrooms: 3,
        agent: agentUser.id,
        gallery: [
          { image: media1.id },
          { image: media2.id },
        ],
      },
    });

    await payload.create({
      collection: 'properties',
      data: {
        title: 'Modern Downtown Apartment',
        description: 'Stylish apartment in the heart of the city.',
        price: 3000,
        location: [15.0, 25.0], // Dummy coordinates
        availability: 'for_rent',
        propertyType: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        agent: agentUser.id,
        gallery: [
          { image: media2.id },
        ],
      },
    });
    console.log('Sample properties created.');
  }

  const apiDocResult = await payload.find({
    collection: 'api-docs',
    where: {
      title: {
        equals: 'API Documentation',
      },
    },
  });

  if (apiDocResult.docs.length === 0) {
    console.log('Seeding API documentation...');
    await payload.create({
      collection: 'api-docs',
      data: {
        title: 'API Documentation',
        content: apiDocContent,
      },
    });
    console.log('API documentation created.');
  }


  console.log('Seeding complete!');
};