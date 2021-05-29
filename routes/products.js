const express = require('express');
const router = express.Router();

router.get('/', auth('get:products'), (req, res) => {
    
});

router.get('/:id', auth('get:products'), (req, res) => {

});

router.post('/', auth('post:products'), (req, res) => {

});

router.delete('/:d', auth('delete:products'), (req, res) => {

});

router.put('/:id', auth('put:products'), (req, res) => {

});

router.get('/filter', auth('get:products'), (req, res) => {
    //implement filtering using tags, categories and search terms
});

router.get('/:id/reviews', auth('get:product-reviews'), (req, res) => {

});


module.exports = router;