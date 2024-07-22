import { sign, verify } from "../lib/jsonwebtoken.js";
import userModel from "../models/userModel.js";

const blacklist = new Set();
const JWT_SECRET = "b920n3w4dzfgadf@#ffcawert6v9";

const register = async (userData) => {
    if (userData.password !== userData.confirmPassword) {
        throw new Error("Password don't math");
    }

    // check if email is taken confirmPassword
    const existing = await userModel.findOne({ email: new RegExp(`^${userData.email}$`, "i") });

    if (existing) {
        throw new Error("Email already exists");
    }

    const createdUser = await userModel.create(userData);

    const token = await createSession(createdUser);

    return token;
};

const login = async ({ email, password }) => {
    // check if user exists
    const user = await userModel.findOne({ email: new RegExp(`^${email}$`, "i") });

    if (!user || !password) {
        throw new Error("Email or password is invalid");
    }

    // Check if password is valid
    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error("Email or password is invalid");
    }

    const token = await createSession(user);

    return token;
};

const logout = async (token) => {
    blacklist.add(token);
};

async function createSession(user) {
    const payload = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };

    const accessToken = await sign(payload, JWT_SECRET, { expiresIn: "2h" });

    return Object.assign({ payload }, { accessToken });
}

const getProfile = (id) =>
    userModel.findById(id).select({ password: 0 }).populate("createdProduct").populate("boughtProduct");

const getMe = (id) => userModel.findById(id).select({ _id: 1, firstName: 1, lastName: 1, email: 1 });

const validateToken = async (accessToken) => {
    if (blacklist.has(accessToken)) {
        throw new Error("Token is blacklisted");
    }

    return await verify(accessToken, JWT_SECRET);
};

const userService = {
    register,
    login,
    logout,
    getProfile,
    getMe,
    validateToken,
};

export default userService;
