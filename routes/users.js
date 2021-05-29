const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');


router.get('/:id', auth(''), (req, res) => {
    
});

router.get('/:id/products', auth(''), (req, res) => {

});

router.get('/:id/reviews', auth(''), (req, res) => {

});

router.post('/:u_id/products/:p_id/reviews', auth(''), (req, res) => {

});

router.delete('/:u_id/products/:p_id/reviews', auth(''), (req, res) => {

});

router.put('/:id', auth(''), (req, res) => {

});

router.delete('/:id', auth(''), (req, res) => {

});

router.post('/:id/addresses', auth(''), (req, res) => {

});

router.delete('/:id', auth(''), (req, res) => {

});

module.exports = router;