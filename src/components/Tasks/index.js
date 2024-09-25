import { Component } from "react";
import TaskItems from "../TaskItems";
import "./index.css";

class Tasks extends Component {
  state = { tasksList: [], task: "", errorMsg: false };

  componentDidMount() {
    this.getDbList();
  }

  getDbList = async () => {
    const url = "https://todotaskfe-be-integration.onrender.com/alltasks";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      this.setState({ tasksList: data });
    } else {
      this.setState({ errorMsg: true });
    }
  };

  enterTask = (event) => {
    this.setState({ task: event.target.value });
  };

  addToDb = async () => {
    const { task } = this.state;
    const url = "https://todotaskfe-be-integration.onrender.com/addtask";
    const stringify = JSON.stringify({ task: task });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringify,
    };

    const response = await fetch(url, options);
    if (response.ok) {
      this.getDbList();
    }
  };

  addClicked = (event) => {
    event.preventDefault();
    const { task } = this.state;

    if (task !== "") {
      this.addToDb();
      this.setState({ task: "" });
    } else {
      this.setState({ errorMsg: true });
    }
  };

  deleteItem = async (id) => {
    const url = `https://todotaskfe-be-integration.onrender.com/todos/${id}`;
    const options = {
      method: "DELETE",
    };

    const response = await fetch(url, options);
    if (response.ok) {
      this.getDbList();
    } else {
      this.setState({ errorMsg: true });
    }
  };

  renderErrorView = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">Not Found</h1>
    </div>
  );

  renderNoItemsView = () => (
    <div className="not-found-container">
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/task-completion-illustration-download-in-svg-png-gif-file-formats--complete-tasks-list-checklist-business-miscellaneous-pack-illustrations-5230173.png?f=webp"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">No Tasks Yet!!</h1>
    </div>
  );

  render() {
    const { tasksList, task } = this.state;
    const length = tasksList.length;
    return (
      <div className="task-container">
        <h1>Todo List</h1>
        <form>
          <input
            type="text"
            id="task"
            placeholder="Enter Task todo.."
            onChange={this.enterTask}
            value={task}
          />
          <button type="submit" onClick={this.addClicked}>
            Add
          </button>
        </form>

        <hr className="line" />
        {length === 0 ? (
          this.renderNoItemsView()
        ) : (
          <ul className="list-container">
            <h2>Tasks List</h2>
            {tasksList.map((each) => (
              <TaskItems
                todo={each}
                key={each.id}
                deleteItem={this.deleteItem}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Tasks;
