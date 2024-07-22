import categoryModel from "../models/categoryModel.js";

const create = (newData) => categoryModel.create(newData);

const getOne = (id) => categoryModel.findById(id).select({ owner: 0 });

const getAll = () => categoryModel.find().select({ _id: 1, title: 1, path: 1 });

const update = (id, newData, ownerId) =>
    categoryModel.findByIdAndUpdate(id, newData, { new: true, runValidators: true }).where("owner").equals(ownerId);

const del = (id, ownerId) => categoryModel.findByIdAndDelete(id).where("owner").equals(ownerId);

const categoryService = {
    create,
    getOne,
    getAll,
    update,
    del,
};

export default categoryService;
