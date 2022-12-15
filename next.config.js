const NEXT_APP_CONFIGS = require("./configs/NextAppConfig.json");

function getNextAppConfig(env) {
	switch (env) {
		case "development":
			return NEXT_APP_CONFIGS.envs.development;
		case "test":
			return NEXT_APP_CONFIGS.envs.test;
		case "production":
			return NEXT_APP_CONFIGS.envs.production;
		default:
			return NEXT_APP_CONFIGS.envs.development;
	}
}

/** @type {import('next').NextConfig} */
const nextConfig = getNextAppConfig(process.env.NODE_ENV);
console.log(nextConfig);
module.exports = nextConfig;
