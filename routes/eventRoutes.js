const express = require('express');
const multer = require("multer");

const {createEvent, getEvents, getEvent, registerAttendie, unregisterAttendie} = require('../controllers/eventController');

const upload = multer();

const protect = require('../middleware/authMiddleware');

const router = express.Router();

const multerMid = [
    {name: 'event_banner', maxCount: 1}
]

router.post('/createEvent', protect, upload.fields(multerMid), createEvent);
router.get('/getEvents', getEvents);
router.get('/getEvent/:id', getEvent);
router.post('/registerToEvent/:id', protect, registerAttendie);
router.post('/unregisterToEvent/:id', protect, unregisterAttendie);

module.exports = router;
