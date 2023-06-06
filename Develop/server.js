//! Step 1: create server.js

//setup the usual dependencies
const express = require("express");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");
const PORT = process.env.PORT || 3001;
const app = express();

//setup the middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//setup the listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
    });