import CreateCollection from "@/CreateCollection";

import ShowCollections from "@/ShowCollections";
import useStoreTodoList from "@/useStoreTodoList ";

// const todoList = [
//     {
//         status: "notStarted",
//         bgColor: "bg-started",
//         dotColor: "text-dotStarted",
//         mainBgColor: "bg-mainStarted",
//         title: "Not Started",
//         tasks: [],
//     },
//     {
//         status: "inProgress",
//         bgColor: "bg-progress",
//         dotColor: "text-dotProgress",
//         mainBgColor: "bg-mainProgress",
//         title: "In Progress",
//         tasks: [],
//     },
//     {
//         status: "review",
//         title: "Review",
//         bgColor: "bg-review",
//         dotColor: "text-dotReview",
//         mainBgColor: "bg-mainReview",
//         tasks: [],
//     },
//     {
//         status: "done",
//         title: "Done",
//         bgColor: "bg-done",
//         dotColor: "text-dotDone",
//         mainBgColor: "bg-mainDone",
//         tasks: [],
//     },
// ];

const TaskManager = () => {
    const { todoList } = useStoreTodoList();

    return (
        <div className=" overflow-x-scroll ">
            <div className="flex gap-4 p-2 h-full">
                {todoList.map((item, index) => (
                    <div
                        key={index}
                        className="p-2 w-full min-w-[70%] h-full md:min-w-fit rounded-sm flex flex-col items-center gap-8">
                        <CreateCollection
                            title={item.title}
                            status={item.status}
                            bgColor={item.bgColor}
                            dotColor={item.dotColor}
                            mainBgColor={item.mainBgColor}
                            index={index}
                        />
                    </div>
                ))}
            </div>
            {todoList.map((item, index) => (
                <ShowCollections key={index} tasksIndex={index} tasksCollection={item} />
            ))}
        </div>
    );
};

export default TaskManager;
