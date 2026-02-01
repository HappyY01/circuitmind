"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import CircuitCard from "@/components/ui/CircuitCard";
import MathExplanation from "@/components/ui/MathExplanation";
import { solveKVL } from "@/lib/circuitSolvers";
import toast from "react-hot-toast";

export default function KVLPage() {
    const [v1, setV1] = useState("12");
    const [v2, setV2] = useState("8");
    const [r1, setR1] = useState("4");
    const [r2, setR2] = useState("6");
    const [steps, setSteps] = useState<string[]>([]);

    React.useEffect(() => {
        try {
            const voltages = [parseFloat(v1) || 0, parseFloat(v2) || 0];
            const resistances = [parseFloat(r1) || 0, parseFloat(r2) || 0];

            const result = solveKVL(voltages, resistances);
            setSteps(result.steps);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Calculation error");
            setSteps([]);
        }
    }, [v1, v2, r1, r2]);

    return (
        <main className="min-h-screen bg-google-background">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/">
                        <motion.button
                            whileHover={{ x: -5 }}
                            className="flex items-center gap-2 text-google-blue hover:text-google-blue/80 transition-colors mb-4"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-medium">Back to Home</span>
                        </motion.button>
                    </Link>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <Zap size={24} className="text-green-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-google-text">
                            KVL Simulator
                        </h1>
                    </div>
                    <p className="text-google-textSecondary">
                        Kirchhoff's Voltage Law: The sum of all voltages around a closed
                        loop equals zero.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <CircuitCard title="Circuit Configuration">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-google-text mb-3">
                                        Voltage Sources
                                    </h3>
                                    <div className="space-y-3">
                                        <InputField
                                            label="Voltage V₁"
                                            value={v1}
                                            onChange={setV1}
                                            unit="V"
                                            placeholder="Enter voltage"
                                        />
                                        <InputField
                                            label="Voltage V₂"
                                            value={v2}
                                            onChange={setV2}
                                            unit="V"
                                            placeholder="Enter voltage"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-google-border pt-4">
                                    <h3 className="text-sm font-semibold text-google-text mb-3">
                                        Resistances
                                    </h3>
                                    <div className="space-y-3">
                                        <InputField
                                            label="Resistance R₁"
                                            value={r1}
                                            onChange={setR1}
                                            unit="Ω"
                                            placeholder="Enter resistance"
                                        />
                                        <InputField
                                            label="Resistance R₂"
                                            value={r2}
                                            onChange={setR2}
                                            unit="Ω"
                                            placeholder="Enter resistance"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CircuitCard>

                        {/* Visual Diagram */}
                        <CircuitCard title="Loop Diagram">
                            <div className="bg-google-background rounded-xl p-8 flex items-center justify-center">
                                <svg
                                    width="320"
                                    height="240"
                                    viewBox="0 0 320 240"
                                    className="max-w-full"
                                >
                                    {/* Circuit loop */}
                                    <rect
                                        x="60"
                                        y="60"
                                        width="200"
                                        height="120"
                                        fill="none"
                                        stroke="#5F6368"
                                        strokeWidth="3"
                                        strokeDasharray="5,5"
                                        rx="8"
                                    />

                                    {/* V1 - left side */}
                                    <circle cx="60" cy="120" r="20" fill="#34A853" />
                                    <text
                                        x="60"
                                        y="125"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        V₁
                                    </text>

                                    {/* R1 - top */}
                                    <rect x="120" y="50" width="80" height="20" fill="#1A73E8" rx="4" />
                                    <text
                                        x="160"
                                        y="64"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        R₁
                                    </text>

                                    {/* V2 - right side */}
                                    <circle cx="260" cy="120" r="20" fill="#34A853" />
                                    <text
                                        x="260"
                                        y="125"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        V₂
                                    </text>

                                    {/* R2 - bottom */}
                                    <rect x="120" y="170" width="80" height="20" fill="#1A73E8" rx="4" />
                                    <text
                                        x="160"
                                        y="184"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        R₂
                                    </text>

                                    {/* Current direction arrow */}
                                    <path
                                        d="M 160 120 m -30 0 a 30 30 0 1 1 60 0"
                                        fill="none"
                                        stroke="#EA4335"
                                        strokeWidth="2"
                                        markerEnd="url(#arrowloop)"
                                    />
                                    <text
                                        x="160"
                                        y="115"
                                        fill="#EA4335"
                                        fontSize="14"
                                        fontWeight="bold"
                                        textAnchor="middle"
                                    >
                                        I
                                    </text>

                                    <defs>
                                        <marker
                                            id="arrowloop"
                                            markerWidth="10"
                                            markerHeight="10"
                                            refX="9"
                                            refY="3"
                                            orient="auto"
                                        >
                                            <path d="M0,0 L0,6 L9,3 z" fill="#EA4335" />
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                            <div className="mt-4 text-sm text-google-textSecondary">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-4 rounded-full bg-green-500" />
                                    <span>Voltage sources</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-blue-500" />
                                    <span>Resistors</span>
                                </div>
                            </div>
                        </CircuitCard>
                    </div>

                    {/* AI Tutor Section */}
                    <div>
                        <MathExplanation steps={steps} title="AI Tutor - Step by Step" />
                    </div>
                </div>
            </div>
        </main>
    );
}
