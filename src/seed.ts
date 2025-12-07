import type { Payload } from 'payload';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

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


  console.log('Seeding complete!');
};