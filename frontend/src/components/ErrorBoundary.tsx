import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        // Update state to render fallback UI
        return { hasError: true };
    }

    // componentDidCatch(error: Error, errorInfo: any) {
    //     // You can log the error or send it to an error reporting service here
    //     console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // }

    render() {
        if (this.state.hasError) {
            return (
                <main className="error-main">
                    <span>Etwas ist schiefgelaufen.</span>
                </main>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
