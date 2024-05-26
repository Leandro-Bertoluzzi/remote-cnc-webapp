const config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    CAMERA_URL: process.env.NEXT_PUBLIC_CAMERA_URL || "http://localhost:8081",
    JWT_NAME: process.env.NEXT_PUBLIC_JWT_NAME || "remote-cnc-token",
};

export default config;
