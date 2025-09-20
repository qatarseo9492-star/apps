import NewSoftwareForm from '@/components/admin/NewSoftwareForm';

export default function Page(){
  return (
    <main className="container-max py-10">
      <div className="card p-6">
        <h1 className="text-xl font-semibold mb-4">New Software</h1>
        <NewSoftwareForm />
      </div>
    </main>
  );
}
