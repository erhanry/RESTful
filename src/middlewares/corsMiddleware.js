export const corsMiddleware = () => (req, res, next) => {
    const origin = req?.headers?.origin || "*";

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Authorization");

    next();
};
