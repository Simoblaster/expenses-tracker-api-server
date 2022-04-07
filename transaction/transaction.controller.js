const express = require('express');
const router = express.Router();
const transactionService = require('./transaction.service');

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
    transactionService.create(req.body, req.get('origin'))
        .then(() => res.json({ message: 'created' }))
        .catch(next);
}

function update(req, res, next) {
    transactionService.update(req.params.id, req.body)
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getAll(req, res, next) {
    transactionService.getAll()
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getById(req, res, next) {
    transactionService.getById(req.params.id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(next);
}

function getByUserId(req, res, next) {
    transactionService.getByUserId(req.params.id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(next);
}

function _delete(req, res, next) {
    transactionService._delete(req.params.id)
        .then(() => res.json({ message: 'Transaction deleted successfully' }))
        .catch(next);
}

function deleteAllByUserId(req, res, next) {
    transactionService.deleteAllByUserId(req.params.id)
        .then(() => res.json({ message: 'Transactions deleted successfully' }))
        .catch(next);
}