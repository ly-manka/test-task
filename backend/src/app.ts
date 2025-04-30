import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import recipeRoutes from './routes/recipeRoutes';

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.use('/recipes', recipeRoutes);

app.get('/hi', (req, res) => {
  res.send('Welcome to the Recipe API');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});