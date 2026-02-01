"use client";

import { motion } from "framer-motion";
import { Zap, GitBranch, Network, Repeat } from "lucide-react";
import ModuleCard from "@/components/ui/ModuleCard";

export default function Home() {
    return (
        <main className="min-h-screen bg-google-background">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold text-google-text mb-4">
                        Circuit<span className="text-google-blue">Minds</span>
                    </h1>
                    <p className="text-xl text-google-textSecondary max-w-2xl mx-auto">
                        Master circuit theory with interactive simulations and AI-powered
                        explanations. Learn Kirchhoff's Laws through hands-on practice.
                    </p>
                </motion.div>

                {/* Module Cards */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <ModuleCard
                        title="KCL Simulator"
                        description="Learn Kirchhoff's Current Law with interactive node analysis. Understand how currents balance at circuit nodes."
                        icon={GitBranch}
                        href="/kcl"
                        color="#1A73E8"
                    />

                    <ModuleCard
                        title="KVL Simulator"
                        description="Master Kirchhoff's Voltage Law through mesh analysis. Visualize voltage drops and loop equations."
                        icon={Zap}
                        href="/kvl"
                        color="#34A853"
                    />

                    <ModuleCard
                        title="Supermesh Solver"
                        description="Solve complex circuits with current sources using the supermesh technique and matrix methods."
                        icon={Network}
                        href="/supermesh"
                        color="#FBBC04"
                    />

                    <ModuleCard
                        title="Source Transformation"
                        description="Convert between voltage and current sources. Learn equivalence principles with detailed math steps."
                        icon={Repeat}
                        href="/source-transformation"
                        color="#EA4335"
                    />
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16 text-center text-google-textSecondary text-sm"
                >
                    <p>
                        Built with Next.js, React, and Framer Motion • Powered by AI
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
