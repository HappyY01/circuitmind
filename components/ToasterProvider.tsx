"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: "#fff",
                    color: "#202124",
                    border: "1px solid #DADCE0",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "14px",
                    boxShadow:
                        "0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)",
                },
                success: {
                    iconTheme: {
                        primary: "#1A73E8",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#D93025",
                        secondary: "#fff",
                    },
                },
            }}
        />
    );
}
