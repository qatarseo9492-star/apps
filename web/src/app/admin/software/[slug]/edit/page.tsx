import NewSoftwareForm from '@/components/admin/NewSoftwareForm';
import { apiGet } from '@/lib/api';

export default async function EditPage({ params }:{ params:{ slug:string }}){
  const data = await apiGet<{ ok:boolean; item:any }>(`/api/software/${params.slug}`).catch(()=>({ok:false,item:null}));
  return (
    <main className="container-max py-10">
      <div className="card p-6">
        <h1 className="text-xl font-semibold mb-4">Edit: {params.slug}</h1>
        <NewSoftwareForm initial={data.item || { slug: params.slug, name:'' }} />
      </div>
    </main>
  );
}
