"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Greeting {
    text: string;
    language: string;
}

const greetings: Greeting[] = [
    { text: "Hello", language: "English" },
    { text: "こんにちは", language: "Japanese" },
    { text: "Bonjour", language: "French" },
    { text: "Hola", language: "Spanish" },
    { text: "안녕하세요", language: "Korean" },
    { text: "Ciao", language: "Italian" },
    { text: "Hallo", language: "German" },
    { text: "Привет", language: "Russian" },
];

const DynamicText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= greetings.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    return prevIndex;
                }

                return nextIndex;
            });
        }, 350);

        return () => clearInterval(interval);
    }, [isAnimating]);

    // Animation variants for the text
    const textVariants = {
        hidden: { 
            y: 30, 
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)"
        },
        visible: { 
            y: 0, 
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
        },
        exit: { 
            y: -30, 
            opacity: 0,
            scale: 1.1,
            filter: "blur(5px)"
        },
    };

    return (
        <section
            className="flex min-h-[200px] items-center justify-center gap-1 p-4"
            aria-label="Rapid greetings in different languages"
        >
            <div className="relative h-16 w-60 flex items-center justify-center overflow-hidden">
                {isAnimating ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            className="absolute flex items-center gap-2 text-3xl font-medium text-black dark:text-gray-200"
                            aria-live="off"
                            initial={textVariants.hidden}
                            animate={textVariants.visible}
                            exit={textVariants.exit}
                            transition={{ 
                                duration: 0.4, 
                                ease: [0.33, 1, 0.68, 1],
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                        >
                            {greetings[currentIndex].text}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <motion.div 
                        className="flex items-center gap-2 text-3xl font-medium text-black dark:text-gray-200"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            duration: 0.5,
                            ease: [0.33, 1, 0.68, 1]
                        }}
                    >
                        {greetings[currentIndex].text}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default DynamicText;