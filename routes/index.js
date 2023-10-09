require('dotenv').config();
const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');


router.get('/', (req, res) => {
 res.json({
     message: 'Welcome client Member.',
 })
});


router.post('/books',BookController.create);
router.get('/books', BookController.index);
router.get('/books/:id',BookController.show);
router.put('/books/:id',BookController.update);
router.delete('/books/:id',BookController.destroy);
module.exports = router