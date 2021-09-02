const express = require("express");
const router = express.Router();
const user = require("../model/user");
const bus = require("../model/bus");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  let { name, email, mobile, password } = req.body;
  const userExsist = await user.findOne({ mobile: mobile });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  password = hashPassword;
  if (userExsist) {
    res.send("User alredy exsit..");
  } else {
    const userCreate = await user.create({ name, email, mobile, password });
    if (userCreate) {
      res.status(200);
      res.json({
        _id: userCreate._id,
        name: userCreate.name,
        email: userCreate.email,
        mobile: userCreate.mobile,
        password: userCreate.password,
      });
    }
  }
});

router.post("/login", async (req, res, next) => {
  const { mobile, password } = req.body;
  const userAuth = await user.findOne({ mobile: mobile });
  if (userAuth) {
    await bcrypt
      .compare(password, userAuth.password)
      .then((result) => {
        if (result) {
          const token = jwt.sign(
            { _id: userAuth._id },
            "secret",
            (err, token) => {
              res.json({
                token: token,
              });
              res.status(200);
              res.send(token);
            }
          );
        } else {
          res.send("error");
        }
      })
      .catch((error) => {
        res.send("error");
      });
  } 
  else {
    
    res.send("Not found");
  }
});

router.get("/userdetails", verifyToken, (req, res) => {
  user.findOne({ _id: req._id }).then((response) => {
    const password = response.password;
    res.send(response);
  });
});

router.put("/updateuser", verifyToken, (req, res) => {
  const { name, mobile, email } = req.body;
  var newDatas = { $set: { name: name, email: email, mobile: mobile } };
  user.updateMany({ _id: req._id }, newDatas, (err, respond) => {
    if (err) {
      res.send("error");
    } else {
      res.send("Updated successfully");
      console.log("updated");
    }
  });
});

router.put("/updatepassword", verifyToken, async (req, res) => {
  let { password, oldPassword } = req.body;
  let userData = await user.findOne({ _id: req._id });
  if (userData) {
    bcrypt.compare(oldPassword, userData.password).then(async (result) => {
      if (result) {
        let salt = 10;
        let hashPassword = await bcrypt.hash(password, salt);
        console.log(hashPassword);
        let newData = { $set: { password: hashPassword } };
        user.updateOne({ _id: req._id }, newData, (err, respond) => {
          if (err) {
            res.send("error");
          } else {
            res.send("Updated successfully");
            console.log("updated");
          }
        });
      } else {
        res.send("error");
      }
    });
  } else {
    res.send("user not found");
  }
});

function verifyToken(req, res, next) {
  const token = req.header("access-token");
  if (!token) {
    res.send("We need a token");
  } else {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.send("credentials are not correct");
      } else {
        req._id = decoded._id;
        next();
      }
    });
  }
}

router.post("/search", async (req, res, next) => {
  const { from, to } = req.body;
  const busExsist = await bus.find({ from: from, to: to });
  console.log(busExsist);
  if (busExsist) {
    res.status(200);
    res.send(busExsist);
  }
});

module.exports = router;
