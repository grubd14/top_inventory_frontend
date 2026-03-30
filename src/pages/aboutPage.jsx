export const AboutPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-16 dark:bg-slate-900">
      <div className="max-w-xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
          About this project
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          A focused inventory app built with React and a REST API: categories,
          items, and quantities with a simple, predictable UI.
        </p>
      </div>
    </main>
  );
};
