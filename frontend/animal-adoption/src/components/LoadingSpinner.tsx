// components/LoadingSpinner.tsx
const LoadingSpinner: React.FC = () => (
    <div className="flex items-center justify-center h-screen">
        <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-secondary"
            role="status"
        />
    </div>
);

export default LoadingSpinner;