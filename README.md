# CircuitMinds - Master Circuit Theory with AI

An educational simulation platform for Electrical Engineering students to learn, calculate, and visualize **Kirchhoff's Circuit Laws** through interactive 2D simulations and AI-powered explanations.

## 🎯 Features

### Core Circuit Analysis Methods

- **KCL Simulator** - Kirchhoff's Current Law with node analysis
- **KVL Simulator** - Kirchhoff's Voltage Law with mesh analysis  
- **Supermesh Solver** - Advanced current source handling with matrix methods
- **Source Transformation** - Norton ↔ Thévenin equivalence conversions

### Educational Features

- ✨ **Real-time Calculations** - Instant results as you adjust values
- 📐 **LaTeX Equations** - Beautiful mathematical rendering with KaTeX
- 🤖 **AI Tutor** - Step-by-step explanations for every calculation
- 🎨 **Interactive Diagrams** - SVG circuit visualizations
- 📊 **Comprehensive Coverage** - All major circuit analysis techniques

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with Turbopack
- **UI**: React 19, Framer Motion, Tailwind CSS
- **Math**: mathjs (matrix operations), KaTeX (LaTeX rendering)
- **Design**: Google Material 3 color palette
- **Fonts**: Inter, Roboto

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nodal-perseverance

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
app/
├── page.tsx                    # Landing page
├── kcl/page.tsx               # KCL Simulator
├── kvl/page.tsx               # KVL Simulator
├── supermesh/page.tsx         # Supermesh Solver
└── source-transformation/page.tsx  # Source Transformation

lib/
├── circuitSolvers.ts          # Circuit analysis functions
└── LinearSolver.ts            # Matrix solver utilities

components/
└── ui/
    ├── InputField.tsx         # Material 3 input fields
    ├── CircuitCard.tsx        # Card containers
    ├── MathExplanation.tsx    # LaTeX equation renderer
    └── ModuleCard.tsx         # Landing page cards
```

## 🎓 Educational Approach

CircuitMinds uses a **learn-by-doing** methodology:

1. **Interactive Inputs** - Adjust circuit parameters in real-time
2. **Visual Feedback** - See circuit diagrams update instantly
3. **Mathematical Rigor** - Full LaTeX equations for every step
4. **AI Explanations** - Understand the "why" behind each calculation

## 🧮 Supported Analysis Methods

### Kirchhoff's Current Law (KCL)
- Node voltage analysis
- Current conservation at nodes
- Ohm's Law applications

### Kirchhoff's Voltage Law (KVL)
- Mesh current analysis
- Voltage loop equations
- Series circuit analysis

### Supermesh Analysis
- Current source handling
- Constraint equations
- Matrix-based solutions

### Source Transformation
- Norton to Thévenin conversion
- Thévenin to Norton conversion
- Equivalence principles

## 🎨 Design Philosophy

- **Google Material 3** - Modern, clean aesthetics
- **Accessibility** - WCAG compliant, keyboard navigation
- **Performance** - Optimized with Next.js Turbopack
- **Responsive** - Works on desktop, tablet, and mobile

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Contributions welcome! Please feel free to submit pull requests.

---

Built with ❤️ for Electrical Engineering students
