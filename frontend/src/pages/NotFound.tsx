export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">404 - Not Found</h1>
        <p className="text-foreground-500">
          The page you requested does not exist.
        </p>
      </div>
    </div>
  );
}
