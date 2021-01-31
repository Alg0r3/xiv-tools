import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    console.log(`Request : ${req.url}`);
    
    // Headers and status codes are inferred
    res.send('IT\'S WORKING');
});

// http.createServer()
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
