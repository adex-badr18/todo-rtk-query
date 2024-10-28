import { useState } from "react";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // addTodo
        setNewTodo("");
    };

    const newItemSection = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="newTodo" className="">
                Enter a new todo item
            </label>
            <div className="">
                <input
                    type="text"
                    name="newTodo"
                    id="newTodo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className=""
                    placeholder="Enter new todo"
                />
            </div>
            <button className="" type="submit">
                <FontAwesomeIcon icon={faUpload} />
            </button>
        </form>
    );

    let content;
    // Todo: Define conditional content here

    return (
        <section className="">
            <h1 className="">Todo List</h1>
            {newItemSection}
            {content}
        </section>
    );
};

export default TodoList;
