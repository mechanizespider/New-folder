var User = require('../models/userModel');

var bcrypt = require('bcrypt-nodejs');
var secret = require('../config/hash');
var jwt = require('jsonwebtoken');
var aws = require('aws-sdk');
var fs = require('fs');

// Create new user
exports.user_sign_up = function (req, res, next) {
    req.body.password = bcrypt.hashSync(req.body.password);
    if (!req.file) {
        var newUser = new User(req.body);
        newUser.validate(function (err) {

            if (err) {
                res.send({
                    success: false,
                    code: 400,
                    err: err.message,
                });
                return false;
            } else {
                newUser.save(function (err) {
                    if (err) {
                        res.send({
                            success: false,
                            code: 600,
                            err: err,
                        });
                        return next(err);
                    }
                    res.send({
                        username: newUser.username,
                        password: newUser.password
                    });
                });
    
            }
        });
    } else {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY,
            region: process.env.REGION
        });
        const s3 = new aws.S3();
        var params = {
            ACL: 'public-read',
            Body: fs.createReadStream(req.file.path),
            Key: `photo/${req.file.originalname}`,
            Bucket: process.env.BUCKET,
        };
        s3.upload(params, (err, data) => {
            if (err) {
                return res.send({
                    error: err.message
                });
            }
            if (data) {
                fs.unlinkSync(req.file.path); // Empty temp folder
                var newUser = new User(req.body);
                newUser.validate(function(err) {
                    if (err) {
                        return res.send({error: err.message})
                    }
                    else {
                        newUser.save(function(err, user) {
                            if (err) {
                                return res.send({error: err.message})
                            }
                            req.body.photo = data.Location;
                            User.findByIdAndUpdate({_id: user._id}, {$set: req.body}, function(err, callback) {
                                if (err) {
                                    return res.send({err: err.message})
                                }
                                return res.send({
                                    mess: "Success",
                                    user_id: newUser._id
                                })
                            })
                        })
                    }
                })
            }
        });
    }
};

// Admin Login
exports.user_sign_in = function(req, res) {
    User.findOne({username: req.body.username})
        .exec(function(err, user) {
            if (err) {
                return res.send({
                    err: err
                });
            }

            if (!user) {
                return res.send({
                    err: "Authenticate failed account not found"
                });
            }

            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign({username: user.username, _id: user._id}, secret, {
                        expiresIn: 1234567890000000 // in seconds
                    });

                    res.json({
                        'result': 'authenticated',
                        id: user._id,
                        'bearer': token
                    });
                } else if (!isMatch) {
                    res.send({
                        err: 'Incorrect password'
                    });
                } else {
                    res.send({
                        err: 'Db Error',
                    });
                }
            });
        });
};

// Get all user
exports.get_all = function(req,res) {
    User.find({})
        .exec(function(err, userList) {
            if (err) {
                return res.send({
                    err: err.message
                })
            }
           
            return res.send(userList
              
            )
        })
}

// Get user by id
exports.get_by_id = function(req,res) {
    User.findById({_id: req.params.id}, function(err, user) {
        if (err) {
            return res.send({
                err: err.message
            })
        }
        return res.send({
            user: user
        })
    })
}
//delete
exports.delete_by_id = function(req,res) {
    User.deleteOne({_id: req.params.id}, function(err, result) {
        if (err) {
            return res.send({
                err: err.message
            })
        }
        return res.send({
            result
        })
    })
}

// Update
exports.update_user = function(req,res) {
    if (!req.body) {
        return res.send({
            err: "Body is empty"
        })
    }

    User.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true},function(err, data) {
        if (err) {
            return res.send({
                err: err.message
            })
        }
        return res.send({
            data,
            message: "Successfully update"
        })
    })
}