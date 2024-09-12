import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const TeamLayout = ({ children }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Team</h1>
        <Link href="/dashboard/add-new-member">
          <Button className="w-fit text-base rounded-md hidden md:block">
            Add New Member
          </Button>
          <Button className="w-fit text-base rounded-md md:hidden">
            <Plus />
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
};
export default TeamLayout;
