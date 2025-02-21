import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());


app.use(express.static(__dirname));


app.get('/', (req, res) => {
  res.send('Express JavaScript Server is Running! Serving Static Files...');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
