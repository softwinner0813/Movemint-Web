const MessagingLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <p className="text-3xl font-bold">Inbox</p>
      {children}
    </div>
  );
};
export default MessagingLayout;