var express = require("express");
var router = express.Router();
const bcrypt = require('bcrypt');
let Token = require('../models/token');
// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});
function Authorize(req)
{
    const token = req.header('Authorization');
    // console.log('Authorization');
    // console.log(token);
    return Token.findOne({ token: token })
        .then(token => {
            if(!token) {return null;}
            // if(Date.now() > token.expire) {
            //     let user = token.user;
            //     token.delete();
            //     token = new Token({user});
            //     token.save();
            // }
            // console.log("whiopp");
            // console.log(token.user);
            return token.user;
        })
        .catch(err => {
            console.log("Error!");
            res.status(400).send(err);
        });
};
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
// router.post("/register", (req, res) => {

//     const newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         date: req.body.date,
//         password: req.body.password,
//         type:req.body.type
//     });

//     newUser.save()
//         .then(user => {
//             res.status(200).json(user);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
// });
router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) res.status(400).send(err);
        else
        {
            let newUser = new User(req.body);
            newUser.password = hash;
            console.log(newUser);
            newUser.save()
            .then(user => {
                user.password = undefined;
                res.status(201).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
        }
    });
});


// POST request 
// Login
router.post("/login", (req, res) => {
    let username= req.body.username,password = req.body.password;
    if(!username || !password)
    {
        return res.status(400).send({'message':'Please enter all the fields'});
    }
	// Find user by email
    // User.findOne({ email:email })
    //     .then(user => {
    //         // Check if user email exists
    //         if (!user) {
    //             return res.status(404).json({
    //                 error: "Email not found",
    //             });
    //         }
    //         else{
    //             res.send("Email Found");
    //             return user;
    //         }
    //     });
    User.findOne({username : username})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                console.log(result);
                console.log(req.body.password, user.password);
                if (result){
                    Token.findOne({user})
                        .populate({
                            path: 'user'
                        })
                        .then(token => {
                            if(!token)
                            {
                                token = new Token({user: user});
                                token.save();
                            }
                            token.user.password = undefined;
                            token.expire = undefined;
                            token._id = undefined;
                            console.log(token)
                            res.status(200).send({token});

                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).send({'message': 'Token invalid'});
                        });
                }
                else res.status(400).send({'message': 'Password Incorrect'});
            });
        }
    else res.status(400).send({'message': "User not found"});
    })
    .catch(err => console.log(err));
});

module.exports = router;

