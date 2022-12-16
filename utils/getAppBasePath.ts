const getAppBasePath = (environment: string) => {
    switch (environment) {
        case "production":
            return "/portfolio";
        default:
            return "";
    }
}

export default getAppBasePath;