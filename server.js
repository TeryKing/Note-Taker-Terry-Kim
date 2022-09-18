const fs = require("fs");
const path = require("path");
const port = process.env.PORT||3001;
const express = require("express");
const app = express();
const notes = require("./db/db.json");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/api/notes", (req,res)=>{
    res.json(notes.slice(1));
});


app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(true);
});

app.listen(port, () => {
    console.log(`Active port ${port}!`);
});

