import express from 'express';
import mysql from 'mysql'; 
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
});

db.connect();

app.get('/api/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});

app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
