var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var jwt = require('jsonwebtoken');
var secret = require('../config/hash');
var multer = require('multer');


// Not required token
router.post('/signin', userController.user_sign_in); // Admin signin (localhost:3001/users)

// req.body.student_name = ""
router.get('/getall', userController.get_all); // Get all users
// localhost:3001/users/getall
router.get('/get/:id', userController.get_by_id); // Get user by id


// check token 
router.use(function(req,res,next) {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token != null) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  } else {
    return res.send({
      code: 404,
      success: false,
      message: "No token"
    })
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
});
//
router.route('/signup').post(multer({ dest: 'folder/', limits: 5000000}).single('photo'), userController.user_sign_up); // Create new user , limit (5MB)
router.delete('/delete/:id', userController.delete_by_id);
router.put('/update/:id', userController.update_user); // Update user => require Bearer token


module.exports = router;
