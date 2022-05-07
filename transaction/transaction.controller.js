const express = require('express');
const router = express.Router();
const transactionService = require('./transaction.service');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');

// routes
router.post('/create', authorize(), create);
router.put('/update/:id', authorize(), update);
router.get('/getAll', authorize(), getAll);
router.get('/getById/:id', authorize(), getById);
router.get('/getByUserId/:id', authorize(), getByUserId);
router.get('/delete/:id', authorize(), _delete);
router.get('/deleteAllByUserId/:id', authorize(), deleteAllByUserId);

module.exports = router;

function create(req, res, next) {
    if (Number(req.params.userId) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    transactionService.create(req.body, req.get('origin'))
        .then(() => res.json({ message: 'created' }))
        .catch(next);
}

function update(req, res, next) {
    if (Number(req.params.userId) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    transactionService.update(req.params.id, req.body)
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getAll(req, res, next) {
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    transactionService.getAll()
        .then(transaction => res.json(transaction))
        .catch(next);
}

function getById(req, res, next) {
  transactionService
    .getById(req.params.id)
    .then((transaction) => {
      if (transaction) {
        if (transaction.userId !== req.user.id) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          res.json(transaction);
        }
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
}

function getByUserId(req, res, next) {
    if (Number(req.params.id) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    transactionService.getByUserId(req.params.id)
        .then(transaction => transaction ? res.json(transaction) : res.sendStatus(404))
        .catch(next);
}

function _delete(req, res, next) {
  transactionService
    ._delete(req.params.id)
    .then((transaction) => {
      if (transaction.userId !== req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        res.json({ message: "Transaction deleted successfully" });
      }
    })
    .catch(next);
}

function deleteAllByUserId(req, res, next) {
    if (Number(req.params.id) !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    transactionService.deleteAllByUserId(req.params.id)
        .then(() => res.json({ message: 'Transactions deleted successfully' }))
        .catch(next);
}