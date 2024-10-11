const AddNewMemberLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Add New Member</h1>
      {children}
    </div>
  );
};
export default AddNewMemberLayout;
