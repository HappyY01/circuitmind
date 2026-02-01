"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, GitBranch } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import CircuitCard from "@/components/ui/CircuitCard";
import MathExplanation from "@/components/ui/MathExplanation";
import { solveKCL } from "@/lib/circuitSolvers";
import toast from "react-hot-toast";

export default function KCLPage() {
    const [i1, setI1] = useState("5");
    const [i2, setI2] = useState("3");
    const [i3, setI3] = useState("2");
    const [steps, setSteps] = useState<string[]>([]);

    React.useEffect(() => {
        try {
            const incoming = [parseFloat(i1) || 0, parseFloat(i2) || 0];
            const outgoing = [parseFloat(i3) || 0];

            const result = solveKCL(incoming, outgoing);
            setSteps(result.steps);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Calculation error");
            setSteps([]);
        }
    }, [i1, i2, i3]);

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
                        <div className="w-12 h-12 rounded-xl bg-google-blue/10 flex items-center justify-center">
                            <GitBranch size={24} className="text-google-blue" />
                        </div>
                        <h1 className="text-4xl font-bold text-google-text">
                            KCL Simulator
                        </h1>
                    </div>
                    <p className="text-google-textSecondary">
                        Kirchhoff's Current Law: The sum of currents entering a node equals
                        the sum of currents leaving the node.
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
                                        Incoming Currents
                                    </h3>
                                    <div className="space-y-3">
                                        <InputField
                                            label="Current I₁"
                                            value={i1}
                                            onChange={setI1}
                                            unit="A"
                                            placeholder="Enter current"
                                        />
                                        <InputField
                                            label="Current I₂"
                                            value={i2}
                                            onChange={setI2}
                                            unit="A"
                                            placeholder="Enter current"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-google-border pt-4">
                                    <h3 className="text-sm font-semibold text-google-text mb-3">
                                        Outgoing Currents
                                    </h3>
                                    <InputField
                                        label="Current I₃"
                                        value={i3}
                                        onChange={setI3}
                                        unit="A"
                                        placeholder="Enter current"
                                    />
                                </div>
                            </div>
                        </CircuitCard>

                        {/* Visual Diagram */}
                        <CircuitCard title="Node Diagram">
                            <div className="bg-google-background rounded-xl p-8 flex items-center justify-center">
                                <svg
                                    width="300"
                                    height="200"
                                    viewBox="0 0 300 200"
                                    className="max-w-full"
                                >
                                    {/* Node */}
                                    <circle cx="150" cy="100" r="8" fill="#1A73E8" />

                                    {/* I1 - incoming from left */}
                                    <line
                                        x1="50"
                                        y1="100"
                                        x2="140"
                                        y2="100"
                                        stroke="#34A853"
                                        strokeWidth="3"
                                        markerEnd="url(#arrowgreen)"
                                    />
                                    <text x="90" y="90" fill="#34A853" fontSize="14" fontWeight="bold">
                                        I₁
                                    </text>

                                    {/* I2 - incoming from top */}
                                    <line
                                        x1="150"
                                        y1="30"
                                        x2="150"
                                        y2="90"
                                        stroke="#34A853"
                                        strokeWidth="3"
                                        markerEnd="url(#arrowgreen)"
                                    />
                                    <text x="160" y="60" fill="#34A853" fontSize="14" fontWeight="bold">
                                        I₂
                                    </text>

                                    {/* I3 - outgoing to right */}
                                    <line
                                        x1="160"
                                        y1="100"
                                        x2="250"
                                        y2="100"
                                        stroke="#EA4335"
                                        strokeWidth="3"
                                        markerEnd="url(#arrowred)"
                                    />
                                    <text x="200" y="90" fill="#EA4335" fontSize="14" fontWeight="bold">
                                        I₃
                                    </text>

                                    {/* Arrow markers */}
                                    <defs>
                                        <marker
                                            id="arrowgreen"
                                            markerWidth="10"
                                            markerHeight="10"
                                            refX="9"
                                            refY="3"
                                            orient="auto"
                                            markerUnits="strokeWidth"
                                        >
                                            <path d="M0,0 L0,6 L9,3 z" fill="#34A853" />
                                        </marker>
                                        <marker
                                            id="arrowred"
                                            markerWidth="10"
                                            markerHeight="10"
                                            refX="9"
                                            refY="3"
                                            orient="auto"
                                            markerUnits="strokeWidth"
                                        >
                                            <path d="M0,0 L0,6 L9,3 z" fill="#EA4335" />
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                            <div className="mt-4 text-sm text-google-textSecondary">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-4 h-0.5 bg-green-500" />
                                    <span>Incoming currents (I₁, I₂)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-0.5 bg-red-500" />
                                    <span>Outgoing currents (I₃)</span>
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
