import TeamMemberCard from "./team-member-card";

const TeamMemberList = ({ memberList }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center justify-between">
      {memberList?.map((member, index) => {
        return (
          <TeamMemberCard
            key={index}
            name={member.name}
            email={member.email}
            status={member.status}
            img={member.img}
          />
        );
      })}
    </div>
  );
};

export default TeamMemberList;
