/**
 * LinearSolver - Robust matrix solver using Gauss-Jordan elimination
 * Solves systems of linear equations in the form Ax = b
 */

export class LinearSolver {
    /**
     * Solve a system of linear equations using Gauss-Jordan elimination
     * @param A - Coefficient matrix (n x n)
     * @param b - Constants vector (n x 1)
     * @returns Solution vector x, or throws error if singular
     */
    static solve(A: number[][], b: number[]): number[] {
        const n = A.length;

        // Validate inputs
        if (A.some(row => row.length !== n)) {
            throw new Error("Matrix A must be square");
        }
        if (b.length !== n) {
            throw new Error("Vector b must have same length as matrix A");
        }

        // Create augmented matrix [A|b]
        const augmented = A.map((row, i) => [...row, b[i]]);

        // Forward elimination with partial pivoting
        for (let i = 0; i < n; i++) {
            // Find pivot (largest absolute value in column i)
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = k;
                }
            }

            // Swap rows
            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

            // Check for singular matrix
            if (Math.abs(augmented[i][i]) < 1e-10) {
                throw new Error(
                    "Circuit is unsolvable: Singular matrix detected. Check your circuit configuration."
                );
            }

            // Make all rows below this one 0 in current column
            for (let k = i + 1; k < n; k++) {
                const factor = augmented[k][i] / augmented[i][i];
                for (let j = i; j <= n; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }

        // Back substitution
        const x = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            x[i] = augmented[i][n];
            for (let j = i + 1; j < n; j++) {
                x[i] -= augmented[i][j] * x[j];
            }
            x[i] /= augmented[i][i];
        }

        return x;
    }

    /**
     * Multiply matrix A by vector x
     */
    static multiply(A: number[][], x: number[]): number[] {
        return A.map(row =>
            row.reduce((sum, val, i) => sum + val * x[i], 0)
        );
    }

    /**
     * Verify solution by checking if Ax ≈ b
     */
    static verify(A: number[][], x: number[], b: number[], tolerance = 1e-6): boolean {
        const result = this.multiply(A, x);
        return result.every((val, i) => Math.abs(val - b[i]) < tolerance);
    }
}
