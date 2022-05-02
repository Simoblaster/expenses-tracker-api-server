const db = require('_helpers/db');

module.exports = {
    create,
    update,
    getAll,
    getById,
    getByUserId,
    _delete,
    deleteAllByUserId
};

function basicDetails(transaction) {
    const { id, type, date, value, userId, categoryId, createdAt, updatedAt } = transaction;
    return { id, type, date, value, userId, categoryId, createdAt, updatedAt };
}

async function create(params) {
    const transaction = new db.Transaction(params);
    await transaction.save() 
}

async function update(id, params) {

    const transaction = await getById(id);

    Object.assign(transaction, params);
    transaction.updatedAt = Date.now();
    await transaction.save();

    return basicDetails(transaction);
}

async function getAll() {
    const transaction = await db.Transaction.findAll();
    return transaction.map(x => basicDetails(x));
}

async function getById(id) {
    const transaction = await db.Transaction.findByPk(id);
    if (!transaction) throw 'Transaction not found';
    return transaction;
}

async function getByUserId(id) {
    const transaction = await db.Transaction.findAll({ where: { userId: id } });
    if (!transaction) throw 'Transaction not found';
    return transaction;
}

async function _delete(id) {
    const transaction = await getById(id);
    await transaction.destroy();
}

async function deleteAllByUserId(id) {
    await db.Transaction.destroy({ where: { userId: id } })
}


