const PdfLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <p className="text-3xl font-bold pt-[30px]">Create Contract</p>
      {children}
    </div >
  );
};
export default PdfLayout;
