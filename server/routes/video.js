const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { restart } = require('nodemon');
//=================================
//             Video
//=================================

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")



router.post('/uploadfiles', (req, res)=> {
    // 비디오를 서버에 저장한다.
    upload(req,res,err => {
        if(err) {
            return res.json({success:false, err})
        }
        return res.json({success:true, url:res.req.file.path, fileName:res.req.file.filename })
    })

})


router.post('/uploadVideo', (req, res)=> {
    // 비디오 정보들을 저장한다.
   
    const video = new Video(req.body)
    video.save((err,doc)=>{
        if (err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })

})

router.post("/getSubscriptionVideos", (req, res) => {


    //Need to find all of the Users that I am subscribing to From Subscriber Collection 
    
    Subscriber.find({ 'userFrom': req.body.userFrom })
    .exec((err, subscribers)=> {
        if(err) return res.status(400).send(err);

        let subscribedUser = [];

        subscribers.map((subscriber, i)=> {
            subscribedUser.push(subscriber.userTo)
        })


        //Need to Fetch all of the Videos that belong to the Users that I found in previous step. 
        Video.find({ writer: { $in: subscribedUser }})
            .populate('writer')
            .exec((err, videos) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({ success: true, videos })
            })
    })
});

router.get('/getVideos', (req, res)=> {
    // 비디오를 DB 에서 가져와서 클라이언트에게 보낸다
    Video.find()
        .populate('writer')
        .exec((err,videos)=> {
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true, videos})
        })
})


router.post('/getVideoDetail', (req, res) => {
    Video.findOne({"_id" : req.body.videoId})
        .populate('writer')
        .exec((err, VideoDetail) => {
             if(err) return res.status(400).send(err);
             res.status(200).json({success:true, VideoDetail})
        } )
})


router.post('/thumbnail', (req, res)=> {
    // 썸네일 생성 하고 비디오 러닝타임도 가져오기

    let thumbsFilePath ="";
    let fileDuration ="";



    // 비디오 정보가져오기.
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    // 썸네일
   ffmpeg(req.body.url)
        .on('filenames', function (filenames) { // 비디오 썸네일 파일이름 만들기
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () { // end - 썸네일 만들고 나서 뭐를 할지 정해줌.  fileDuration : 영상의 러닝타임.
            console.log('Screenshots taken'); 
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .on('error', function(err){
            console.error(err);
            return res.json({success:false, err});
        })
        .screenshots({  // 썸네일 옵션 - count 3 세개의 썸네일을 띄울 수 있음.
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

})

module.exports = router;
