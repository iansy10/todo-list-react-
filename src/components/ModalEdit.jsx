import { useState, useEffect } from "react";

export default function EditModal({
    getId,
    getUpdateEdit,
    getName,
    editTodos,
}) {
    const [storeEdit, updateStoreEdit] = useState(getName?.name);
    useEffect(() => {
        updateStoreEdit(getName?.name || "");
    }, [getName]);
    if (!getId) return null;
    const getIdValue = (e) => {
        updateStoreEdit(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (storeEdit.trim() === "") return;
        editTodos((currentData) =>
            currentData.map((todos) =>
                todos.id === getName.id ? { ...todos, name: storeEdit } : todos
            )
        );
        getUpdateEdit(false);
    };
    return (
        <article className="fixed p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[200px] bg-[#ffffff] drop-shadow-xl rounded-[0.5rem] border-[0.1rem]">
            <h1 className="font-bold text-[1.6rem] mb-5">Edit Todos</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <article>
                    <input
                        value={storeEdit}
                        onChange={getIdValue}
                        type="text"
                        className="w-full px-4 py-2 outline-none rounded-md border-2"
                        placeholder="Edit todos"
                    />
                </article>
                <article className="flex gap-1">
                    <button
                        type="submit"
                        className="bg-blue-400 text-white p-2 w-full rounded-md"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => getUpdateEdit(false)}
                        className="bg-red-300 p-2 text-white w-full rounded-md"
                    >
                        Cancel
                    </button>
                </article>
            </form>
        </article>
    );
}
