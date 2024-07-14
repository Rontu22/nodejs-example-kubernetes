const express = require("express");
const winston = require("winston");
const morgan = require("morgan");

const app = express();
const port = 8000;

// Create a Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Create a stream object with a 'write' function for morgan
const stream = {
  write: (message) => logger.info(message.trim()),
};

// Setup morgan middleware to log HTTP requests
app.use(
  morgan(
    ":remote-addr :method :url :status :res[content-length] - :response-time ms",
    { stream }
  )
);

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", message: "Ok, I am healthy " });
});

app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}`);
  console.log(`Example app listening at http://localhost:${port}`);
});
