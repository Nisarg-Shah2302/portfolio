import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import ToastProvider from "./ToastProvider";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Fixed import

const Contact = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("🚀 ~ handleSubmit ~ values:", values);
        
        // Validation
        if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
            toast.warning("Please fill in all fields!");
            return;
        }

        setLoading(true);
        
        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Reset form on success
            setValues({ name: "", email: "", message: "" });
            setSuccess(true);
            toast.success("Message sent successfully! 🎉");
            
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }

        // Uncomment and use this when you have your API endpoint ready:
        /*
        try {
            const response = await fetch("/api/mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    message: values.message,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setValues({ name: "", email: "", message: "" });
                setSuccess(true);
                toast.success(data.message || "Message sent successfully! 🎉");
            } else {
                toast.error(data.message || "Failed to send message");
            }
        } catch (error: any) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
        */
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setValues((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <SectionWrapper id="contact" className="mb-16 mx-4 lg:mx-0">
                <h2 className="text-center text-4xl">Contact Me</h2>

                <div className="w-full lg:w-5/6 2xl:w-3/4 mt-10 md:mt-16 mx-auto flex justify-between rounded-xl">
                    <Image 
                        unoptimized={true} 
                        quality={100} 
                        alt="contact" 
                        src="/contact.png" 
                        className="hidden md:block w-1/2 h-full object-cover rounded-l-xl" 
                        width={1000} 
                        height={1000} 
                    />
                    <div className="flex-1 p-6 md:p-8">
                        <h3 className="text-2xl mb-2">Get in touch</h3>
                        <p className="text-gray-400 mb-6 text-sm md:text-base">
                            My inbox is always open! 💌 Whether you&apos;ve got a burning question or want to drop a friendly &quot;hello&quot;, I&apos;m all ears!👂 Let&apos;s chat! 🎉
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input 
                                onChange={handleChange} 
                                required 
                                value={values.name} 
                                name="name" 
                                type="text" 
                                placeholder="Full Name *" 
                                className="outline-none bg-gray-100 dark:bg-gray-800 placeholder-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-violet-500 transition-all" 
                                disabled={loading}
                            />
                            <input 
                                onChange={handleChange} 
                                required 
                                value={values.email} 
                                name="email" 
                                type="email" 
                                placeholder="Email *" 
                                className="outline-none bg-gray-100 dark:bg-gray-800 placeholder-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-violet-500 transition-all" 
                                disabled={loading}
                            />
                            <textarea 
                                onChange={handleChange} 
                                required 
                                value={values.message} 
                                name="message" 
                                rows={4} 
                                placeholder="Message *" 
                                className="outline-none resize-none bg-gray-100 dark:bg-gray-800 placeholder-gray-400 rounded-lg py-3 px-4 focus:ring-2 focus:ring-violet-500 transition-all" 
                                disabled={loading}
                            />
                            <button 
                                type="submit"
                                disabled={loading} 
                                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 transition-colors text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-50 self-end flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span>Sending...</span>
                                        <BiLoaderAlt className="animate-spin" />
                                    </>
                                ) : (
                                    "Let's Connect 👋"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </SectionWrapper>
            
            {/* Toast Container - placed outside SectionWrapper to avoid positioning issues */}
            <ToastProvider/>
        </>
    );
};

export default Contact;