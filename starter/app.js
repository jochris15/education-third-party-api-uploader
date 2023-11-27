const cors = require("cors");
const express = require("express");

const app = express();
const port = 3000;

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
  } catch (err) {
    next(err);
  }
});

app.post("/upload", async (req, res, next) => {
  try {
    // TODO: Upload the file and return the result
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
