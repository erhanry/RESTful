import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

const create = async (newData) => {
    const createdProduct = await productModel.create(newData);

    await userModel.findByIdAndUpdate(newData.owner, { $push: { createdProduct: createdProduct._id } });

    return createdProduct;
};

const getOne = (id) => productModel.findById(id);

const getLast = (limit) => productModel.find().sort({ createdAt: -1 }).limit(limit);

const getOneDetailed = (id) => productModel.findById(id).populate("owner", { password: 0 }).populate("category");

const getAll = () => productModel.find();

const getCategory = (categoryId) => productModel.find({ category: categoryId }).sort({ createdAt: -1 });

const update = (id, newData, ownerId) =>
    productModel.findByIdAndUpdate(id, newData, { new: true, runValidators: true }).where("owner").equals(ownerId);

const del = async (productId, ownerId) => {
    const deleteProduct = await productModel.findByIdAndDelete(productId).where("owner").equals(ownerId);
    const boughtProduct = await userModel.updateMany(
        { boughtProduct: deleteProduct._id },
        { $pull: { boughtProduct: productId } }
    );
    const createdProduct = await userModel.updateMany(
        { createdProduct: deleteProduct._id },
        { $pull: { createdProduct: productId } }
    );

    return { deleteProduct, createdProduct, boughtProduct };
};

const bought = async (productId, userId) => {
    const boughtProduct = await productModel
        .findByIdAndUpdate(productId, { $push: { bought: userId } }, { new: true, runValidators: true })
        .where("bought")
        .ne(userId)
        .where("owner")
        .ne(userId);

    await userModel.findByIdAndUpdate(userId, { $push: { boughtProduct: boughtProduct._id } });

    return boughtProduct;
};

const countProduct = () => productModel.countDocuments();

const pagination = (limit, page) =>
    productModel
        .find()
        .limit(limit)
        .skip(limit * (page - 1));

const search = ({ title, vendor, category, description }) => {
    const searchProduct = productModel.find();
    const regex = (x) => new RegExp(x, "i");

    if (title) {
        searchProduct.find({ title: regex(title) });
    }
    if (vendor) {
        searchProduct.find({ vendor: regex(vendor) });
    }
    if (category) {
        searchProduct.find({ category: regex(category) });
    }
    if (description) {
        searchProduct.find({ description: regex(description) });
    }

    return searchProduct;
};

const productService = {
    create,
    getOne,
    getLast,
    getOneDetailed,
    getAll,
    getCategory,
    update,
    del,
    bought,
    countProduct,
    pagination,
    search,
};

export default productService;
