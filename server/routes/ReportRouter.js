const ReportController = require('../controllers/ReportController');
const router = require('express').Router();
const formidable = require('express-formidable');

router.get('/', ReportController.list);

router.get('/file/:path', ReportController.serveFile);

router.post('/', formidable({type:"multipart", multiples: true}) , ReportController.add);

router.delete('/', ReportController.remove);

module.exports = router;