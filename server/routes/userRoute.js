const express = require("express");
const router = express.Router();
const user = require("../model/user");
const bus = require("../model/bus");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cities = require('../model/cities')
const seatsAvailability = require("../model/seatAvailability");


router.post("/register", async (req, res, next) => {
  let { name, email, mobile, password } = req.body;
  const userExsist = await user.findOne({ mobile: mobile });
  const salt = 10;
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

router.post("/login", async (req, res) => {
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
                user:userAuth.name
              });
              res.status(200);
             
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
        let newData = { $set: { password: hashPassword } };
        user.updateOne({ _id: req._id }, newData, (err, respond) => {
          if (err) {
            res.send("error");
          } else {
            res.send("Updated successfully");
          
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
  const busExsist = await bus.findOne({ from: from, to: to });
  if (busExsist) {
    res.status(200);
    res.send(busExsist);
  }
  else{
    res.send("error")

  }
});

 router.post('/updatehistory',verifyToken,async (req,res)=>{
   const {busdata} = req.body
  
  user.findOne({ _id: req._id }).then((response) => {
    if(response)
    {
    var historyDatas =  { $addToSet: {busDetails:busdata} }
    user.updateOne({ _id: req._id },historyDatas, (err, respond) => {
      if (err) {
        res.send("error");
      } else {
        res.send("Updated successfully");
        
      }
    });
  }
  })

 })


 router.get("/getuserhistory", verifyToken, (req, res) => {

  user.findOne({ _id: req._id }).then((response) => { 
    res.send(response.busDetails);   
  });
});


router.put('/updateseatcount',verifyToken,(req,res)=>{
  const {count,busnum} = req.body
  let num = parseInt(count)
  user.findOne({_id:req._id}).then(response=>{
    if(response)
    {
      
        bus.findOne({busno:busnum}).then(response=>{
        if(response){
          console.log(response)
          let reduceCount = response.NoOfSeats - num
          bus.updateOne({busno:busnum},{$set:{NoOfSeats:reduceCount}}, (err) => {
            if (err) {
              
              res.send("error");
            } else {
              res.send("Updated successfully");
              
            }
          });

        }
      })
    }
  })
  
})

router.post('/bookedseats',verifyToken,(req,res)=>{
  console.log("I get a token")
  //  console.log(req.body)
   const busdetails = req.body
   const {busno,seatsCount,date,bookedSeats} = req.body
   console.log(busdetails.bookedseats.bookedSeats)
  user.findOne({ _id: req._id }).then((response) => {
    if(response)
    {
      seatsAvailability.find({date:busdetails.bookedseats.date}).then(response=>{
        console.log(response)
        if(response)
        {
          let updateSeats = parseInt(response.noOfSeats) + parseInt(busdetails.bookedseats.bookedSeats)
          console.log(updateSeats)
          seatsAvailability.updateOne({busno:busdetails.bookedseats.busno},
            {$set:{noOfSeats:busdetails.bookedseats.seatsCount}},(err,result)=>{
              res.send("Sucess")
            })
        }
      })
      // seatsAvailability.insertMany({
      //   busno:busdetails.bookedseats.busno,
      //   noOfSeats:busdetails.bookedseats.seatsCount,
      //   date:busdetails.bookedseats.date
  
      // }).then(result=>{
      //   console.log('successfully')
      // })
    }
  })
})

router.get('/getcities',verifyToken,(req,res)=>{
  console.log('getCities')
  user.findOne({_id:req._id}).then(response=>{
    if(response)
    {
      cities.find({},(err,result)=>{
        if(err)
        {
          res.send("error")
        }
        else{
          res.send(result)
        }
        
      })}
   })
})



module.exports = router;
