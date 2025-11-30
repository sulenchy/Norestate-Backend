import type { Payload } from 'payload';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export const seed = async (payload: Payload) => {
  console.log('Seeding admin user...');
  const adminUser = await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'password',
      role: 'admin',
    },
  });
  console.log('Admin user created:', adminUser.email);

  console.log('Seeding agent user...');
  const agentUser = await payload.create({
    collection: 'users',
    data: {
      email: 'agent@example.com',
      password: 'password',
      role: 'agent',
    },
  });
  console.log('Agent user created:', agentUser.email);

  console.log('Seeding placeholder media...');
  const media1 = await payload.create({
    collection: 'media',
    data: {
      alt: 'Property Image 1',
      user: agentUser.id,
    },
  });
  const media2 = await payload.create({
    collection: 'media',
    data: {
      alt: 'Property Image 2',
      user: agentUser.id,
    },
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

  console.log('Seeding complete!');
};