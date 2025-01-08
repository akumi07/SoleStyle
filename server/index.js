require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDatabase = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error");

// Configure CORS
const allowedOrigins = process.env.CLIENT_URL; // Allow only the frontend domain
app.use(
  cors({
    origin: "*", // Allow all origins (for debugging only)
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

// Serve static files
app.use(express.static("./public"));

// Import routes
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const paymentRoute = require("./routes/payments");
const adminRoute = require("./routes/admin");
const brandRoute = require("./routes/brands");
const categoryRoute = require("./routes/category");
const { webhook } = require("./controllers/payments");
const { verifyToken, adminOnly } = require("./middleware/auth");

// Webhook route (raw middleware)
app.post("/webhook", express.raw({ type: "application/json" }), webhook);

// Middleware to parse JSON
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.json({
    project: "SoleStyle API",
    description:
      "This is an API for a shoes E-commerce application. It provides endpoints for managing products, orders, and users.",
    author: {
      name: "Akash Mishra",
      portfolio: "https://portfolio-akumi07.netlify.app/",
    },
    version: "1.0.0",
  });
});

// Using routes
app.use("/api/v1/payment", verifyToken, paymentRoute);
app.use("/api/v1/", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", verifyToken, cartRoute);
app.use("/api/v1/admin", adminOnly, adminRoute);
app.use("/api/v1/brands", adminOnly, brandRoute);
app.use("/api/v1/category", adminOnly, categoryRoute);

// Catch-all route for undefined endpoints
app.get("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Middleware for errors
app.use(errorHandlerMiddleware);

// Start server
const port = process.env.PORT || 5000;
const StartServer = async () => {
  try {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    await connectDatabase(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

StartServer();
