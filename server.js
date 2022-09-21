//initial const
const fs = require("fs");
const path = require("path");
const port = process.env.PORT||3001;
const express = require("express");
const app = express();
const notes = require("./db/db.json");


//normal express usage
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));


//getting specific parts of the path of index and notes html
app.get("/api/notes", (req,res)=>{
    res.json(notes.slice(1));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});




//adding note function
function create(body, notearray){
    const newNote = body;
    if(!Array.isArray(notearray))
        notearray =[];
    
    if(notearray.length === 0)
            notearray.push(0);
    body.id = notearray[0];
    notearray[0]++;

    notearray.push(newNote);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notearray, null, 2));

    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = create(req.body, notes);
    res.json(newNote);
});




//delete note function
function deleteit(id, notearray){
    for(let i =0; i<notearray.length;i++){
        let note = notearray[1];

        if(note.id == id){
            notearray.splice(i,1);
            fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notearray,null,2));
        break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteit(req.params.id, notes);
    res.json(true);
});





//console log for port calling
app.listen(port, () => {
    console.log(`Active port on ${port}! `);
});