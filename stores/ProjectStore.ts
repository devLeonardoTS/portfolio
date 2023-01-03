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
        title: "Project: Pets",
        heroImg: AssetPaths.slidePlaceholderImg,
        category: "Full-stack",
        devRole: "Designer & Developer",
        objective: "A safe and reliable plataform to facilitate animal adoption and help environmental non-governmental organizations."
    }),
    createProject({
        title: "Croware Tech's Blog",
        heroImg: `${AssetPaths.imgBase}/croware-home.png`,
        category: "Web",
        devRole: "Designer & Developer",
        objective: "A blogging platform made by students to students with a focus on technology, culture and education.",
        details: {
            challenge: "<p>Build a blogging platform from scratch in 3 months, using modern web technologies without spending a single coin, all of this while learning how to work as a team with recently known people.</p>",
            solution: `<ul>
                <li>Used Kanban on Trello to visualize and delegate tasks</li>
                <li>We used Next.JS as a framework</li>
                <li>Hosted Strapi CMS on Render as back-end</li>
                <li>Hosted PostgreSQL DB on Supabase</li>
                <li>Learned a lot about keeping the user experience in mind while building a project</li>
            </ul>`,
            features: `<ul>
                <li>Uncluttered publication pages</li>
                <li>Custom profile for writers</li>
                <li>Advanced text editor for writers</li>
                <li>Easy to use administration panel</li>
            </ul>`,
            colaborators: `<ul>
                <li><p><a href="#">Claudio D. S. N.</a> - Design</p></li>
                <li><p><a href="https://www.linkedin.com/in/giovana-gama-41b8b3214/">Giovana S. G.</a> - Writer</p></li>
                <li><p><a href="https://www.linkedin.com/in/devleonardots/">Leonardo T. S.</a> - Management</p></li>
                <li><p><a href="#">Lucas G. A. R.</a> - Writer</p></li>
                <li><p><a href="https://www.linkedin.com/in/vitor-alexandre-1487b121a/">Vitor A. A. P.</a> - Developer</p></li>
            </ul>`,
        },
        showcaseImgs: [`${AssetPaths.imgBase}/croware-profile.png`, `${AssetPaths.imgBase}/croware-writer.png`, `${AssetPaths.imgBase}/croware-post-01.png`, `${AssetPaths.imgBase}/croware-post-02.png`],
        page: "https://croware-blog.vercel.app/"

    }),
    createProject({
        title: "Project: Skoonected",
        heroImg: AssetPaths.slidePlaceholderImg,
        category: "Full-stack",
        devRole: "Designer & Developer",
        objective: "A platform tailored to suit the needs of small to medium schools, delivering better tools to students and masters."
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
