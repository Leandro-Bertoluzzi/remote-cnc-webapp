const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    API_HOST: process.env.NEXT_PUBLIC_API_HOST || "localhost",
    API_PORT: process.env.NEXT_PUBLIC_API_PORT || 8000
};

export default config;
