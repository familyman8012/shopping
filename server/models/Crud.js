const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crudSchema = mongoose.Schema
({   
   name : {
       type:String,
   },
   job :  {
        type:String,
    },
    hobby : {
        type:String,
    }
}, {timestamps: true})

const Crud = mongoose.model('Crud', crudSchema);

module.exports = { Crud }