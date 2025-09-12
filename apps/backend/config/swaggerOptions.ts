export const options = {
  definition: {
    openapi: '3.1.1',
    info: {
      title: 'Serial Seal',
      version: '1.0.0',
    },
    components: {
      schemas: {
        'User': {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              format: 'int64',
              example: 1,
            },
            email: {
              type: 'string',
              example: 'johndoe@example.com',
            },
            passwordHash: {
              type: 'string',
              example: '12345',
            },
            role: {
              type: 'string',
              example: 'Admin',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
          },
        },
      },
      requestBodies: {
        'User': {
          description: 'User object that needs to be added',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./controllers/*.ts'], // files containing annotations as above
};