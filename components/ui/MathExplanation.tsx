"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlockMath, InlineMath } from "react-katex";

interface MathExplanationProps {
    steps: string[];
    title?: string;
}

export default function MathExplanation({
    steps,
    title = "Solution Steps",
}: MathExplanationProps) {
    const renderStep = (step: string) => {
        // If it's a heading (starts with ##)
        if (step.startsWith("##")) {
            return (
                <h4 className="text-lg font-bold text-google-blue mt-2">
                    {step.replace(/^##\s*/, "")}
                </h4>
            );
        }

        // If it's a subheading (starts with ###)
        if (step.startsWith("###")) {
            return (
                <h5 className="text-base font-semibold text-google-text mt-2">
                    {step.replace(/^###\s*/, "")}
                </h5>
            );
        }

        // If it's bold text (starts with **)
        if (step.startsWith("**")) {
            return (
                <p className="text-google-text text-sm font-semibold">
                    {step.replace(/\*\*/g, "")}
                </p>
            );
        }

        // Empty line
        if (step.trim() === "") {
            return <div className="h-2" />;
        }

        // Check if step contains block math ($$...$$)
        if (step.includes("$$")) {
            const parts: JSX.Element[] = [];
            let currentText = step;
            let key = 0;

            while (currentText.includes("$$")) {
                const startIdx = currentText.indexOf("$$");
                const endIdx = currentText.indexOf("$$", startIdx + 2);

                if (endIdx === -1) break;

                // Add text before math
                if (startIdx > 0) {
                    parts.push(
                        <span key={key++} className="text-google-text text-sm">
                            {currentText.substring(0, startIdx)}
                        </span>
                    );
                }

                // Add math
                const mathContent = currentText.substring(startIdx + 2, endIdx);
                parts.push(
                    <div key={key++} className="my-2">
                        <BlockMath math={mathContent} />
                    </div>
                );

                currentText = currentText.substring(endIdx + 2);
            }

            // Add remaining text
            if (currentText.length > 0) {
                parts.push(
                    <span key={key++} className="text-google-text text-sm">
                        {currentText}
                    </span>
                );
            }

            return <div className="overflow-x-auto">{parts}</div>;
        }

        // Check if step contains inline math ($...$)
        if (step.includes("$") && !step.includes("$$")) {
            const parts: JSX.Element[] = [];
            let currentText = step;
            let key = 0;
            let inMath = false;

            const segments = currentText.split("$");
            segments.forEach((segment, idx) => {
                if (idx === 0 && segment) {
                    // First segment, always text
                    parts.push(
                        <span key={key++} className="text-google-text text-sm">
                            {segment}
                        </span>
                    );
                } else if (segment) {
                    if (inMath) {
                        // This is math content
                        parts.push(<InlineMath key={key++} math={segment} />);
                    } else {
                        // This is text
                        parts.push(
                            <span key={key++} className="text-google-text text-sm">
                                {segment}
                            </span>
                        );
                    }
                    inMath = !inMath;
                } else {
                    inMath = !inMath;
                }
            });

            return <p className="text-google-text text-sm leading-relaxed">{parts}</p>;
        }

        // Regular text
        return (
            <p className="text-google-text text-sm leading-relaxed">
                {step}
            </p>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-google-hover rounded-2xl p-6 border border-google-blue/20"
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-google-blue rounded-full" />
                <h3 className="text-lg font-bold text-google-text">{title}</h3>
            </div>

            <div className="space-y-3">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white rounded-lg p-3 shadow-sm"
                    >
                        {renderStep(step)}
                    </motion.div>
                ))}
            </div>

            {steps.length === 0 && (
                <p className="text-google-textSecondary text-sm italic">
                    Enter circuit values to see the solution steps...
                </p>
            )}
        </motion.div>
    );
}
