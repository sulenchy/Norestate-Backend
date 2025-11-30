import { CollectionConfig, FieldAccess } from 'payload/types';
import { Access } from 'payload/config';

const isAdmin: Access = ({ req: { user } }) => {
    return user?.role === 'admin';
}

const isAdminFieldAccess: FieldAccess = ({ req: { user } }) => {
    return user?.role === 'admin';
}

const isAgent: Access = ({ req: { user } }) => {
    return user?.role === 'agent';
}

const isAgentOrAdmin: Access = ({ req: { user } }) => {
    return user?.role === 'admin' || user?.role === 'agent';
}

const isOwner: Access = async ({ req, id, data }) => {
    const { user } = req;
    if (user?.role === 'admin') {
        return true;
    }
    if (user?.role === 'agent') {
        if (data?.agent === user.id) {
            return true;
        }
        if (!id) {
            return false;
        }
        const property = await req.payload.find({
            collection: 'properties',
            where: {
                and: [
                    { id: { equals: id } },
                    { agent: { equals: user.id } }
                ]
            }
        });
        return property.docs.length > 0;
    }
    return false;
}


const Properties: CollectionConfig = {
    slug: 'properties',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        create: isAgentOrAdmin,
        read: () => true,
        update: isOwner,
        delete: isOwner,
    },
    hooks: {
        beforeChange: [
            ({ req, data }) => {
                if (req.user && req.user.role === 'agent' && !data.agent) {
                    return { ...data, agent: req.user.id };
                }
                return data;
            }
        ]
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'location',
            type: 'point',
            label: 'Location',
        },
        {
            name: 'availability',
            type: 'select',
            options: [
                { label: 'For Sale', value: 'for_sale' },
                { label: 'For Rent', value: 'for_rent' },
                { label: 'Sold', value: 'sold' },
                { label: 'Rented', value: 'rented' },
            ],
            defaultValue: 'for_sale',
            required: true,
        },
        {
            name: 'propertyType',
            type: 'select',
            options: [
                { label: 'House', value: 'house' },
                { label: 'Apartment', value: 'apartment' },
                { label: 'Condo', value: 'condo' },
                { label: 'Land', value: 'land' },
            ],
            required: true,
        },
        {
            name: 'bedrooms',
            type: 'number',
        },
        {
            name: 'bathrooms',
            type: 'number',
        },
        {
            name: 'agent',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            access: {
                create: isAdminFieldAccess,
                update: isAdminFieldAccess,
            },
            defaultValue: ({ user }: any) => {
                if (user && user.role === 'agent') {
                    return user.id;
                }
            }
        },
        {
            name: 'gallery',
            type: 'array',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
};

export default Properties;
