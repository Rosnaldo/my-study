import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    // if (this.state.hasError) {
    //   // You can render any custom fallback UI
    //   return this.props.fallback;
    // }

    return this.props.children;
  }
}
