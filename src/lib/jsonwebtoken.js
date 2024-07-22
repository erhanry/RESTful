import { promisify } from "util";
import jwt from "jsonwebtoken";

export const sign = promisify(jwt.sign);
export const verify = promisify(jwt.verify);
