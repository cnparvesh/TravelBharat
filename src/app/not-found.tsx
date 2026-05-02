export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-gray-200 font-heading mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 font-heading mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">The destination you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track!</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  );
}
