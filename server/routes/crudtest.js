
const express = require('express');
const router = express.Router();
const { Crud } = require("../models/Crud");
const { restart } = require('nodemon');

//=================================
//             Crud
//=================================

//create 저장
router.post('/createDatas', (req, res)=> {
    // 저장  
    const crud = new Crud(req.body)
    crud.save((err,doc)=>{
        if (err) return res.json({success:false, err})
        res.status(200).json({success:true, doc})
    })
})

//read 저장
router.get('/readDatas', (req, res)=> {
    // 비디오를 DB 에서 가져와서 클라이언트에게 보낸다
    Crud.find()
        .exec((err,cruds)=> {
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true, cruds})
        })
})

module.exports = router;
