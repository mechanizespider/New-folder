var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String
        },
        role: {
            type: String,
            default: "Student"
        },
        student_id: {
            type: String,
            required: [true, "student id is required"]
        },
        student_name: {
            type: String,
            required: [true, "student_name is required"]

        },
        student_year: {
            type: String,
            required: [true, "student_year is required"]
        },
        course_id: {
            type: String,
            required: [true, "course_id is required"]
        },
        course_name: {
            type: String,
            required: [true, "course_name is required"]
        },
        semester: {
            type: String,
            required: [true, "semester is required"]
        },
        assignment_name: {
            type: String,
            required: [true, "assignment_name is required"]
        },
        assignment_desc: {
            type: String,
            required: [true, "assignment_desc is required"]
        },
        assignment_percentage: {
            type: String,
            required: [true, "assignment_percentage is required"]
        },
        technology_use: {
            type: String,
            required: [true, "technology_use is required"]
        },
        scope: {
            type: String,
            required: [true, "scope is required"]
        },
        description: {
            type: String,
            required: [true, "description is required"]
        },
        link_to_industry: {
            type: String,
            required: [true, "link_to_industry id is required"]
        },
        application: {
            type: String,
            required: [true, "application is required"]
        },
        photo: {
            type: String,
            default: ""
        }
    }
);

userSchema.methods.comparePassword = function(inputPassword, callback) {
    bcrypt.compare(inputPassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

//Export model
module.exports = mongoose.model('User', userSchema);
