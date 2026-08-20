interface ErrorDisplayProps {
  error: unknown;
  onRetry?: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  let message = "Something went wrong. Please try again.";

  if (error instanceof Error && error.message) {
    message = error.message;
  }

  return (
    <div data-testid="error-display">
      <p>{message}</p>

      {onRetry && (
        <button type="button" data-testid="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
