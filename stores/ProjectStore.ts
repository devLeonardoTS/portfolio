import { nanoid } from "nanoid";
import create from "zustand";
import AssetPaths from "../data/AssetPaths";
import { Optional } from "../types/Nullables";

export type ColaboratorData = Optional<{
    fullName: string;
    page: string;
}>

export type ProjectDetails = Optional<{
    challenge: string;
    solution: string;
    features: string;
    colaborators: ColaboratorData[];
    page: string;
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
}

function createProject(data: ProjectData): ProjectData {
    return { ...data, id: nanoid() }
}

const ProjectStore = create<ProjectStoreState & ProjectStoreActions>((set, get) => {

    const projects: ProjectData[] = [
        createProject({
            title: "Project 01",
            heroImg: AssetPaths.slidePlaceholderImg
        }),
        createProject({
            title: "Project 02",
            heroImg: AssetPaths.slidePlaceholderImg
        }),
        createProject({
            title: "Project 03",
            heroImg: AssetPaths.slidePlaceholderImg
        }),
    ];

    function setActiveProject(index: number) {
        set({ activeProject: index });
    }

    function setActiveProjectSlide(elRef: HTMLLIElement) {
        set({ activeProjectSlide: elRef });
    }

    function setSlideMovedBy(type: SlideMoveType) {
        set({ slideMovedBy: type });
    }

    return {
        projects,
        activeProject: 0,
        slideMovedBy: "none",
        setActiveProject,
        setActiveProjectSlide,
        setSlideMovedBy,
    }

});

export default ProjectStore;
