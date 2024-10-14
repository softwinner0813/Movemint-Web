import TeamMemberCard from "./team-member-card";
import { useRouter } from "next/navigation";

const TeamMemberList = ({ memberList }) => {

  const router = useRouter();

  const onEditTeamMember = (index) => {
    localStorage.setItem("member-data", JSON.stringify(memberList[index]));
    router.push("/dashboard/edit-team-member");
  }

  return (
    <>
      {
        memberList.length != 0 ? (<div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center justify-between">
          {memberList.map((member, index) => {
            return (
              <TeamMemberCard
                key={index}
                name={member.first_name + " " + member.last_name}
                email={member.email}
                status={member.job_title}
                img={member.avatar}
                onEditTeamMember={() => onEditTeamMember(index)}
              />
            );
          })}
        </div>) : <p className="text-center w-full min-h-[100px] mt-20">No Members</p>
      }
    </>
  );
};

export default TeamMemberList;
