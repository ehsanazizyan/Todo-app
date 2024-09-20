import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useStoreTodoList = create(
    persist(
        (set, get) => ({
            todoList: [
                {
                    status: "notStarted",
                    bgColor: "bg-started",
                    dotColor: "text-dotStarted",
                    mainBgColor: "bg-mainStarted",
                    title: "Not Started",
                    tasks: [],
                },
                {
                    status: "inProgress",
                    bgColor: "bg-progress",
                    dotColor: "text-dotProgress",
                    mainBgColor: "bg-mainProgress",
                    title: "In Progress",
                    tasks: [],
                },
                {
                    status: "review",
                    title: "Review",
                    bgColor: "bg-review",
                    dotColor: "text-dotReview",
                    mainBgColor: "bg-mainReview",
                    tasks: [],
                },
                {
                    status: "done",
                    title: "Done",
                    bgColor: "bg-done",
                    dotColor: "text-dotDone",
                    mainBgColor: "bg-mainDone",
                    tasks: [],
                },
            ],
            addCollection: (collectionIndex, newCollection) => {
                const todoList = get().todoList;
                const updatedTodoList = [...todoList];
                updatedTodoList[collectionIndex].tasks.push(newCollection);
                set({ todoList: updatedTodoList });
            },

            removeCollection: (collectionIndex, taskIndex) => {
                const todoList = get().todoList;
                const updatedTodoList = [...todoList];
                updatedTodoList[collectionIndex].tasks.splice(taskIndex, 1);
                set({ todoList: updatedTodoList });
            },

            addTask: (collectionIndex, tasksIndex, newTask) => {
                const todoList = get().todoList;
                const updatedTodoList = [...todoList];
                const newTaskItem =
                    updatedTodoList[collectionIndex].tasks[tasksIndex].collectionTasks;
                newTaskItem.push(newTask);
                set({ todoList: updatedTodoList });
            },
            removeTask: (collectionIndex, taskIndex, itemIndex) => {
                const todoList = get().todoList;
                const updatedTodoList = [...todoList];
                updatedTodoList[collectionIndex].tasks[taskIndex].collectionTasks.splice(
                    itemIndex,
                    1
                );
                set({ todoList: updatedTodoList });
            },
            editTask: (collectionIndex, taskIndex, itemIndex, newTask) => {
                const todoList = get().todoList;
                const updatedTodoList = [...todoList];
                updatedTodoList[collectionIndex].tasks[taskIndex].collectionTasks[itemIndex] =
                    newTask;

                set({ todoList: updatedTodoList });
            },
            todoStatusChange: (mainIndex, tasksIndex, itemIndex, newStatus) => {
                const todoList = get().todoList;
                const updatedTodoList = [...todoList];
                updatedTodoList[mainIndex].tasks[tasksIndex].collectionTasks[
                    itemIndex
                ].currentStatus = newStatus;
                set({ todoList: updatedTodoList });
            },
        }),
        {
            name: "todo-list",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useStoreTodoList;
