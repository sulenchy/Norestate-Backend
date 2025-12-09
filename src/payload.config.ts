import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Properties from './collections/Properties';
import Media from './collections/Media';
import { ApiDocs } from './collections/ApiDocs';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Properties,
    Media,
    ApiDocs,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.NODE_ENV === 'development' ? process.env.DATABASE_URI : process.env.DATABASE_URL_PROD,
    }
  }),
  endpoints: [
    {
      path: '/docs',
      method: 'get',
      handler: async (req, res) => {
        const apiDoc = await req.payload.find({
          collection: 'api-docs',
          where: {
            title: {
              equals: 'API Documentation',
            },
          },
        });

        if (apiDoc.docs.length > 0) {
          const content = apiDoc.docs[0].content;
          // A simple way to convert SlateJS rich text to HTML
          const html = content.map(node => {
            if (node.type === 'h1') return `<h1>${node.children[0].text}</h1>`;
            if (node.type === 'h2') return `<h2>${node.children[0].text}</h2>`;
            if (node.type === 'h3') return `<h3>${node.children[0].text}</h3>`;
            if (node.type === 'p' || node.type === 'li') return `<p>${node.children.map(leaf => {
              if(leaf.bold) return `<strong>${leaf.text}</strong>`
              if(leaf.italic) return `<em>${leaf.text}</em>`
              return leaf.text
            }).join('')}</p>`;
            if (node.type === 'ul') return `<ul>${node.children.map(li => `<li>${li.children[0].text}</li>`).join('')}</ul>`;
            if (node.type === 'ol') return `<ol>${node.children.map(li => `<li>${li.children[0].text}</li>`).join('')}</ol>`;
            return '<br>';
          }).join('');
          res.setHeader('Content-Type', 'text/html');
          res.status(200).send(html);
        } else {
          res.status(404).send('API Documentation not found.');
        }
      },
    }
  ]
});
