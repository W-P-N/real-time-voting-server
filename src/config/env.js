import dotenv from 'dotenv';

dotenv.configDotenv({
    path: './.env'
});

const appConfig = {
    PORT: parseInt(process.env.PORT)
};

export default appConfig;
