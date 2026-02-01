"use client";

import React from "react";
import { motion } from "framer-motion";

interface InputFieldProps {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: "text" | "number";
    unit?: string;
    error?: string;
    placeholder?: string;
}

export default function InputField({
    label,
    value,
    onChange,
    type = "number",
    unit,
    error,
    placeholder,
}: InputFieldProps) {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = value !== "" && value !== null && value !== undefined;

    return (
        <div className="relative w-full">
            <motion.div
                className="relative"
                initial={false}
                animate={{
                    scale: isFocused ? 1.01 : 1,
                }}
                transition={{ duration: 0.2 }}
            >
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className={`
            w-full px-4 py-3 pr-12
            bg-white
            border-2 rounded-xl
            text-google-text text-base
            transition-all duration-200
            ${error
                            ? "border-red-500"
                            : isFocused
                                ? "border-google-blue"
                                : "border-google-border"
                        }
            ${error ? "focus:border-red-500" : "focus:border-google-blue"}
            focus:outline-none
            placeholder:text-google-textSecondary
          `}
                    step={type === "number" ? "any" : undefined}
                />

                {/* Floating label */}
                <motion.label
                    className={`
            absolute left-4 pointer-events-none
            transition-all duration-200
            ${isFocused || hasValue
                            ? "-top-2.5 text-xs bg-white px-1"
                            : "top-3 text-base"
                        }
            ${error
                            ? "text-red-500"
                            : isFocused
                                ? "text-google-blue"
                                : "text-google-textSecondary"
                        }
            font-medium
          `}
                    initial={false}
                    animate={{
                        y: isFocused || hasValue ? 0 : 0,
                    }}
                >
                    {label}
                </motion.label>

                {/* Unit label */}
                {unit && (
                    <span className="absolute right-4 top-3 text-google-textSecondary text-sm font-medium">
                        {unit}
                    </span>
                )}
            </motion.div>

            {/* Error message */}
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
