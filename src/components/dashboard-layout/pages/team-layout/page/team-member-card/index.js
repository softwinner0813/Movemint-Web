import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeamMemberCard = ({ name, email, status, img }) => {
  return (
    <div className="w-full h-[289px] px-3 bg-background flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-transparent hover:border-primary hover:border-2 hover:cursor-pointer group">
      <Avatar className="w-[110px] h-[110px]">
        <AvatarImage src={img} alt="@shadcn" className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center justify-between gap-2">
        <p className="text-foreground font-bold text-base group-hover:text-primary">
          {name}
        </p>
        <p className="text-[13px] font-medium text-foreground opacity-80 group-hover:opacity-90">
          {status}
        </p>
        <p className="text-[13px] font-medium text-foreground whitespace-normal opacity-80 group-hover:opacity-90">
          {email}
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
