import { MdDeleteOutline } from "react-icons/md";
import "./index.css";

const TaskItems = (props) => {
  const { deleteItem, todo } = props;
  const { id, task } = todo;

  const iconClicked = () => {
    deleteItem(id);
  };

  return (
    <li className="todos-container">
      <h3>{task}</h3>
      <MdDeleteOutline className="delete" onClick={iconClicked} />
    </li>
  );
};

export default TaskItems;
