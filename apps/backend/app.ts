import express from "express";
import userRouter from "./routes/users.js";
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// To Do: Move swagger definitions to own file
const options = {
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

const swaggerSpec = swaggerJSDoc(options);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(bodyParser.json());

app.use('/api-docs', serve, setup(swaggerSpec))
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});