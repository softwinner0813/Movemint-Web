const OrderHistoryLayout = ({ children }) => {
  return (
    <div className="container h-full bg-[#1b1c21] flex flex-col gap-6">
      <p className="text-3xl font-bold">Order History</p>
      {children}
    </div>
  );
};
export default OrderHistoryLayout;
