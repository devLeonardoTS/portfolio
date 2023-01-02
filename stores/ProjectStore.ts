import { nanoid } from "nanoid";
import create from "zustand";
import AssetPaths from "../data/AssetPaths";
import { Optional } from "../types/Nullables";

export type ProjectDetails = Optional<{
    challenge: string;
    solution: string;
    features: string;
    colaborators: string;
}>

export type ProjectData = Optional<{
    id: string;
    heroImg: string;
    showcaseImgs: string[];
    title: string;
    category: string;
    devRole: string;
    objective: string;
    details: ProjectDetails;
    page: string;
}>

export type SlideMoveType = "none" | "click" | "scroll";

export type ProjectStoreState = Optional<{
    projects: ProjectData[];
    activeProject: number;
    activeProjectSlide: HTMLLIElement;
    slideMovedBy: SlideMoveType;
}>

export type ProjectStoreActions = {
    setActiveProject: (index: number) => Promise<void> | void;
    setActiveProjectSlide: (elRef: HTMLLIElement) => Promise<void> | void;
    setSlideMovedBy: (type: SlideMoveType) => Promise<void> | void;
    getCurrentProject: () => ProjectData;
}

function createProject(data: ProjectData): ProjectData {
    return { ...data, id: nanoid() }
}

const projects: ProjectData[] = [
    createProject({
        title: "Project 01",
        heroImg: AssetPaths.slidePlaceholderImg,
        category: "Web",
        devRole: "Designer & Developer",
        objective: "Deliver a pleasant experience for either, desktop and mobile users."
    }),
    createProject({
        title: "Croware Tech's Blog",
        heroImg: `${AssetPaths.imgBase}/croware-home.png`,
        category: "Web API",
        devRole: "Designer & Developer",
        objective: "Grant a reliable source of data and processes to our clients.",
        details: {
            challenge: "<p>Lorem ipsum dolor sit amet consectetur. Viverra ridiculus arcu arcu sed ultrices suscipit natoque adipiscing. Eget quisque molestie cursus imperdiet etiam sit lacus molestie ullamcorper. Facilisis ultricies sapien maecenas elementum venenatis dignissim. Felis platea integer nunc in diam. Lorem ipsum dolor sit amet consectetur. Viverra ridiculus arcu arcu sed ultrices suscipit natoque adipiscing. Eget quisque molestie cursus imperdiet etiam sit lacus molestie ullamcorper. Facilisis ultricies sapien maecenas elementum venenatis dignissim. Felis platea integer nunc in diam.</p>",
            solution: "<p>Lorem ipsum dolor sit amet consectetur. Viverra ridiculus arcu arcu sed ultrices suscipit natoque adipiscing. Eget quisque molestie cursus imperdiet etiam sit lacus molestie ullamcorper. Facilisis ultricies sapien maecenas elementum venenatis dignissim. Felis platea integer nunc in diam.</p>",
            features: "<p>Lorem ipsum dolor sit amet consectetur. Viverra ridiculus arcu arcu sed ultrices suscipit natoque adipiscing. Eget quisque molestie cursus imperdiet etiam sit lacus molestie ullamcorper. Facilisis ultricies sapien maecenas elementum venenatis dignissim. Felis platea integer nunc in diam.</p>",
            colaborators: "<p>Lorem ipsum dolor sit amet consectetur. Viverra ridiculus arcu arcu sed ultrices suscipit natoque adipiscing. Eget quisque molestie cursus imperdiet etiam sit lacus molestie ullamcorper. Facilisis ultricies sapien maecenas elementum venenatis dignissim. Felis platea integer nunc in diam.</p>",
        },
        showcaseImgs: [`${AssetPaths.imgBase}/croware-profile.png`, `${AssetPaths.imgBase}/croware-writer.png`, `${AssetPaths.imgBase}/croware-post-01.png`, `${AssetPaths.imgBase}/croware-post-02.png`],
        page: "https://croware-blog.vercel.app/"

    }),
    createProject({
        title: "Project 03",
        heroImg: AssetPaths.slidePlaceholderImg,
        category: "Full-stack",
        devRole: "Designer & Developer",
        objective: "Ensure our clients are presenting the best of their businesses through digital means."
    }),
];

const ProjectStore = create<ProjectStoreState & ProjectStoreActions>((set, get) => {

    function setActiveProject(index: number) {
        set({ activeProject: index });
    }

    function setActiveProjectSlide(elRef: HTMLLIElement) {
        set({ activeProjectSlide: elRef });
    }

    function setSlideMovedBy(type: SlideMoveType) {
        set({ slideMovedBy: type });
    }

    function getCurrentProject() {

        const index = get().activeProject;
        const projects = get().projects;

        if (index === undefined || projects === undefined) {
            return {} as Optional<ProjectData>;
        }

        return projects[index];
    }

    return {
        projects,
        activeProject: 1,
        slideMovedBy: "none",
        setActiveProject,
        setActiveProjectSlide,
        setSlideMovedBy,
        getCurrentProject
    }

});

export default ProjectStore;
