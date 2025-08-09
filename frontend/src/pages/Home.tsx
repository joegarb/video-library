export default function Home() {
  if (new URLSearchParams(window.location.search).get('crash') === '1') {
    throw new Error('Test crash');
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">Hello World!</h1>
    </div>
  );
}
