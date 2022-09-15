import express from 'express';

import exampleRoutes from './routes/exampleRoutes.js';
import validatorRoutes from './routes/validatorRoutes.js';

const app = express();

//parse json body information from http body to req.body.* object.
app.use(express.json());

app.use('/examples', exampleRoutes);
app.use('/validation', validatorRoutes);

app.listen(3000, () => {
    console.log("Listening for requests....")
});