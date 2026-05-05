require('dotenv').config()

const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const upload = require("./utils/multer");
const ImageKit = require('@imagekit/nodejs')

// Middleware
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
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")

    res.status(200).json({
      message: "Succeed read data pokemon",
      data: data.results
    })
  } catch (err) {
    next(err);
  }
});

app.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    // TODO: Upload the file and return the result

    // Initialization imagekit
    const client = new ImageKit({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // from dashboard, developer option at imagekit
    });

    const response = await client.files.upload({
      file: await ImageKit.toFile(Buffer.from(req.file.buffer), "image"), // input buffer from req.file here
      fileName: req.file.originalname, // input original name from req.file here
    });

    res.status(200).json({
      message: "Succeed upload image",
      url: response.url
    })
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
    message,
  });
});

// Listener
app.listen(port, () => {
  console.log(`Apps is listening at http://localhost:${port}`);
});
