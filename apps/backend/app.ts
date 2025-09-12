import express from "express";
import userRouter from "./routes/users.js";
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import { options } from "./config/swaggerOptions.js";

const app = express();
const port = 3000;
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