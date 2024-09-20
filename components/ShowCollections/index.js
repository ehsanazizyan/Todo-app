import Button from "@/Button";
import Modal from "@/Modal";
import ShowCollectionItems from "@/ShowCollectionItems";
import useStoreTodoList from "@/useStoreTodoList ";
import { Trash } from "lucide-react";

const ShowCollections = ({ tasksCollection, setTodoList, tasksIndex, scrollLeft }) => {
    const { todoList, removeCollection } = useStoreTodoList();

    return (
        <div className="flex flex-col px-4">
            {tasksCollection.tasks.map((task, index) => (
                <div key={task.id} className={` mt-16 flex flex-col`}>
                    <div className={`flex items-center gap-4 `}>
                        <span className="font-semibold text-lg">{task.collectionName}</span>
                        {tasksCollection.tasks.map(
                            (item, index) =>
                                item.collectionName === task.collectionName && (
                                    <Button
                                        key={index}
                                        className="hover:bg-inherit"
                                        isIconButton={true}
                                        label={<Trash size={16} />}
                                        size="tiny"
                                        tooltip={`Delete "${task.collectionName}" Collection`}
                                        onClick={() => removeCollection(tasksIndex, index)}
                                    />
                                )
                        )}
                    </div>
                    <div className="flex gap-6 w-full">
                        {todoList.map((item, index) => (
                            <div
                                key={index}
                                className={`${item.mainBgColor} w-full min-w-[70%] md:min-w-fit min-h-10`}>
                                <ShowCollectionItems
                                    tasksCollection={tasksCollection}
                                    collectionName={task.collectionName}
                                    index={index}
                                    currentStatusName={item.status}
                                    setTodoList={setTodoList}
                                    todoList={todoList}
                                    collectionId={task.id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ShowCollections;
