export default () => ({
    //Connect options
    port: process.env.PORT,

    // JWT options
    secret: process.env.JWT_SECRET,
    expireJwt: 3600,
    expiresRefresh: 604800,

    //Connect to db
    db_name: process.env.DB_NAME,
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_port: process.env.DB_PORT,
});
