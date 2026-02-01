"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ModuleCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color?: string;
}

export default function ModuleCard({
    title,
    description,
    icon: Icon,
    href,
    color = "#1A73E8",
}: ModuleCardProps) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="
          bg-white rounded-2xl shadow-sm
          p-6
          border border-google-border
          hover:shadow-md hover:border-google-blue/30
          transition-all duration-300
          cursor-pointer
          group
        "
            >
                <div
                    className="
            w-12 h-12 rounded-xl
            flex items-center justify-center
            mb-4
            group-hover:scale-110
            transition-transform duration-300
          "
                    style={{ backgroundColor: `${color}15` }}
                >
                    <Icon size={24} style={{ color }} strokeWidth={2} />
                </div>

                <h3 className="text-lg font-bold text-google-text mb-2 group-hover:text-google-blue transition-colors">
                    {title}
                </h3>

                <p className="text-sm text-google-textSecondary leading-relaxed">
                    {description}
                </p>

                <motion.div
                    className="mt-4 flex items-center gap-1 text-google-blue text-sm font-medium"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                >
                    Start Learning
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 12L10 8L6 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </Link>
    );
}
