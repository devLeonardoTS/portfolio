import getAppBasePath from "../utils/getAppBasePath";

const EnvVars = {
    environment: process.env.NODE_ENV,
    basePath: getAppBasePath(process.env.NODE_ENV),
}

export default EnvVars;