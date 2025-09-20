export const revalidate = 60 * 60 * 6;

export default async function Home(){
  return (
    <main className="container-max py-10 space-y-8">
      <div className="card p-8">
        <h1 className="text-2xl font-semibold">Filespay</h1>
        <p className="opacity-80 mt-2">Trending, New, Top by OS — coming next.</p>
      </div>
    </main>
  );
}
