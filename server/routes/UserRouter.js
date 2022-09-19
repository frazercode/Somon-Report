const UserController = require('../controllers/UserController');
const router = require('express').Router();

router.put('/', UserController.add);

router.get('/', UserController.list);

router.post('/login', UserController.login);

router.get('/me', UserController.me);

router.post('/logout', UserController.logout);

router.post('/', UserController.update);

router.delete('/', UserController.remove);

module.exports = router;