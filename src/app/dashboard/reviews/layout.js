const ReviewsLayout = ({ children }) => {
  return (
    <div className="h-full flex flex-col gap-6">
      <p className="text-3xl font-bold">Reviews</p>
      {children}
    </div>
  );
};
export default ReviewsLayout;
