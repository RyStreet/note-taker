const express = require('express');
const path = require('path')
const fs = require('fs');

const app = express();
const PORT = process.env.port || 3001;




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
let notes = require('./db/db.json')

//GET route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/')));

//Get Route for notes page
app.get('/notes', (req, res)=>
res.sendFile(path.join(__dirname, 'public/notes.html')));

//Get route for notes in database 
app.get('/api/notes', (req, res) =>{
    fs.readFile('./db/db.json', 'utf-8', (err, data)=>{
        if (err){
            console.log(err)
            return;
        }
        res.json(notes);
        console.log('GET request successful!')
    });
});

app.post('/api/notes', (req, res)=>{
  
const {title, text} = req.body

if(text && title){
    const userNote = {
        title,
        text,
    }
notes.push(userNote)
const stringifyNote = JSON.stringify(notes)

fs.writeFile('./db/db.json', stringifyNote, (err)=>{
    if (err){
        console.log(err)
    }
    console.log("Note Added!");
});
}});



//Listens to server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);