const UploadContractLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Project Details</h1>
      {children}
    </div>
  );
};
export default UploadContractLayout;
