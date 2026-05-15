import { useState, useEffect } from "react";
import DeleteModal from "@/components/ModalDeletion.jsx";
import EditModal from "@/components/ModalEdit.jsx";
import "@/index.css";
import "@/styleTodos.css";

export default function App() {
    // Load from localStorage
    const [currentTodos, updateTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });
    // modal open
    const [isToOpen, updateToOpen] = useState(false);
    const [isToOpenEdit, isToUpdateEdit] = useState(false);
    // Current input and filter
    const [currentInput, updateInput] = useState("");
    const [currentSelected, updateSelected] = useState("All");

    // Derived data (for display)
    const [currentData, updateData] = useState([]);
    const [storeId, updateId] = useState(null);
    const [setName, updateName] = useState("");
    useEffect(() => {
        if (currentSelected === "All") {
            updateData(currentTodos);
        } else if (currentSelected === "Uncompleted") {
            updateData(currentTodos.filter((items) => !items.completed));
        } else if (currentSelected === "Completed") {
            updateData(currentTodos.filter((items) => items.completed));
        }
    }, [currentTodos, currentSelected]);

    // ✅ 4️⃣ Save the main todos list
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(currentTodos));
    }, [currentTodos]);

    // Add todo
    const handleSubmitTodos = (e) => {
        e.preventDefault();
        if (currentInput.trim() === "") return;
        updateTodos((previousData) => [
            {
                id: Date.now() + Math.random(),
                name: currentInput,
                completed: false,
            },
            ...previousData,
        ]);
        updateInput("");
    };

    // ✅ Handle checkbox change
    const handleCheckboxChange = (id) => {
        updateTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    //Delete todos
    const deleteTodos = (id) => {
        updateId(id);
        updateToOpen(() => true);
    };
    //Edit todos
    const editTodos = (dataName) => {
        updateName(dataName);
        isToUpdateEdit(true);
    };
    return (
        <section className="bg-stone-100 p-4 rounded-lg shadow-lg w-[500px] border-[0.1rem]">
            <article className="flex justify-center flex-col">
                <form
                    className="flex py-1 relative mb-2"
                    onSubmit={handleSubmitTodos}
                >
                    <input
                        type="text"
                        value={currentInput}
                        onChange={(e) => updateInput(e.target.value)}
                        placeholder="Enter anything"
                        className="w-full bg-transparent text-base font-medium outline-0 border-r-0 border-t-2 border-l-2 border-b-2 rounded-l-3xl rounded-r-none py-2 px-5 "
                    />
                    <div className="h-5 w-[1.7px] bg-stone-300 left-[78.9%] top-1/2 transform translate-x-[-50%] translate-y-[-50%] absolute"></div>
                    <button
                        type="submit"
                        className="bg-transparent px-5 border-l-0 font-medium text-gray-400 border-t-2 border-b-2 border-r-2 rounded-r-3xl hover:opacity-70"
                    >
                        Submit
                    </button>
                </form>

                <article
                    className={`${
                        currentTodos.length > 0 ? "flex" : "hidden"
                    } w-full items-center justify-around gap-1 mb-3`}
                >
                    {["All", "Uncompleted", "Completed"].map((type) => (
                        <button
                            key={type}
                            onClick={() => updateSelected(type)}
                            className={`flex bg-cyan-200 w-full rounded-[1000px] text-[15px] items-center h-[35px] justify-center font-[500] text-white hover:bg-cyan-300 transition duration-300 in-ease-out`}
                        >
                            {type}
                        </button>
                    ))}
                </article>

                <ul className="flex gap-2 flex-col">
                    {currentData.map((items) => (
                        <li key={items.id}>
                            <label
                                htmlFor={items.id}
                                className="flex w-full items-center rounded-full cursor-pointer"
                            >
                                <input
                                    id={items.id}
                                    type="checkbox"
                                    checked={items.completed}
                                    onChange={() =>
                                        handleCheckboxChange(items.id)
                                    }
                                    className="circleCheck hidden"
                                />

                                <label
                                    htmlFor={items.id}
                                    className="parentLabel flex items-center justify-center rounded-full border-[2.3px] border-cyan-400 w-[34px] h-[31px] transition-all cursor-pointer mr-1"
                                >
                                    <span className="material-symbols-outlined hidden">
                                        check
                                    </span>
                                </label>

                                <label
                                    htmlFor={items.id}
                                    className={`contentTodos relative flex items-center font-medium bg-cyan-400 w-full text-[1.18em] cursor-pointer h-8 pl-4 rounded-full text-white ${
                                        items.completed
                                            ? "line-through opacity-70"
                                            : ""
                                    }`}
                                >
                                    {items.name}
                                    <div className="activeButton absolute hidden justify-between gap-1 right-10 w-10">
                                        <button
                                            onClick={() => editTodos(items)}
                                            className="flex items-center p-1 hover:bg-yellow-100 hover:text-black"
                                        >
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </button>
                                        <button
                                            onClick={() =>
                                                deleteTodos(items.id)
                                            }
                                            className="flex items-center p-1 hover:bg-red-100 hover:text-black"
                                        >
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </label>
                            </label>
                        </li>
                    ))}
                </ul>
            </article>
            <DeleteModal
                isOpen={isToOpen}
                isClose={updateToOpen}
                isConfirm={updateTodos}
                getId={storeId}
            />
            <EditModal
                getId={isToOpenEdit}
                getUpdateEdit={isToUpdateEdit}
                getName={setName}
                editTodos={updateTodos}
            />
        </section>
    );
}
