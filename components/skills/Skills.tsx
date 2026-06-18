import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCard from "./SkillCard"
import SectionWrapper from '../SectionWrapper';
import { SkillCategory, technology } from '@/types/main';

const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'backOut' } }
};


const Skills = ({ skillData }: { skillData: SkillCategory[] }) => {
    const mergedCategories = useMemo(() => {
        const map = new Map<string, technology[]>();        
        skillData.forEach(({ category, technologies }) => {
            // Normalize technologies to always be an array
            const techArray = Array.isArray(technologies) ? technologies : [technologies];
            if (!map.has(category)) {
                map.set(category, [...techArray]);
            } else {
                const existing = map.get(category)!;
                const merged = [...existing];
                technologies.forEach(tech => {
                    if (!existing.some(e => e.name === tech.name)) {
                        merged.push(tech);
                    }
                });
                map.set(category, merged);
            }
        });
        const updatedArray = Array.from(map.entries()).map(([category, technologies]) => ({ category, technologies }));
        return updatedArray;
    }, [skillData]);

    const [selectedCategory, setSelectedCategory] = useState(mergedCategories[0]?.category || '');

    const selectedTechnologies = useMemo(() => {
        return mergedCategories.find(c => c.category === selectedCategory)?.technologies || [];
    }, [mergedCategories, selectedCategory]);

    const handleCategoryClick = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    const [gridRef, gridInView] = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <SectionWrapper id='skills' className="min-h-screen mt-12 md:mt-0 mx-4 md:mx-0 xl:my-20 2xl:my-0">
            <h2 className="text-4xl text-center">Tech Stack</h2>

            <div className="md:w-1/2 overflow-x-auto scroll-hide lg:w-1/3 mx-auto mt-6 bg-white dark:bg-grey-800 p-2 flex justify-between items-center gap-3 rounded-md">
                {mergedCategories.map((c, i) => (
                    <span
                        key={c.category}
                        onClick={() => handleCategoryClick(c.category)}
                        className={`p-1.5 md:p-2 text-sm md:text-base w-full text-center cursor-pointer rounded-md ${selectedCategory === c.category ? "bg-violet-600 dark:bg-violet-600 text-white" : "bg-white dark:bg-grey-800 hover:bg-gray-100 hover:dark:bg-grey-900"} transition-all capitalize`}
                    >
                        {c.category}
                    </span>
                ))}
            </div>

            <motion.div
                ref={gridRef}
                key={selectedCategory}
                variants={gridVariants}
                initial="hidden"
                animate={gridInView ? 'visible' : 'hidden'}
                className="lg:w-3/4 2xl:w-3/5 my-8 mx-auto md:px-12 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 place-items-center gap-8"
            >
                {selectedTechnologies.map((tech) => (
                    <motion.div key={tech.name} variants={itemVariants}>
                        <SkillCard name={tech.name} image={tech.image} />
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
}

export default Skills