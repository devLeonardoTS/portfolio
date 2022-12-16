const NEXT_APP_CONFIGS = require("../configs/NextAppConfig.json");

function getNextAppConfig(environment) {
	switch (environment) {
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

// Used in "next.config.js" -- Needs to be ".js": https://github.com/vercel/next.js/issues/5318#issuecomment-425398180
module.exports = getNextAppConfig;
