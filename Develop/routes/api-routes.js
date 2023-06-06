//! step 2: create the api routes.js and html routes.js
// POST request
router.post("/notes", (req, res) => {
    // req.body is where our incoming content will be
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    const noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    noteList.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// DELETE request (OPTIONAL)