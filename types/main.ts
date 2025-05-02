type skill = {
    name: string,
    image: string,
    // category: string   
}

type technology = {
    name: string;
    image: string;
}

type SkillCategory = {
    category: string;
    technologies: technology[];
}

type ProjectDetail = {
    name: string,
    image: string,
    techstack: string,
    links: {
        visit: string,
        code: string,
        video: string
    },
    description: string
}

type ProjectCategory = {
    category: string,
    projectDetails: ProjectDetail[]
}

type experience = {
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    desc: string[]
}

type education = {
    institute: string,
    degree: string,
    startDate: string,
    endDate: string,
}

type main = {
    name: string,
    titles: string[],
    heroImage: string,
    shortDesc: string,
    techStackImages: string[],
}

type about = {
    aboutImage: string,
    aboutImageCaption: string,
    title: string,
    about: string,
    resumeUrl: string,
    callUrl: string
}

type social = {
    name: string,
    icon: string,
    link: string
}

type data = {
    main: main,
    about: about,
    skills: SkillCategory[],
    projects: ProjectCategory[],
    experiences: experience[],
    educations: education[]
    socials: social[]
}

export type { data, main, about, skill, experience, education, social, SkillCategory, technology, ProjectCategory, ProjectDetail };