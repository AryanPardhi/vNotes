const User = require("../models/Users");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//   signup controll
exports.user_signup = (req, res, next) => {
  let success = false;
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            success,
            message: "mail exist",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                success,
                error: err,
              });
            } else {
              success =true;
              const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              });
              user
                .save()
                .then((result) => {
                  res.status(201).json({
                    success,
                    message: "User Created",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  }

//   login controll
exports.user_login = (req, res, next) => {
  let success = false;
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            success,
            message: "Wrong Credentials",
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              success,
              message: "Wrong Credentials",
            });
          }
          if (result) {
            success = true;
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "24h",
              }
            );
            return res.status(200).json({
              success,
              message: "Success Login",
              token: token,
            });
          }
          success = false;
          return res.status(401).json({
            success,
            message: "Wrong Credentials",
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

//   delete user controll
exports.delete_user = (req, res, next) => {
    User.find({ _id: req.params.userId })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          User.deleteOne({ _id: req.params.userId })
            .exec()
            .then((result) => {
              res.status(200).json({
                message: "User Deleted",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
              });
            });
        } else {
          return res.status(409).json({
            message: "No User Exist ",
          });
        }
      });
  }