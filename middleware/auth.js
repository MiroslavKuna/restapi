export const checkAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.status(400).send("Not authenticated");
}