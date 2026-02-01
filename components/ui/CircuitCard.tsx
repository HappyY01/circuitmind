"use client";

import React from "react";
import { motion } from "framer-motion";

interface CircuitCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function CircuitCard({
    title,
    children,
    className = "",
}: CircuitCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`
        bg-white rounded-2xl shadow-sm
        p-6
        border border-google-border
        hover:shadow-md
        transition-shadow duration-300
        ${className}
      `}
        >
            <h2 className="text-xl font-bold text-google-text mb-4">
                {title}
            </h2>
            {children}
        </motion.div>
    );
}
