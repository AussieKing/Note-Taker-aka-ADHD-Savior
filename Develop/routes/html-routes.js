//! step 2: create the api routes.js and html routes.js
const router = require("express").Router();
const path = require("path");

// we have to export the router so that it can be used in server.j
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
}
);

// If no matching route is found default to home
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
}
);

// Export the router
module.exports = router;