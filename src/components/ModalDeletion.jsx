import "@/components/StyleModalDeletion.css";

export default function DeleteModal({ isOpen, isClose, isConfirm, getId }) {
    if (!isOpen) return;

    return (
        <article className="modalBackground fixed gap-5 p-7 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center h-60 z-50">
            <h1 className="text-[1.5rem] font-bold">Delete Todos</h1>
            <article className="flex">
                <p className="font-bold text-[1.1em] text-center w-80">
                    You`re going to delete the "Todos" list. Are you sure?
                </p>
            </article>
            <article className="flex justify-center items-center w-full">
                <button
                    onClick={() =>
                        isConfirm((mainTodos) => {
                            return mainTodos.filter((items) => {
                                isClose(false);
                                return items.id !== Number(getId);
                            });
                        })
                    }
                    className="w-full p-[0.5rem] rounded-md text-red-400 hover:bg-red-300 hover:text-white font-bold transition ease-out duration-300 delay-100 "
                >
                    Yes, Delete!
                </button>
                <button
                    onClick={() => isClose(false)}
                    className="w-full p-[0.5rem] rounded-md text-blue-400 hover:bg-blue-300 hover:text-white font-bold transition ease-out duration-300 delay-100"
                >
                    No, Keep it.
                </button>
            </article>
        </article>
    );
}
