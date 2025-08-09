import logoUrl from '../assets/logo.svg';

export default function ErrorFallback() {
  return (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-6">
      <div className="text-center space-y-3">
        <img src={logoUrl} alt="Logo" className="h-10 w-10 mx-auto" />
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="text-foreground-500">Please try again later.</p>
      </div>
    </div>
  );
}
