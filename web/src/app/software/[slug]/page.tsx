export const revalidate = 60 * 60 * 6;

export default async function SoftwareDetail({ params }:{ params:{ slug:string }}){
  const { slug } = params;
  return (
    <main className="container-max py-10 space-y-6">
      <div className="card p-8">
        <h1 className="text-2xl font-semibold">{slug}</h1>
        <p className="opacity-80 mt-2">Hero (version, OS pills, license, size, checksum, mirrors) + Tabs.</p>
      </div>
    </main>
  );
}
