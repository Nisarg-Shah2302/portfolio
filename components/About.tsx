import Image from "next/image"
import { about } from "@/types/main";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import { BiLinkExternal } from "react-icons/bi";

interface Props {
    aboutData: about,
    name: string
}

const About = ({ aboutData, name }: Props) => {

    const { aboutImage, aboutImageCaption, title, about, resumeUrl, callUrl } = aboutData

    return (
        <SectionWrapper id="about" className="min-h-[80vh] pt-12 bg-gradient-to-b from-white to-gray-100/20 dark:from-grey-900 dark:to-grey-900">
            <h2 className="text-4xl text-center">About Me</h2>

            <div className="w-full lg:w-11/12 2xl:w-4/5 mt-2 lg:mt-20 mx-auto flex flex-col md:gap-4 lg:flex-row justify-between items-center">
                <div className="p-3 w-56 self-start md:w-2/5 lg:w-72 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-violet-500/20 flex flex-col gap-2 items-center rounded-2xl mx-auto lg:mx-16 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all duration-300 lg:-rotate-3">
                    <Image alt="profile" width={1000} height={1000} loading={'lazy'} className="w-full h-60 md:h-80 rounded-2xl object-cover grayscale hover:grayscale-0 transition-all bg-violet-100" src={aboutImage} />
                    <span className="font-medium font-sans">{aboutImageCaption || '< I Build Stuff 🚀 />'}</span>
                </div>

                <div className="flex-1 text-left mx-4 mt-4 md:mt-0 md:mx-0 md:p-6">
                    <div className="flex flex-col gap-2.5">
                        <p className="text-3xl font-semibold">{name}</p>
                        <p className='text-violet-700 dark:text-violet-300 text-sm font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 border border-violet-200 dark:border-violet-700/50 w-fit'>{title}</p>
                        <p className="text-sm md:text-base my-2 text-gray-600 dark:text-gray-300">{about}</p>
                        <div className="flex items-center gap-4 md:mt-4">
                            {resumeUrl.trim() && <Link href={resumeUrl} target="_blank" className="text-sm md:text-base bg-violet-600 dark:bg-violet-700 text-white w-fit rounded-md py-2 px-6 hover:shadow-xl hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-shadow">Resume</Link>}
                            {callUrl.trim() && <Link href={callUrl} target="_blank" className="text-violet-600 flex items-center gap-1 hover:bg-violet-50 hover:dark:bg-violet-900/10 py-2 px-4 transition-colors rounded-md">Book a 1:1 call <BiLinkExternal /> </Link>}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default About