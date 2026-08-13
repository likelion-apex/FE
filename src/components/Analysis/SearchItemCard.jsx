import ScoreGoal from "../Use/ScoreGoal";
import Item from "../Use/Item";

const SearchItemCard = ({ data }) => {
  return (
    <div>
      <div />
      <Item />
      <ScoreGoal data={data} isRoutine={false} />
    </div>
  );
};
