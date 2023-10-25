import React, { ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

const Loader = () => {
  return <div>Loading...</div>;
};

const ErrorPage = () => {
  return <div>Ohh ! An Error Occurred !</div>;
};

export class SuspenseErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Uncaught error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Suspense fallback={<Loader />}>
          <ErrorPage />
        </React.Suspense>
      );
    }

    return (
      <React.Suspense fallback={<Loader />}>
        {this.props.children}
      </React.Suspense>
    );
  }
}
