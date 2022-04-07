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

function basicDetails(category) {
    const { id, name, icon, userId } = category;
    return { id, name, icon, userId };
}

async function create(params) {
    const category = new db.Category(params);
    await category.save() 
}

async function update(id, params) {

    const category = await getById(id);

    Object.assign(category, params);
    category.updatedAt = Date.now();
    await category.save();

    return basicDetails(category);
}

async function getAll() {
    const category = await db.Category.findAll();
    return category.map(x => basicDetails(x));
}

async function getById(id) {
    const category = await db.Category.findByPk(id);
    if (!category) throw 'Category not found';
    return category;
}

async function getByUserId(id) {
    const category = await db.Category.findAll({ where: { userId: id } });
    if (!category) throw 'Category not found';
    return category;
}

async function _delete(id) {
    const category = await getById(id);
    await category.destroy();
}

async function deleteAllByUserId(id) {
    await db.Category.destroy({ where: { userId: id } })
}


