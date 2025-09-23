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
            tenant_id: {
              type: 'integer',
              format: 'int64',
              example: 1,
            },
            email: {
              type: 'string',
              example: 'johndoe@example.com',
            },
            role: {
              type: 'string',
              example: 'OWNER',
            },
            public_key: {
              type: 'string',
              example: '',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-13T00:00:00Z',
            },
          },
        },
        'Tenant': {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Company XYZ',
            },
            plan: {
              type: 'string',
              example: 'FREE',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2025-01-13T00:00:00Z',
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
        'Tenant': {
          description: 'Tenant object that needs to be added',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Tenant',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./controllers/*.ts'], // files containing annotations as above
}