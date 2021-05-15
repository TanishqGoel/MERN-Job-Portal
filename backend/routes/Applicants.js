var express = require("express");
var router = express.Router();

// Load User model
const Applicant = require("../models/Applicants");
const Job = require("../models/Job");
const User = require("../models/Users");
let Token = require('../models/token');
// GET request 
// Getting all the users
// router.get("/", function(req, res) {
//     Applicant.find(function(err, users) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(users);
// 		}
// 	})
// });

function Authorize(req)
{   
    let token = req.header('Authorization');
    // console.log('error2',token)
    return Token.findOne({ token: token })
        .then(token => {
            if(!token) {return null;}
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
router.post("/register", (req, res) => {
    const newUser = new Applicant({
        username: req.body.username,
        email: req.body.email,
        date: req.body.date,
        password: req.body.password,
        type:req.body.type
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	Applicant.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });
router.get('/', (req, res) => {
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found1'});
        User.findOne({_id: user})
            .then(user => {
                if(!user){ return res.status(400).json({'message': 'User not found2  '});}
                if(user.type != "Applicant") 
                {   
                    return res.status(401).json({'message': 'User not authorized'});
                }
                Applicant.find({username: user.username})
                .then( profile => {
                    console.log(profile);
                    res.status(200).json(profile)
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).send(err);
                });
       
                
            })
            .catch(err => {1
                console.log(err);
                res.status(400).send(err);
            });
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err);
    });    
});

router.get('/job/view', (req, res) => {
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found nyee'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "Applicant") 
                    return res.status(401).json({'message': 'User not authorized'});
                
                Job.find() // All orders
                .then( jobs => {
                    res.status(200).json(jobs)
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err);
            });
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err);
        
    });    
});
module.exports = router;

