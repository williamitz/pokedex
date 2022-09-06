
export const EnvConfiguration = () => ({
    mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nest-pokemon',
    port: process.env.PORT || 3000,
    limit_default: +process.env.LIMIT_DEFAULT || 10
});