import { MdSchool, MdWork } from 'react-icons/md'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ExperienceProps {
  index: number,
  company: string,
  position: string,
  desc: string[],
  institute: string,
  degree: string,
  duration: string,
}

const Experience = ({ index, company, position, desc, institute, degree, duration }: ExperienceProps) => {

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const cardVariants = {
    hidden: { x: index % 2 === 0 ? 20 : -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } }
  };

  return (
    <div className={`mb-6 md:mb-8 flex md:justify-between items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse left-timeline' : 'right-timeline'}`}>
      <div className="order-1 md:w-5/12"></div>

      <span className="z-20 flex items-center order-1 justify-center w-6 h-6 md:w-9 md:h-9 bg-gradient-to-br from-violet-400 to-purple-600 dark:from-violet-600 dark:to-purple-800 rounded-full ring-4 md:ring-8 ring-white dark:ring-grey-900">
        {company && <MdWork className="text-base md:text-xl text-violet-600 dark:text-violet-400" />}
        {institute && <MdSchool className="text-base md:text-xl text-violet-600 dark:text-violet-400" />}
      </span>

      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="order-1 rounded-xl w-full ml-3 md:ml-0 bg-white/90 dark:bg-grey-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-violet-500/15 hover:border-violet-500/40 hover:shadow-[0_4px_24px_rgba(124,58,237,0.15)] transition-all duration-300 md:w-5/12 p-3 md:px-4 md:py-4">
        <h3 className="mb-2 font-medium text-lg md:text-xl">{company || institute}</h3>
        <p className="text-sm text-violet-600 dark:text-violet-400 font-semibold">{position || degree} | {duration}</p>
        <ul className="text-sm text-gray-400 mt-2 ml-4 list-disc">
          {desc && desc.map((d, i) => (
            <li key={i} className='mb-0.5'>{d}</li>
          ))}
        </ul>
      </motion.div>
    </div >
  )
}

export default Experience