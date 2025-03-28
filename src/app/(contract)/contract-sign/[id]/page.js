import SignPdfPage from "@/components/dashboard-layout/pages/pdf/signPdf";
import { decryptLink } from "@/lib/encrypt";

const page = ({ params }) => {
  const { id } = params;
  // const [proposalId, setProposalID] = useState(null);
  // useEffect(() => {
  //   // Decode it

  // const decodedId = decodeURIComponent(id);
  // const proposalId = decryptLink(decodedId);
  //   setProposalID(proposalId);
  // }, [proposalId]);
  return (
    <>
      <SignPdfPage proposalId={id} />
    </>
  );
};

export default page;
