"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CurveTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener("resize", resize);
        
        // Safety timeout to ensure content is visible even if resize fails/lags
        const timer = setTimeout(() => {
            setDimensions(d => d.width === 0 ? { width: window.innerWidth, height: window.innerHeight } : d);
        }, 500);

        return () => {
            window.removeEventListener("resize", resize);
            clearTimeout(timer);
        };
    }, []);

    const anim = (variants: any) => {
        return {
            variants,
            initial: "initial",
            exit: "exit",
            enter: "enter"
        };
    };

    const text = {
        initial: { opacity: 1 },
        enter: { 
            opacity: 0, 
            top: -100, 
            transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }, 
            transitionEnd: { top: "47.5%" } 
        },
        exit: { 
            opacity: 1, 
            top: "40%", 
            transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] } 
        }
    };

    const curve = (initialPath: string, targetPath: string) => {
        return {
            initial: { d: initialPath },
            enter: { d: targetPath, transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] } },
            exit: { d: initialPath, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }
        };
    };

    const translate = {
        initial: { top: "-300px" },
        enter: { 
            top: "-100vh", 
            transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] }, 
            transitionEnd: { top: "100vh" } 
        },
        exit: { 
            top: "-300px", 
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } 
        }
    };

    return (
        <div className='page curve relative'>
            <div style={{ opacity: dimensions.width === 0 ? 1 : 0 }} className='background absolute inset-0 bg-black z-50 pointer-events-none transition-opacity' />
       
            {dimensions.width > 0 && <SVG height={dimensions.height} width={dimensions.width} anim={anim} curve={curve} translate={translate} />}
            {children}
        </div>
    );
}

const SVG = ({ height, width, anim, curve, translate }: any) => {
    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

    return (
        <motion.svg {...anim(translate)} className="fixed h-[calc(100vh+600px)] w-full pointer-events-none left-0 z-50 fill-[#1a1a1a]">
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    );
};
