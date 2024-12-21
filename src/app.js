const express = require("express");
const helmet = require("helmet");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Task Management App listening on port ${PORT}`);
});
