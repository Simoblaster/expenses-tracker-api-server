const express = require('express');
const router = express.Router();
const categoryService = require('./category.service');

// routes
router.post('/create', create);
router.put('/update/:id', update);
router.get('/getAll', getAll);
router.get('/getById/:id', getById);
router.get('/getByUserId/:id', getByUserId);
router.get('/delete/:id', _delete);
router.get('/deleteAllByUserId/:id', deleteAllByUserId);

module.exports = router;

function create(req, res, next) {
    categoryService.create(req.body, req.get('origin'))
        .then(() => res.json({ message: 'created' }))
        .catch(next);
}

function update(req, res, next) {
    categoryService.update(req.params.id, req.body)
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getAll(req, res, next) {
    categoryService.getAll()
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getById(req, res, next) {
    categoryService.getById(req.params.id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(next);
}

function getByUserId(req, res, next) {
    categoryService.getByUserId(req.params.id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(next);
}

function _delete(req, res, next) {
    categoryService._delete(req.params.id)
        .then(() => res.json({ message: 'Categories deleted successfully' }))
        .catch(next);
}

function deleteAllByUserId(req, res, next) {
    categoryService.deleteAllByUserId(req.params.id)
        .then(() => res.json({ message: 'Categories deleted successfully' }))
        .catch(next);
}