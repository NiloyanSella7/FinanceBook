require("dotenv").config();
require("ejs");
require("./src/config/mongodb");
require("./src/config/passport-config");

const express = require("express");
const session = require("express-session");
const passport = require("passport");

const path = require("path");
express.static(path.join(__dirname, "public"));
// const hotReload = require("../hot-reload");
const { isAuthenticated } = require("./src/middleware");
const Transaction = require("./src/models/Transaction");
const api = require("./src/routes/api");
const calculateStats = require("./src/utils/calculateStats");

const MongoStore = require("connect-mongo");
const { deserializeUser } = require("passport");
const app = express();
const PORT = 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://NSellathurai:${process.env.MONGODB_PASSWORD}@financebook.vg2iu3e.mongodb.net/?retryWrites=true&w=majority&appName=FinanceBook`,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(api);

// app.use(hotReload());

// VIEWS
app.get("/homepage", isAuthenticated, async (req, res) => {
  console.log(req.user);

  const transactions = await Transaction.find({ user_id: req.user._id });
  const { profitLoss, purchase, revenue } = calculateStats(transactions);

  res.render("homepage", {
    pageTitle: "Transactions overview | NS Finance",
    profitLoss,
    purchase,
    revenue,
    username: req.user.username,
    picture: req.user.picture,
  });
});

app.get("/about", isAuthenticated, (req, res) => {
  res.render("about", { pageTitle: "About us | NS Finance" });
});

app.get("/", (req, res) => {
  res.render("login", { pageTitle: "Login in | NP Finance" });
});

app.get("/signup", (req, res) => {
  res.render("signup", { pageTitle: "Sign Up | NP Finance" });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
