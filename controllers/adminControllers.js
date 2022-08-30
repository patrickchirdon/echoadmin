const Ebook = require("../models/Ebook");
const Publisher = require("../models/Publisher");
const User = require("../models/User");

exports.getHome = async (req, res) => {
  const allEbooks = await Ebook.find();
  const allPublishers = await Publisher.find();
  const allUsers = await User.find();
  const ebooksAllNumber = allEbooks.length;
  const publishersAllNumber = allPublishers.length;
  const usersAllNumber = allUsers.length;
  const name = req.user.username;
  res.render("dashboard", {
    name: name,
    ebooksNumber: ebooksAllNumber,
    publishersAllNumber: allPublishers.length,
    usersAllNumber: allUsers.length,
  });
};
exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      const name = req.user.username;
      res.render("users", {
        users: users,
        name: name,
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getPublishers = (req, res) => {
  Publisher.find()
    .then((publishers) => {
      const name = req.user.username;
      res.render("publishers", {
        publishers: publishers,
        name: name,
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getEbooks = (req, res) => {
  Ebook.find()
    .then((ebooks) => {
      const name = req.user.username;
      res.render("ebooks", {
        ebooks: ebooks,
        name: name,
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getEbook = (req, res) => {
  const ebookId = req.params.id;
  Ebook.findById(ebookId)
    .then((ebook) => {
      const ebookPath = ebook.ebookfile;
      const name = req.user.username;
      res.render("ebook", {
        ebookPath: ebookPath,
        ebook: ebook,
        name: name,
      });
    })
    .catch((err) => {
      throw err;
    });
};
// exports.deletePublisher = async (req, res) => {
//   const hotel = await Publisher.findByIdAndDelete(req.params.id);
//   if (hotel) {
//     req.flash("success", { msg: "Success! Publisher account deleted." });
//     res.redirect("/publishers");
//   }
// };

exports.suspendPublisher = (req, res) => {
  const publisherId = req.params.id;
  Publisher.findById(publisherId)
    .then((publisher) => {
      if (publisher.isPublisher === "NO") {
        req.flash("error_msg", "The Publisher is already suspended.");
        res.redirect("/publishers");
      }
      publisher.isPublisher = "NO";

      publisher.save().then((updatedPublisher) => {
        req.flash("success_msg", "Success! Publisher suspended.");
        res.redirect("/publishers");
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};

exports.activatePublisher = (req, res) => {
  const publisherId = req.params.id;
  Publisher.findById(publisherId)
    .then((publisher) => {
      if (publisher.isPublisher === "YES") {
        req.flash("error_msg", "The Publisher is already activated.");
        res.redirect("/publishers");
      }
      publisher.isPublisher = "YES";
      publisher.save().then((updatedPublisher) => {
        req.flash("success_msg", "Success! Publisher activated.");
        res.redirect("/publishers");
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};
exports.suspendUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (user.isUser === "NO") {
        req.flash("error_msg", "The User is already suspended.");
        res.redirect("/users");
      }
      user.isUser = "NO";

      user.save().then((updatedUser) => {
        req.flash("success_msg", "Success! User suspended.");
        res.redirect("/users");
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};

exports.activateUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (user.isUser === "YES") {
        req.flash("error_msg", "The User is already activated.");
        res.redirect("/users");
      }
      user.isUser = "YES";
      user.save().then((updatedUser) => {
        req.flash("success_msg", "Success! User activated.");
        res.redirect("/users");
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};
exports.approveEbook = (req, res) => {
  const ebookId = req.params.id;
  Ebook.findById(ebookId)
    .then((ebook) => {
      ebook.isApproved = "YES";
      ebook.save().then((updatedEbook) => {
        req.flash("success_msg", "Success! Ebook Approved.");
        res.redirect("/ebooks");
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};
exports.disapproveEbook = (req, res) => {
  const ebookId = req.params.id;
  Ebook.findById(ebookId)
    .then((ebook) => {
      if (ebook.isApproved === "NO") {
        req.flash("error_msg", "The eBook is already disapproved.");
        res.redirect("/ebooks");
      }
      ebook.isApproved = "NO";
      ebook.save().then((updatedEbook) => {
        req.flash("success_msg", "Success! Ebook Disapproved!");
        res.redirect("/ebooks");
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};
