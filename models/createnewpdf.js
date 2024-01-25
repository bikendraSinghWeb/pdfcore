const mongoose = require('mongoose'); 
const bcrypt = require("bcrypt")

var schema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    address:{
        type: String,
        require: true,
    },
    phone:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    cpPassword:{
        type:String,
        require: true,
    },
    language:{
        type: String,
        require: true,
    },
    rocket:{
        type: String,
        require: true,
    },
    country:{
        type: String,
        require: true,
    },
    image:{
        type: String,
        require: true,
    },


    
    clientSurname:{
        type: String,
        require: true,
    },
    clientFirstname:{
        type: String,
        require: true,
    },
    surname:{
        type: String,
        require: true,
    },
    firstname:{
        type: String,
        require: true,
    },
    homePhone:{
        type: Number,
        require: true,
    },
    mobilePhone:{
        type: Number,
        require: true,
    },
    workphone:{
        type: Number,
        require: true,
    },
    emailA:{
        type: String,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    Position:{
        type: String,
        require: true,
    },
    Organisation:{
        type: String,
        require: true,
    },
    ContactDetail:{
        type: String,
        require: true,
    },
    referrerReason:{
        type: String,
        require: true,
    },
    countryOfBirth:{
        type: String,
    },
    preferredLanguage:{
        type: String,
        require: true,
    },
    aboriginal:{
        type: String,
        require: true,
    },
    interpreter:{
        type: String,
        require: true,
    },
    otherSupport:{
        type: String,
        require: true,
    },
    actionTaken:{
        type: String,
        require: true,
    },
    guardianDeclaration:{
        type: String,
        require: true,
    },
    fullName:{
        type: String,
        require: true,
    },
    date:{
        type: String,
        require: true,
    },
    signatureImage:{ 
        type: String,
        require: true,
    },
    pdfPath:{
        type: String,
    },
});

schema.methods.comparePassword = function (password){
    const coparePass = bcrypt.compare(password,this.password)
    return coparePass;
}

module.exports = mongoose.model('referral', schema);



