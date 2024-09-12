import PropTypes from "prop-types";

const StepCard = ({ heading, description, icon, color }) => {
  return (
    <div className="flex gap-7 max-w-[600px]">
      <div
        className="min-w-[63px] h-[63px] rounded-[18px] flex items-center justify-center mt-1.5"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="grid gap-1.5">
        <h4 className="font-bold text-white text-[22px]">{heading}</h4>
        <p className="text-base sm:text-[22px] leading-[124.5%] text-white">
          {description}
        </p>
      </div>
    </div>
  );
};

StepCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default StepCard;
