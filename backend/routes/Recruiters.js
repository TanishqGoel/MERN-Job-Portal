var express = require("express");
var router = express.Router();

let Token = require('../models/token');
const Recruiter = require("../models/Recruiters");
const Job = require("../models/Job");
const User = require("../models/Users");
const Recruiters = require("../models/Recruiters");

// GET request 
// Getting all the users
// router.get("/", function(req, res) {
//     Recruiter.find(function(err, users) {
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


// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new Recruiter({
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

router.post('/job/add', (req, res) => {
    Authorize(req)
    .then(user =>{
        console.log(user)
        if(!user) return res.status(400).json({'message': 'User not found1'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) 
                {
                    console.log("C");
                    return res.status(400).json({'message': 'User not found'});
                }
                if(user.type != "Recruiter") 
                {
                    console.log(user.type);
                    return res.status(401).json({'message': 'User not authorized'});
                }
                // console.log(req);
                let job = new Job(req.body);
                console.log(job);
                job.recruiter = user;
                job.save()
                .then(job => {
                    res.status(201).json(job);
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
    })
    .catch(err => {
        res.status(400).send(err);
    });    
});

// View Jobs
router.get('/job/view', (req, res) => {
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found nyee'});
        User.findOne({_id: user})
            .then(user => {
                if(!user) return res.status(400).json({'message': 'User not found'});
                if(user.type != "Recruiter") 
                    return res.status(401).json({'message': 'User not authorized'});
                
                Job.find({recruiter: user}) // All orders
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


router.get('/', (req, res) => {
    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found1'});
        User.findOne({_id: user})
            .then(user => {
                if(!user){ return res.status(400).json({'message': 'User not found2  '});}
                if(user.type != "Recruiter") 
                {   
                    return res.status(401).json({'message': 'User not authorized'});
                }
                Recruiter.find({username: user.username})
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

router.post('/recruiterprofile/edit', (req, res) => {

    Authorize(req)
    .then(user =>{
        if(!user) return res.status(400).json({'message': 'User not found'});
        User.findOne({_id: user})
            .then(user => {
                if(user.type != "Recruiter") 
                    return res.status(401).json({'message': 'Invalid User type'});
                
                Recruiters.findOne({_id: req.body.id})
                    .then( profile => {
                        console.log(profile);
                        if(!profile) return res.status(400).json({'message': 'Profile not found'});
                           
                            profile.username =  req.body.username;
                            profile.email = req.body.email;
                            profile.contactNumber = req.body.contactNumber;
                            profile.Bio = req.body.Bio;
                            console.log(profile);
                            profile.save();
                            res.status(200).json(profile);
                        })
                    .catch(err => res.status(400).json(err));
                })
                
            .catch(err => {
                res.status(400).send(err);
            });
     })
    .catch(err => {
        res.status(400).send(err);
    });    
});
module.exports = router;

