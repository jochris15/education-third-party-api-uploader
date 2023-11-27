// If not production, use dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const upload = require('./utils/multer')
// Key: "file" is the key from the form-data
const middlewareUpload = upload.single("file");
const imagekit = require('./utils/imageKit')

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Why does charmander have noodles on his head?",
  });
});

app.get("/pokemon", async (req, res, next) => {
  try {
    // TODO: Get the pokemon from the third party API
    const { pokemonAPI } = require('./api/axios')
    // This is the query parameters that we need to pass to the API
    // https://pokeapi.co/api/v2/pokemon?offset=0&limit=50
    const { data } = await pokemonAPI.get('/?offset=0&limit=50')

    res.status(200).json({
      data
    });
  } catch (err) {
    next(err);
  }
});

app.post("/upload", middlewareUpload, async (req, res, next) => {
  try {
    // TODO: Upload the file and return the result
    /*
    req.file 
    {
      fieldname: string,
      originalname: string,
      encoding: string,
      mimetype: string,
      buffer: Buffer,
      size: number
    }
    */

    // Usually we need to convert the image (Buffer) to base64 (string)
    const imageInBase64 = req.file.buffer.toString("base64");

    // Upload the file to ImageKit
    // https://www.npmjs.com/package/imagekit#file-upload
    const result = await imagekit.upload({
      file: imageInBase64,
      // Get the filename from the originalname (req.file)
      fileName: req.file.originalname,
      // [Optional] set the image tags
      tags: ["test"],
    });

    console.log(result);
    res.status(201).json({
      message: "Upload success, see console for the result",
    });
  } catch (err) {
    next(err);
  }
});


// Error Handling
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  console.error(err.stack);
  res.status(statusCode).json({
    message
  });
});

// Listener
app.listen(port, () => {
  console.log(`Apps is listening at http://localhost:${port}`);
});
