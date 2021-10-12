const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.get("/", express.static(path.join(__dirname, "./public")));

app.use("/images", express.static(__dirname + "/Images"));

app.post("/upload", upload.single("myImage"), (req, res) => {
  res.send("image uploaded");
});
