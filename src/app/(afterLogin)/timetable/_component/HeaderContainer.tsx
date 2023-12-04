import TimetableHeader from "./TimetableHeader";

interface Props {
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const TimetableContainer = ({ rightIcon, children, className }: Props) => {
  return (
    <div className={className}>
      <TimetableHeader />
      <div
        style={{
          paddingTop: "80px",
          paddingBottom: `6rem`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TimetableContainer;
