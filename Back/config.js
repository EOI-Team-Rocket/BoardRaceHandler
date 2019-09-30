module.exports = {
    development: {
        db: process.env.MONGODB_URI,
        port: process.env.PORT,
        url: process.env.BACK_URI,
        email: process.env.EMAIL,
        password: process.env.PASSWORD
    }
}
