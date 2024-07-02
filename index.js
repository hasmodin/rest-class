const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const port = 8080;

app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engin", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public/css")));

let posts = [
    {   id: uuidv4(),
        username: "hasmdoin",
        content: "i love nepal",
    },

    {   
        id: uuidv4(),
        username: "ehan",
        content: "i am 6 years old",
    },

    {
        id: uuidv4(),
        username: "sabina",
        content: "i am a teacher",
    },
];



app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let {id } = uuidv4();
    let { username, content} = req.body;
    
    posts.push({id, username, content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});

}); 


app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
   let {id} = req.params;
   let post = posts.find((p) => id === p.id);
   let newContent = req.body.content;
   post.content = newContent;
   res.redirect("/posts");
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})