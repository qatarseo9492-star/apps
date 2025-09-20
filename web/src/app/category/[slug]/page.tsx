export const revalidate = 60 * 60 * 6;

export default async function CategoryPage({ params, searchParams }:{
  params:{slug:string};
  searchParams:{page?:string; os?:string; license?:string; sort?:string};
}){
  const { slug } = params;
  return (
    <main className="container-max py-10 space-y-6">
      <h1 className="text-xl font-semibold capitalize">Category: {slug.replace(/-/g,' ')}</h1>
      <div className="card p-6">Faceted filters & grid here (SSR + pagination).</div>
    </main>
  );
}
