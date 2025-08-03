const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");

var session = require("express-session");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });
// Connect to database
const { connectDB, syncedDB, disconnectDB } = require("./config/db");
connectDB();
// syncedDB();

// Route files
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const transactionRoute = require("./routes/transaction");
const notificationRoute = require("./routes/notification");
const stateRoute = require("./routes/state");
const cityRoute = require("./routes/city");
const countryRoute = require("./routes/country");
const regionRoute = require("./routes/region");
const businessTypeRoute = require("./routes/business.type");
const businessRoute = require("./routes/business");
const businessProductCategoryRoute = require("./routes/product.category");
const businessProductSubCategoryRoute = require("./routes/product.subcategory");
const paymentOptionRoute = require("./routes/payment.option");
const sellerBusinessRoute = require("./routes/seller.business");
const sellerBusinessSettingsRoute = require("./routes/seller.business.settings");
const ShippingRoute = require("./routes/shipping");
const selfShippingRoute = require("./routes/shipping.self");
const pickupShippingRoute = require("./routes/shipping.pickup");
const PlanRoute = require("./routes/plan");
const PlanFeatureRoute = require("./routes/plan.feature");
const SellerPlanRoute = require("./routes/seller.plan");
const eliteRoute = require("./routes/elite");
const eliteAdminRoute = require("./routes/Bloomzon.eliteAdmin/elite.admin");
const reelsRoute = require("./routes/reels");
const reelsAdminRoute = require("./routes/BloomzonAdmin/reels.admin");

const app = express();

var sess = {
  secret: "codeDapp",
  cookie: {},
  name: "bloomzon",
  resave: false,
  saveUninitialized: false,
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

// app.use(cookieParser);
// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/google72c4d03ac3b9f0cc.html"));
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/transaction", transactionRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/region", regionRoute);
app.use("/api/v1/country", countryRoute);
app.use("/api/v1/businesstype", businessTypeRoute);
app.use("/api/v1/business", businessRoute);
app.use("/api/v1/businessproductcategory", businessProductCategoryRoute);
app.use("/api/v1/businessproductsubcategory", businessProductSubCategoryRoute);
app.use("/api/v1/paymentoption", paymentOptionRoute);
app.use("/api/v1/sellerbusiness", sellerBusinessRoute);
app.use("/api/v1/shipping", ShippingRoute);
app.use("/api/v1/plan", PlanRoute);
app.use("/api/v1/planfeature", PlanFeatureRoute);
app.use("/api/v1/sellerplan", SellerPlanRoute);
app.use("/api/v1/state", stateRoute);
app.use("/api/v1/city", cityRoute);
app.use("/api/v1/businesssetting", sellerBusinessSettingsRoute);
app.use("/api/v1/selfshipping", selfShippingRoute);
app.use("/api/v1/pickupshipping", pickupShippingRoute);
app.use("/api/v1/elite", eliteRoute);
app.use("/api/v1/elite/admin", eliteAdminRoute);
app.use("/api/v1/reels/", reelsRoute);
app.use("/api/v1/reels/admin", reelsAdminRoute);

app.use(errorHandler);

const PORT = process.env.PORT;

// Load Cron Jobs
require("./cronJobs/autoExpiry");
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.SERVER_ROOT_URI}/${PORT}`
      .yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  disconnectDB();
});

process.on("uncaughtException", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
