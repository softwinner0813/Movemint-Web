const BillingLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <p className="text-3xl font-bold">Settings</p>
      {children}
    </div>
  );
};
export default BillingLayout;
