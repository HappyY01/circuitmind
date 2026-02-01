import { create, all } from "mathjs";

const math = create(all);

/**
 * Enhanced Circuit Solvers with Special Cases
 * Covers KCL, KVL, Supermesh, Supernode, and Dependent Sources
 */

// ============================================================================
// KCL (Kirchhoff's Current Law) Solvers
// ============================================================================

export interface KCLResult {
    current: number;
    steps: string[];
}

/**
 * Basic KCL - Single node analysis
 * ΣI_in = ΣI_out
 */
export function solveKCL(voltages: number[], resistances: number[]): KCLResult {
    const steps: string[] = [];

    steps.push("## Kirchhoff's Current Law (KCL)");
    steps.push("**Principle**: The sum of currents entering a node equals the sum of currents leaving.");
    steps.push("");
    steps.push("$$\\sum I_{in} = \\sum I_{out}$$");
    steps.push("");

    // Calculate currents using Ohm's law
    const currents = voltages.map((v, i) => v / resistances[i]);

    steps.push("### Step 1: Apply Ohm's Law");
    voltages.forEach((v, i) => {
        steps.push(`$$I_${i + 1} = \\frac{V_${i + 1}}{R_${i + 1}} = \\frac{${v}}{${resistances[i]}} = ${currents[i].toFixed(3)}\\text{ A}$$`);
    });
    steps.push("");

    // Sum of currents
    const totalCurrent = currents.reduce((sum, i) => sum + i, 0);

    steps.push("### Step 2: Apply KCL at the Node");
    const currentTerms = currents.map((_, i) => `I_${i + 1}`).join(" + ");
    steps.push(`$$${currentTerms} = ${totalCurrent.toFixed(3)}\\text{ A}$$`);
    steps.push("");

    steps.push("### Result");
    steps.push(`**Total Current**: ${totalCurrent.toFixed(3)} A`);

    return {
        current: totalCurrent,
        steps
    };
}

// ============================================================================
// KVL (Kirchhoff's Voltage Law) Solvers
// ============================================================================

export interface KVLResult {
    current: number;
    steps: string[];
}

/**
 * Basic KVL - Single loop analysis
 * ΣV = 0 around a closed loop
 */
export function solveKVL(voltages: number[], resistances: number[]): KVLResult {
    const steps: string[] = [];

    steps.push("## Kirchhoff's Voltage Law (KVL)");
    steps.push("**Principle**: The sum of all voltages around a closed loop equals zero.");
    steps.push("");
    steps.push("$$\\sum V = 0$$");
    steps.push("");

    // Calculate total resistance
    const totalR = resistances.reduce((sum, r) => sum + r, 0);

    steps.push("### Step 1: Sum of Voltage Sources");
    const totalV = voltages.reduce((sum, v) => sum + v, 0);
    const voltageTerms = voltages.map((v, i) => `V_${i + 1}`).join(" + ");
    steps.push(`$$${voltageTerms} = ${totalV}\\text{ V}$$`);
    steps.push("");

    steps.push("### Step 2: Total Resistance");
    const resistanceTerms = resistances.map((r, i) => `R_${i + 1}`).join(" + ");
    steps.push(`$$R_{total} = ${resistanceTerms} = ${totalR}\\text{ Ω}$$`);
    steps.push("");

    // Apply KVL: V - I*R = 0, so I = V/R
    const current = totalV / totalR;

    steps.push("### Step 3: Apply KVL");
    steps.push("$$-V_{total} + I \\cdot R_{total} = 0$$");
    steps.push(`$$I = \\frac{V_{total}}{R_{total}} = \\frac{${totalV}}{${totalR}} = ${current.toFixed(3)}\\text{ A}$$`);
    steps.push("");

    steps.push("### Step 4: Voltage Drops");
    resistances.forEach((r, i) => {
        const vDrop = current * r;
        steps.push(`$$V_{R${i + 1}} = I \\cdot R_${i + 1} = ${current.toFixed(3)} \\times ${r} = ${vDrop.toFixed(3)}\\text{ V}$$`);
    });
    steps.push("");

    steps.push("### Result");
    steps.push(`**Loop Current**: ${current.toFixed(3)} A`);

    return {
        current,
        steps
    };
}

// ============================================================================
// Supermesh Analysis
// ============================================================================

export interface SupermeshInput {
    voltages: number[]; // Voltage sources [V1, V2]
    resistances: number[]; // Resistances [R1, R2, R3]
    currentSource: number; // Current source creating the supermesh
}

export interface SupermeshResult {
    mesh1Current: number;
    mesh2Current: number;
    steps: string[];
}

/**
 * Supermesh Analysis
 * When a current source is shared between two meshes
 */
export function solveSupermesh(input: SupermeshInput): SupermeshResult {
    const steps: string[] = [];
    const { voltages, resistances, currentSource } = input;

    steps.push("## Supermesh Analysis");
    steps.push("**Definition**: A supermesh is formed when a current source is shared between two meshes.");
    steps.push("");

    steps.push("### Step 1: Identify Supermesh");
    steps.push(`Current source of ${currentSource}A is shared between Mesh 1 and Mesh 2.`);
    steps.push("");

    steps.push("### Step 2: Constraint Equation");
    steps.push(`$$I_2 - I_1 = ${currentSource}\\text{ A}$$`);
    steps.push("");

    steps.push("### Step 3: KVL Around Supermesh");
    steps.push("Write KVL equation around the supermesh (excluding the current source):");

    const V1 = voltages[0] || 0;
    const V2 = voltages[1] || 0;
    const R1 = resistances[0] || 1;
    const R2 = resistances[1] || 1;
    const R3 = resistances[2] || 1;

    steps.push(`$$-V_1 + I_1 R_1 + I_2 R_2 - V_2 = 0$$`);
    steps.push(`$$-${V1} + I_1(${R1}) + I_2(${R2}) - ${V2} = 0$$`);
    steps.push("");

    // Solve the system
    const A = [[-1, 1], [R1, R2]];
    const b = [currentSource, V1 + V2];

    try {
        const solution = math.lusolve(A, b);
        const currents = (solution as any).toArray().flat();
        const mesh1Current = currents[0];
        const mesh2Current = currents[1];

        steps.push("### Step 4: Solve System of Equations");
        steps.push("$$\\begin{cases}");
        steps.push(`I_2 - I_1 = ${currentSource} \\\\`);
        steps.push(`${R1}I_1 + ${R2}I_2 = ${V1 + V2}`);
        steps.push("\\end{cases}$$");
        steps.push("");

        steps.push("### Result");
        steps.push(`**Mesh 1 Current**: ${mesh1Current.toFixed(3)} A`);
        steps.push(`**Mesh 2 Current**: ${mesh2Current.toFixed(3)} A`);

        return {
            mesh1Current,
            mesh2Current,
            steps
        };
    } catch (error) {
        steps.push("**Error**: Unable to solve system of equations.");
        return {
            mesh1Current: 0,
            mesh2Current: 0,
            steps
        };
    }
}

// ============================================================================
// Source Transformation
// ============================================================================

export interface SourceTransformationResult {
    equivalentVoltage?: number;
    equivalentCurrent?: number;
    equivalentResistance: number;
    steps: string[];
}

/**
 * Norton to Thévenin Transformation
 */
export function nortonToThevenin(In: number, Rn: number): SourceTransformationResult {
    const steps: string[] = [];

    steps.push("## Norton to Thévenin Transformation");
    steps.push("");

    steps.push("### Given Norton Equivalent");
    steps.push(`- Current Source: $I_N = ${In}$ A`);
    steps.push(`- Norton Resistance: $R_N = ${Rn}$ Ω`);
    steps.push("");

    const Vth = In * Rn;
    const Rth = Rn;

    steps.push("### Transformation Formulas");
    steps.push("$$V_{TH} = I_N \\times R_N$$");
    steps.push("$$R_{TH} = R_N$$");
    steps.push("");

    steps.push("### Calculation");
    steps.push(`$$V_{TH} = ${In} \\times ${Rn} = ${Vth}\\text{ V}$$`);
    steps.push(`$$R_{TH} = ${Rth}\\text{ Ω}$$`);
    steps.push("");

    steps.push("### Thévenin Equivalent");
    steps.push(`- Voltage Source: **${Vth} V**`);
    steps.push(`- Thévenin Resistance: **${Rth} Ω**`);

    return {
        equivalentVoltage: Vth,
        equivalentResistance: Rth,
        steps
    };
}

/**
 * Thévenin to Norton Transformation
 */
export function theveninToNorton(Vth: number, Rth: number): SourceTransformationResult {
    const steps: string[] = [];

    steps.push("## Thévenin to Norton Transformation");
    steps.push("");

    steps.push("### Given Thévenin Equivalent");
    steps.push(`- Voltage Source: $V_{TH} = ${Vth}$ V`);
    steps.push(`- Thévenin Resistance: $R_{TH} = ${Rth}$ Ω`);
    steps.push("");

    if (Rth === 0) {
        steps.push("**Error**: Cannot transform ideal voltage source (R = 0) to Norton equivalent.");
        return {
            equivalentResistance: 0,
            steps
        };
    }

    const In = Vth / Rth;
    const Rn = Rth;

    steps.push("### Transformation Formulas");
    steps.push("$$I_N = \\frac{V_{TH}}{R_{TH}}$$");
    steps.push("$$R_N = R_{TH}$$");
    steps.push("");

    steps.push("### Calculation");
    steps.push(`$$I_N = \\frac{${Vth}}{${Rth}} = ${In.toFixed(3)}\\text{ A}$$`);
    steps.push(`$$R_N = ${Rn}\\text{ Ω}$$`);
    steps.push("");

    steps.push("### Norton Equivalent");
    steps.push(`- Current Source: **${In.toFixed(3)} A**`);
    steps.push(`- Norton Resistance: **${Rn} Ω**`);

    return {
        equivalentCurrent: In,
        equivalentResistance: Rn,
        steps
    };
}
