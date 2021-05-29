const express = require('express');
const router = express.Router();

router.get('/:id', auth('get:users'), (req, res) => {
    //distinguish between public and private views
});

router.get(':id/products', auth('get:products'), (req, res) => {

});

router.get(':id/reviews', auth(''), (req, res) => {

});

router.post(':u_id/products/:p_id/reviews', auth('post:product-reviews'), (req, res) => {

});

router.delete(':u_id/products/:p_id/reviews', auth('delete:product-reviews'), (req, res) => {

});

router.put(':id', auth('put:users'), (req, res) => {

});

module.exports = router;