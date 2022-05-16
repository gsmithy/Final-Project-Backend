require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        filesize: 5 * 1024 * 1024, //keeps img size < 5mb
    },
})

const storage = new Storage({
    projectId: process.env.FIREBASE_PROJECT_ID,
    keyFilename: process.env.FIREBASE_KEY
});

const bucket = storage.bucket(process.env.FIREBASE_BUCKET)

router.post('/:id/photo', uploader.single('image'), async (req, res) => {
    const postId = req.params.id;

    if (!postId || postId <= 0) {
        res.status(400).send("Invalid ID");
        return;
    };
    const user = req.user;
    if (!user){
        res.status(403).send('Please log in!');
        return;
    }

    try {
        if (!req.file){
            res.status(400).send('No file uploaded!');
            return;
        }

        const blob = bucket.file(req.file.originalname);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        blobStream.on('error', (err) => {
            console.log(err);
            next(err);
        });

        blobStream.on('finish', () => {
            const encodedName = encodeURI(blob.name);
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedName}?alt=media`;
            console.log(publicUrl)
            res.send(publicUrl);
        })

        blobStream.end(req.file.buffer);

    } catch (error){
        res.status(400).send(`error uploading file: ${error}`)
    }
})


module.exports = router;
