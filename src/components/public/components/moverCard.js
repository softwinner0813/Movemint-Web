import NavigationIcon from "@/components/icons/navigation-icon";
import Star from "@/components/icons/star";
import Image from "next/image";

const MoverCard = (props) => {
  return (
    <div className="rounded-[32px] overflow-hidden relative max-w-[320px] sm:max-w-[418px] w-full">
      {props.rating && (
        <div className="bg-white bg-opacity-50 h-[25px] px-1.5 rounded-md flex items-center justify-center gap-[3px] absolute top-[25px] left-[27px]">
          <Star />
          <span className="text-white text-lg font-medium">{props.rating}</span>
        </div>
      )}

      <Image
        src={props.image}
        alt={props.heading}
        width={418}
        height={435}
        className="w-full h-[435px] object-cover object-top"
      />

      <div className="bg-white rounded-b-[32px] py-[30px] px-[26px]">
        <h4 className="text-2xl text-background font-medium mb-7">
          {props.heading}
        </h4>

        <div className="flex items-center gap-5">
          <NavigationIcon />
          <span className="text-[#5E6282] font-medium text-[22px]">
            {props.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MoverCard;
