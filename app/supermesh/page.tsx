"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Network } from "lucide-react";
import Link from "next/link";
import InputField from "@/components/ui/InputField";
import CircuitCard from "@/components/ui/CircuitCard";
import MathExplanation from "@/components/ui/MathExplanation";
import { solveSupermesh } from "@/lib/circuitSolvers";
import toast from "react-hot-toast";

export default function SupermeshPage() {
    const [r1, setR1] = useState("2");
    const [r2, setR2] = useState("4");
    const [r3, setR3] = useState("3");
    const [v1, setV1] = useState("10");
    const [is, setIs] = useState("2");
    const [steps, setSteps] = useState<string[]>([]);
    const [result, setResult] = useState<number[]>([]);

    React.useEffect(() => {
        try {
            const R1 = parseFloat(r1) || 0;
            const R2 = parseFloat(r2) || 0;
            const R3 = parseFloat(r3) || 0;
            const V1 = parseFloat(v1) || 0;
            const Is = parseFloat(is) || 0;

            const solution = solveSupermesh({
                voltages: [V1, 0], // V1 and V2 (V2 = 0 for this example)
                resistances: [R1, R2, R3],
                currentSource: Is
            });
            setSteps(solution.steps);
            setResult([solution.mesh1Current, solution.mesh2Current]);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Calculation error");
            setSteps([]);
            setResult([]);
        }
    }, [r1, r2, r3, v1, is]);

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
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                            <Network size={24} className="text-yellow-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-google-text">
                            Supermesh Solver
                        </h1>
                    </div>
                    <p className="text-google-textSecondary">
                        Solve circuits with current sources shared between loops using
                        matrix methods and supermesh technique.
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
                                        <InputField
                                            label="Resistance R₃"
                                            value={r3}
                                            onChange={setR3}
                                            unit="Ω"
                                            placeholder="Enter resistance"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-google-border pt-4">
                                    <h3 className="text-sm font-semibold text-google-text mb-3">
                                        Sources
                                    </h3>
                                    <div className="space-y-3">
                                        <InputField
                                            label="Voltage Source V₁"
                                            value={v1}
                                            onChange={setV1}
                                            unit="V"
                                            placeholder="Enter voltage"
                                        />
                                        <InputField
                                            label="Current Source Is"
                                            value={is}
                                            onChange={setIs}
                                            unit="A"
                                            placeholder="Enter current"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CircuitCard>

                        {/* Results Card */}
                        {result.length > 0 && (
                            <CircuitCard title="Mesh Currents">
                                <div className="space-y-3">
                                    <div className="bg-google-background rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-google-textSecondary font-medium">
                                                Loop Current I₁:
                                            </span>
                                            <span className="text-2xl font-bold text-google-blue">
                                                {result[0].toFixed(3)} A
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-google-background rounded-xl p-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-google-textSecondary font-medium">
                                                Loop Current I₂:
                                            </span>
                                            <span className="text-2xl font-bold text-google-blue">
                                                {result[1].toFixed(3)} A
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-green-700 font-medium">
                                                Current through R₂:
                                            </span>
                                            <span className="text-2xl font-bold text-green-600">
                                                {(result[0] - result[1]).toFixed(3)} A
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CircuitCard>
                        )}

                        {/* Visual Diagram */}
                        <CircuitCard title="Supermesh Diagram">
                            <div className="bg-google-background rounded-xl p-8 flex items-center justify-center">
                                <svg
                                    width="340"
                                    height="200"
                                    viewBox="0 0 340 200"
                                    className="max-w-full"
                                >
                                    {/* Loop 1 */}
                                    <path
                                        d="M 60 100 L 140 100 L 140 40 L 60 40 Z"
                                        fill="none"
                                        stroke="#1A73E8"
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                    />
                                    <text x="80" y="70" fill="#1A73E8" fontSize="12" fontWeight="bold">
                                        Loop 1
                                    </text>

                                    {/* Loop 2 */}
                                    <path
                                        d="M 140 100 L 220 100 L 220 40 L 140 40 Z"
                                        fill="none"
                                        stroke="#34A853"
                                        strokeWidth="2"
                                        strokeDasharray="5,5"
                                    />
                                    <text x="160" y="70" fill="#34A853" fontSize="12" fontWeight="bold">
                                        Loop 2
                                    </text>

                                    {/* V1 */}
                                    <circle cx="60" cy="70" r="18" fill="#1A73E8" />
                                    <text x="60" y="75" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">
                                        V₁
                                    </text>

                                    {/* R1 */}
                                    <rect x="100" y="30" width="40" height="16" fill="#FBBC04" rx="3" />
                                    <text x="120" y="42" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                                        R₁
                                    </text>

                                    {/* Is (Current source - shared) */}
                                    <circle cx="140" cy="70" r="18" fill="#EA4335" />
                                    <text x="140" y="75" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">
                                        Is
                                    </text>

                                    {/* R3 */}
                                    <rect x="180" y="30" width="40" height="16" fill="#FBBC04" rx="3" />
                                    <text x="200" y="42" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                                        R₃
                                    </text>

                                    {/* R2 (bottom) */}
                                    <rect x="100" y="94" width="40" height="16" fill="#FBBC04" rx="3" />
                                    <text x="120" y="106" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                                        R₂
                                    </text>

                                    {/* Supermesh highlight */}
                                    <path
                                        d="M 60 100 L 220 100 L 220 40 L 60 40 Z"
                                        fill="rgba(234, 67, 53, 0.1)"
                                        stroke="#EA4335"
                                        strokeWidth="3"
                                        strokeDasharray="8,4"
                                    />
                                    <text x="140" y="130" fill="#EA4335" fontSize="13" fontWeight="bold" textAnchor="middle">
                                        Supermesh
                                    </text>
                                </svg>
                            </div>
                            <div className="mt-4 text-sm text-google-textSecondary">
                                <p className="mb-2">
                                    <strong>Supermesh:</strong> When a current source is shared
                                    between two loops, we combine them into a supermesh.
                                </p>
                                <p>
                                    The current source (Is) creates a constraint equation between
                                    the two mesh currents.
                                </p>
                            </div>
                        </CircuitCard>
                    </div>

                    {/* AI Tutor Section */}
                    <div>
                        <MathExplanation steps={steps} title="AI Tutor - Matrix Solution" />
                    </div>
                </div>
            </div>
        </main>
    );
}
