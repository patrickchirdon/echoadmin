const express = require("express");
const app = express();

const authController = require("../controllers/authControllers");
const adminController = require("../controllers/adminControllers");
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

app.get("/login", forwardAuthenticated, authController.getLogin);
app.get("/register", forwardAuthenticated, authController.getRegister);
app.get("/", ensureAuthenticated, adminController.getHome);
app.get("/ebooks", ensureAuthenticated, adminController.getEbooks);
app.get("/ebook/:id", ensureAuthenticated, adminController.getEbook);
app.put(
  "/approve-ebook/:id",
  ensureAuthenticated,
  adminController.approveEbook
);
app.put(
  "/disapprove-ebook/:id",
  ensureAuthenticated,
  adminController.disapproveEbook
);
app.get("/publishers", ensureAuthenticated, adminController.getPublishers);
app.put(
  "/suspend-publisher/:id",
  ensureAuthenticated,
  adminController.suspendPublisher
);
app.put(
  "/activate-publisher/:id",
  ensureAuthenticated,
  adminController.activatePublisher
);
app.get("/users", ensureAuthenticated, adminController.getUsers);
app.put("/suspend-user/:id", ensureAuthenticated, adminController.suspendUser);
app.put(
  "/activate-user/:id",
  ensureAuthenticated,
  adminController.activateUser
);
app.get("/logout", authController.getLogout);
app.post("/login", authController.postLogin);
app.post("/register", authController.postRegister);

module.exports = app;
