import { CollectionConfig } from 'payload/types';
import path from 'path';
import { Access } from 'payload/config';

const isAdmin: Access = ({ req: { user } }) => {
    return user?.role === 'admin';
}

const isOwner: Access = async ({ req, id }) => {
    const { user } = req;
    if (user?.role === 'admin') {
        return true;
    }
    if (!user) {
        return false;
    }
    const media = await req.payload.findByID({
        collection: 'media',
        id,
        depth: 0,
    });
    if (!media) {
        return false;
    }
    return user.id === media.user;
}

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: () => true,
    read: () => true,
    update: isOwner,
    delete: isOwner,
  },
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
        name: 'user',
        type: 'relationship',
        relationTo: 'users',
        required: true,
        hasMany: false,
        admin: {
            condition: () => false,
        },
    }
  ],
  hooks: {
    beforeChange: [
        ({ req, data }) => {
            if (req.user) {
                return { ...data, user: req.user.id };
            }
            return data;
        }
    ]
  }
};

export default Media;
