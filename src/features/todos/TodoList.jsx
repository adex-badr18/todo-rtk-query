import { useState } from "react";
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from "../api/apiSlice";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");

    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        // addTodo
        addTodo({ userId: 1, title: newTodo, completed: false });
        setNewTodo("");
    };

    const newItemSection = (
        <form onSubmit={handleSubmit} className="p-4 rounded border">
            <label htmlFor="newTodo" className="">
                Enter a new todo item
            </label>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    name="newTodo"
                    id="newTodo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="p-2 rounded border w-full"
                    placeholder="Enter new todo"
                />
                <button className="bg-gray-400 px-3 py-2 rounded" type="submit">
                    <FontAwesomeIcon icon={faUpload} />
                </button>
            </div>
        </form>
    );

    let content;
    // Todo: Define conditional content here
    if (isLoading) {
        content = <p className="">Loading...</p>;
    } else if (isSuccess) {
        content = todos.map((todo) => (
            <article className="flex items-center justify-between gap-4 p-4 border" key={todo.id}>
                <div className="flex gap-3 items-center">
                    <input
                        type="checkbox"
                        name=""
                        checked={todo.completed}
                        id={todo.id}
                        onChange={() =>
                            updateTodo({
                                ...todo,
                                completed: !todo.completed,
                            })
                        }
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button
                    className="px-2 py-1 border rounded text-red-700 hover:text-red-600"
                    onClick={() => deleteTodo({ id: todo.id })}
                >
                    <FontAwesomeIcon icon={faTrash} className="" />
                </button>
            </article>
        ));
    } else if (isError) {
        content = <p className="">{error.error || "Failed to load todos"}</p>;
    }

    return (
        <section className="p-10 space-y-6 w-full max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold">Todo List</h1>
            {newItemSection}
            <div className="">{content}</div>
        </section>
    );
};

export default TodoList;
