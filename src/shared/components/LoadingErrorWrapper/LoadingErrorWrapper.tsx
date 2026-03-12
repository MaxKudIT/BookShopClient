import { CircularProgress } from '@mui/material';

interface LoadingErrorWrapperProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({
  loading,
  error,
  children,
  fallback
}) => {
  if (loading) {
    return fallback || (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <CircularProgress sx={{ color: 'white' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <p style={{ color: 'red', fontSize: 18 }}>{error}</p>
        <button onClick={() => window.location.reload()}>Повторить</button>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper;