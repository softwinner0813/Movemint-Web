import { Button } from "@/components/ui/button";

const SignedOutPage = () => {
  return (
    <div className="max-w-[754px] mx-auto space-y-6 p-6 md:p-12 rounded-md text-center bg-black text-white">
      <div className="text-start flex flex-col gap-3">
        <h3 className="text-xl md:text-2xl font-normal">
          You’ve been logged out
        </h3>
        <p className="text-sm font-normal">
          You’ve been logged out, please sign back in or return home.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
        <Button className="rounded-lg w-full md:max-w-[274px] text-lg font-bold bg-gradient-to-r from-blue-500 to-teal-400">
          Sign In
        </Button>
        <Button
          variant="outline"
          className="rounded-lg w-full md:max-w-[274px] text-lg font-bold border-white text-white"
        >
          Return To Home
        </Button>
      </div>
    </div>
  );
};

export default SignedOutPage;
