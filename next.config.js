const getNextAppConfig = require("./utils/getNextAppConfig");

/** @type {import('next').NextConfig} */
const nextConfig = getNextAppConfig(process.env.NODE_ENV);
module.exports = nextConfig;
