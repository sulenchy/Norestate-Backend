import { CollectionConfig, FieldAccess } from 'payload/types';
import { Access } from 'payload/config';

const isAdmin: Access = ({ req: { user } }) => {
    return user?.role === 'admin';
}

const isAdminFieldAccess: FieldAccess = ({ req: { user } }) => {
    return user?.role === 'admin';
}

const isSelf: Access = ({ req: { user }, id }) => {
    if (user?.role === 'admin') {
        return true;
    }
    return user?.id === id;
}

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Agent', value: 'agent' },
      ],
      defaultValue: 'agent',
      required: true,
      access: {
        create: isAdminFieldAccess,
        update: isAdminFieldAccess,
      }
    },
  ],
};

export default Users;
