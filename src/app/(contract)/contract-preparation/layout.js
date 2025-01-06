const PdfLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-6 mt-5">
      <p className="text-3xl font-bold">Create Contract</p>
      {children}
    </div >
  );
};
export default PdfLayout;
