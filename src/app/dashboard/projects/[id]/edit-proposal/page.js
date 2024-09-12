import SubmitProposal from "@/components/dashboard-layout/pages/submit-proposal";

const Page = ({ params }) => {
  const { id } = params;
  console.log(id, 'sdgsdgsjdl;k');
  return (
    <div className="h-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Edit Proposal</h1>
      <div className="w-full bg-background rounded-lg">
        <SubmitProposal id={id}/>
      </div>
    </div>
  );
};
export default Page;
