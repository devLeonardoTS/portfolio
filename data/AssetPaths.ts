import EnvVars from "./EnvVars";


const AssetPaths = {
    base: EnvVars.basePath,
    imgBase: `${EnvVars.basePath}/images`,
    scriptBase: `${EnvVars.basePath}/scripts`,
    googleAnalyticsTagMgr: `${EnvVars.basePath}/scripts/google-analytics-tag-mgr.js`,
    favIcon: `${EnvVars.basePath}/favicon.ico`,
    slidePlaceholderImg: `${EnvVars.basePath}/images/ph-slide.webp`,
    accentProjectsDesign: `${EnvVars.basePath}/images/bg-projects-design.png`,
}

export default AssetPaths;