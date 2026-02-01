"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Repeat, ArrowRight } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import CircuitCard from "@/components/ui/CircuitCard";
import MathExplanation from "@/components/ui/MathExplanation";
import { theveninToNorton, nortonToThevenin } from "@/lib/circuitSolvers";
import toast from "react-hot-toast";

export default function SourceTransformationPage() {
    const [transformType, setTransformType] = useState<"voltage-to-current" | "current-to-voltage">("voltage-to-current");
    const [value, setValue] = useState("12");
    const [resistance, setResistance] = useState("4");
    const [steps, setSteps] = useState<string[]>([]);
    const [result, setResult] = useState<{ voltage?: number; current?: number; resistance: number } | null>(null);

    React.useEffect(() => {
        try {
            const val = parseFloat(value) || 0;
            const res = parseFloat(resistance) || 0;

            let solution;
            if (transformType === "voltage-to-current") {
                // Thévenin to Norton
                solution = theveninToNorton(val, res);
            } else {
                // Norton to Thévenin
                solution = nortonToThevenin(val, res);
            }

            setSteps(solution.steps);
            setResult({
                voltage: solution.equivalentVoltage,
                current: solution.equivalentCurrent,
                resistance: solution.equivalentResistance,
            });
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Calculation error");
            setSteps([]);
            setResult(null);
        }
    }, [transformType, value, resistance]);

    const toggleTransformType = () => {
        setTransformType(prev =>
            prev === "voltage-to-current" ? "current-to-voltage" : "voltage-to-current"
        );
    };

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
                        <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                            <Repeat size={24} className="text-red-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-google-text">
                            Source Transformation
                        </h1>
                    </div>
                    <p className="text-google-textSecondary">
                        Convert between voltage sources (with series resistance) and current
                        sources (with parallel resistance).
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Section */}
                    <div className="space-y-6">
                        {/* Transformation Type Selector */}
                        <CircuitCard title="Transformation Type">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setTransformType("voltage-to-current")}
                                    className={`
                    flex-1 py-3 px-4 rounded-xl font-medium transition-all
                    ${transformType === "voltage-to-current"
                                            ? "bg-google-blue text-white shadow-md"
                                            : "bg-google-background text-google-textSecondary hover:bg-google-hover"
                                        }
                  `}
                                >
                                    Voltage → Current
                                </button>
                                <button
                                    onClick={() => setTransformType("current-to-voltage")}
                                    className={`
                    flex-1 py-3 px-4 rounded-xl font-medium transition-all
                    ${transformType === "current-to-voltage"
                                            ? "bg-google-blue text-white shadow-md"
                                            : "bg-google-background text-google-textSecondary hover:bg-google-hover"
                                        }
                  `}
                                >
                                    Current → Voltage
                                </button>
                            </div>
                        </CircuitCard>

                        <CircuitCard title="Input Values">
                            <div className="space-y-4">
                                {transformType === "voltage-to-current" ? (
                                    <>
                                        <InputField
                                            label="Voltage Source (Vs)"
                                            value={value}
                                            onChange={setValue}
                                            unit="V"
                                            placeholder="Enter voltage"
                                        />
                                        <InputField
                                            label="Series Resistance (Rs)"
                                            value={resistance}
                                            onChange={setResistance}
                                            unit="Ω"
                                            placeholder="Enter resistance"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <InputField
                                            label="Current Source (Is)"
                                            value={value}
                                            onChange={setValue}
                                            unit="A"
                                            placeholder="Enter current"
                                        />
                                        <InputField
                                            label="Parallel Resistance (Rp)"
                                            value={resistance}
                                            onChange={setResistance}
                                            unit="Ω"
                                            placeholder="Enter resistance"
                                        />
                                    </>
                                )}
                            </div>
                        </CircuitCard>

                        {/* Results Card */}
                        {result && (
                            <CircuitCard title="Equivalent Circuit">
                                <div className="space-y-3">
                                    {result.current !== undefined && (
                                        <div className="bg-google-background rounded-xl p-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-google-textSecondary font-medium">
                                                    Equivalent Current (Is):
                                                </span>
                                                <span className="text-2xl font-bold text-google-blue">
                                                    {result.current.toFixed(3)} A
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    {result.voltage !== undefined && (
                                        <div className="bg-google-background rounded-xl p-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-google-textSecondary font-medium">
                                                    Equivalent Voltage (Vs):
                                                </span>
                                                <span className="text-2xl font-bold text-google-blue">
                                                    {result.voltage.toFixed(3)} V
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-google-background rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-google-textSecondary font-medium">
                                                Resistance:
                                            </span>
                                            <span className="text-2xl font-bold text-google-blue">
                                                {result.resistance.toFixed(3)} Ω
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CircuitCard>
                        )}

                        {/* Visual Diagram */}
                        <CircuitCard title="Transformation Diagram">
                            <div className="bg-google-background rounded-xl p-8">
                                <div className="flex items-center justify-center gap-8">
                                    {/* Original Source */}
                                    <div className="text-center">
                                        <div className="text-xs text-google-textSecondary mb-2 font-medium">
                                            {transformType === "voltage-to-current" ? "Original" : "Equivalent"}
                                        </div>
                                        <svg width="100" height="120" viewBox="0 0 100 120">
                                            {/* Voltage source */}
                                            <circle cx="50" cy="30" r="20" fill="#1A73E8" />
                                            <text x="50" y="35" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
                                                Vs
                                            </text>
                                            <line x1="50" y1="50" x2="50" y2="70" stroke="#202124" strokeWidth="2" />
                                            {/* Series resistor */}
                                            <rect x="35" y="70" width="30" height="20" fill="#FBBC04" rx="3" />
                                            <text x="50" y="83" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                                                Rs
                                            </text>
                                            <line x1="50" y1="90" x2="50" y2="110" stroke="#202124" strokeWidth="2" />
                                        </svg>
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex flex-col items-center">
                                        <motion.div
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <ArrowRight size={32} className="text-google-blue" />
                                        </motion.div>
                                        <button
                                            onClick={toggleTransformType}
                                            className="mt-2 text-xs text-google-blue hover:underline"
                                        >
                                            Reverse
                                        </button>
                                    </div>

                                    {/* Equivalent Source */}
                                    <div className="text-center">
                                        <div className="text-xs text-google-textSecondary mb-2 font-medium">
                                            {transformType === "voltage-to-current" ? "Equivalent" : "Original"}
                                        </div>
                                        <svg width="100" height="120" viewBox="0 0 100 120">
                                            {/* Current source */}
                                            <circle cx="50" cy="30" r="20" fill="#34A853" />
                                            <text x="50" y="35" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">
                                                Is
                                            </text>
                                            {/* Parallel resistor */}
                                            <line x1="50" y1="50" x2="50" y2="70" stroke="#202124" strokeWidth="2" />
                                            <line x1="30" y1="70" x2="70" y2="70" stroke="#202124" strokeWidth="2" />
                                            <rect x="35" y="75" width="30" height="20" fill="#FBBC04" rx="3" />
                                            <text x="50" y="88" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                                                Rp
                                            </text>
                                            <line x1="30" y1="95" x2="70" y2="95" stroke="#202124" strokeWidth="2" />
                                            <line x1="50" y1="95" x2="50" y2="110" stroke="#202124" strokeWidth="2" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-google-textSecondary">
                                <p>
                                    <strong>Key Principle:</strong> Both circuits produce the same
                                    terminal voltage and current when connected to the same load.
                                </p>
                            </div>
                        </CircuitCard>
                    </div>

                    {/* AI Tutor Section */}
                    <div>
                        <MathExplanation steps={steps} title="AI Tutor - Transformation Steps" />
                    </div>
                </div>
            </div>
        </main>
    );
}
