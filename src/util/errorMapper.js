import { MongooseError } from "mongoose";

export default (err) => {
    if (!err) {
        return "";
    }

    if (err instanceof MongooseError) {
        return Object.values(err.errors).map((x) => x.message);
    } else if (Array.isArray(err)) {
        return err.map((e) => e.msg);
    } else if (err instanceof Error) {
        return err.message.split("\n");
    }
};
