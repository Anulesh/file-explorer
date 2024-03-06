export const fileFolderData = {
  type: 'folder',
  name: 'parent',
  id: 'root',
  data: [
    {
      type: 'folder',
      name: 'root',
      id: '1',
      data: [
        {
          type: 'folder',
          name: 'src',
          id: '2',
          data: [
            {
              type: 'file',
              meta: 'js',
              name: 'index.js',
              id: '3',
            },
          ],
        },
        {
          type: 'folder',
          name: 'public',
          id: '4',
          data: [
            {
              type: 'file',
              meta: 'ts',
              name: 'index.ts',
              id: '5',
            },
          ],
        },
        {
          type: 'file',
          meta: 'html',
          name: 'index.html',
          id: '6',
        },
        {
          type: 'folder',
          name: 'data',
          id: '7',
          data: [
            {
              type: 'folder',
              name: 'images',
              id: '8',
              data: [
                {
                  type: 'file',
                  meta: 'img',
                  name: 'image.png',
                  id: '9',
                },
                {
                  type: 'file',
                  meta: 'img',
                  name: 'image2.webp',
                  id: '10',
                },
              ],
            },
            {
              type: 'file',
              meta: 'svg',
              name: 'logo.svg',
              id: '11',
            },
          ],
        },
        {
          type: 'file',
          meta: 'css',
          name: 'style.css',
          id: '12',
        },
      ],
    },
  ],
};
