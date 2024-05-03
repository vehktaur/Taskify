import { FormEvent, useEffect, useRef, useState } from 'react';
import { Task } from './interfaces';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import TaskItem from './components/TaskItem';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

const App: React.FC = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    id: nanoid(),
    text: '',
    isComplete: false
  });
  const addTaskInput = useRef<HTMLInputElement>(null);

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (task.text.trim() === '') {
      toast.error('Task field cannot be empty');
      return;
    }
    setActiveTasks((allTasks) => [...allTasks, task]);
    setTask({ ...task, text: '', id: nanoid() });
    toast.success('Task added successfully')
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    let task,
      newActiveTasks: Task[] = activeTasks,
      newCompleteTasks: Task[] = completedTasks;

    if (
      !destination ||
      (source.index === destination.index &&
        source.droppableId === destination.droppableId)
    ) {
      return;
    }

    if (source.droppableId === 'activeTasks') {
      task = newActiveTasks[source.index];
      newActiveTasks.splice(source.index, 1);
    } else {
      task = newCompleteTasks[source.index];
      newCompleteTasks.splice(source.index, 1);
    }
    if (destination.droppableId === 'activeTasks') {
      newActiveTasks.splice(destination.index, 0, task);
    } else {
      newCompleteTasks.splice(destination.index, 0, task);
    }

    setActiveTasks(newActiveTasks);
    setCompletedTasks(newCompleteTasks);
  };

  useEffect(() => addTaskInput.current?.focus(), []);

  return (
    <div className="bg-summer-100 text-slate-900">
      <div className="container px-3 mx-auto  min-h-screen">
        <header className="py-5">
          <h1 className="text-3xl text-slate-950 font-semibold text-center">
            TASKIFY
          </h1>
        </header>
        <main className="max-w-6xl mx-auto">
          <Toaster />
          <form onSubmit={addTask}>
            <div className="relative mx-auto">
              <input
                className="block rounded-full p-4 outline-none w-full mx-auto text-lg shadow-sm ring-1 ring-winter-200"
                type="text"
                placeholder="Enter a task"
                value={task.text}
                ref={addTaskInput}
                onChange={(event) =>
                  setTask({ ...task, text: event.target.value })
                }
              />
              <input
                className="absolute rounded-full font-semibold text-white text-xl p-2 bg-winter-300 hover:bg-slate-500 cursor-pointer right-3 top-[50%] translate-y-[-50%] transition-all active:scale-95"
                type="submit"
                value="GO"
              />
            </div>
          </form>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="mx-auto mt-5 grid sm:grid-cols-2 gap-4 items-start">
              <div className="bg-winter-200 rounded-md">
                <h2 className="text-xl text-white p-3">Active Tasks</h2>
                <Droppable droppableId="activeTasks">
                  {(provided) => (
                    <div
                      className={`space-y-2 ${activeTasks.length > 0 && 'p-3'}`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {activeTasks.map((task, index) => (
                        <TaskItem
                          index={index}
                          key={task.id}
                          task={task}
                          setTasks={setActiveTasks}
                        />
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <div className="bg-summer-400 rounded-md">
                <h2 className="text-xl text-white p-3">Completed Tasks</h2>

                <Droppable droppableId="completedTasks">
                  {(provided) => (
                    <div
                      className={`space-y-2 ${
                        completedTasks.length > 0 && 'p-3'
                      }`}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {completedTasks.map((task, index) => (
                        <TaskItem
                          index={index}
                          key={task.id}
                          task={task}
                          setTasks={setCompletedTasks}
                        />
                      ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </main>
      </div>
    </div>
  );
};

export default App;
