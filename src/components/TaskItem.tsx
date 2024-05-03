import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Props } from '../interfaces';
import { Draggable } from '@hello-pangea/dnd';
import toast from 'react-hot-toast';

const TaskItem = ({ task, setTasks, index }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.text);

  const taskInput = useRef<HTMLInputElement>(null);

  const editTask = (isComplete: boolean) => {
    if (!isComplete) {
    }
    setIsEditable((prevValue) => !prevValue);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const completeTask = (id: string) => {
    if (isEditable) {
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
    if (!task.isComplete) {
      toast.success('Task completed');
    }
  };

  const handleEdit = (
    event: ChangeEvent<HTMLFormElement>,
    text: string,
    id: string
  ) => {
    event.preventDefault();
    if (text.trim() === '') {
      toast.error('Task field cannot be empty');
      setEditText(task.text);
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((currentTask) =>
        currentTask.id === id ? { ...currentTask, text: text } : currentTask
      )
    );
    if (text !== task.text) {
      toast.success('Task edited successfully');
    }
  };

  useEffect(() => taskInput.current?.focus(), [isEditable]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provider) => (
        <form
          ref={provider.innerRef}
          {...provider.dragHandleProps}
          {...provider.draggableProps}
          onSubmit={(event: ChangeEvent<HTMLFormElement>) =>
            handleEdit(event, editText, task.id)
          }
          className={`flex gap-5 w-full bg-winter-400 text-winter-100 ${
            isEditable ? 'p-2' : 'p-3'
          } rounded-md ring-1 ring-summer-200`}
        >
          {isEditable ? (
            <input
              className="bg-white text-slate-900 flex-1 rounded-sm p-1 outline-none"
              type="text"
              value={editText}
              ref={taskInput}
              onChange={(event) => setEditText(event.target.value)}
            />
          ) : (
            <div className={`flex-1 ${task.isComplete && 'line-through'}`}>
              {task.text}
            </div>
          )}
          <div className={'flex items-center gap-1'}>
            <button onClick={() => editTask(task.isComplete)}>
              <svg
                id="Layer_1"
                className="size-5 fill-winter-100"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 122.88 112.04"
              >
                <defs>
                  <style>.cls-1{'fill-rule:evenodd;'}</style>
                </defs>
                <title>writing</title>
                <path
                  className="cls-1"
                  d="M109.28,19.61l12.21,9.88a3.77,3.77,0,0,1,.56,5.29l-5.46,6.75L98.53,26.93,104,20.17a3.79,3.79,0,0,1,5.29-.56ZM21.07,30.81a3.18,3.18,0,0,1,0-6.36H74.12a3.18,3.18,0,0,1,0,6.36ZM9.49,0H85.71A9.53,9.53,0,0,1,95.2,9.49v5.63l-4.48,5.53a9.81,9.81,0,0,0-1.18,1.85c-.24.19-.48.4-.71.62V9.49a3.14,3.14,0,0,0-3.12-3.13H9.49A3.14,3.14,0,0,0,6.36,9.49v93.06a3.16,3.16,0,0,0,.92,2.21,3.11,3.11,0,0,0,2.21.92H85.71a3.12,3.12,0,0,0,3.12-3.13V88.2l1.91-.81a10,10,0,0,0,4.34-3.13l.12-.14v18.43A9.54,9.54,0,0,1,85.71,112H9.49A9.51,9.51,0,0,1,0,102.55V9.49A9.53,9.53,0,0,1,9.49,0ZM21.07,87.6a3.19,3.19,0,0,1,0-6.37H56.19a37.1,37.1,0,0,0-.3,6.37Zm0-18.93a3.19,3.19,0,0,1,0-6.37H59.22l0,.27-1.05,6.1Zm0-18.93a3.18,3.18,0,0,1,0-6.36H72.44l-5.11,6.36ZM87.25,78,74.43,83.47c-9.35,3.47-8.93,5.43-8-3.85L69.24,63.4h0l0,0,26.56-33,18,14.6L87.27,78ZM72.31,65.89l11.86,9.59-8.42,3.6c-6.6,2.83-6.42,4.23-5.27-2.53l1.83-10.66Z"
                />
              </svg>
            </button>
            <button onClick={() => deleteTask(task.id)}>
              <svg
                id="Layer_1"
                data-name="Layer 1"
                className="size-5 fill-winter-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 110.61 122.88"
              >
                <title>trash</title>
                <path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" />
              </svg>
            </button>
            <button onClick={() => completeTask(task.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 472.37"
                className="size-5 fill-winter-100"
              >
                <title>done</title>
                <path
                  fill-rule="nonzero"
                  d="M145.33 172.6l57.21-.75c2.76-.04 5.33.74 7.51 2.1 11.85 6.86 23.04 14.67 33.45 23.48 5.86 4.97 11.53 10.28 16.99 15.96 19.67-30.56 43.04-61.58 67.52-90.78 31.9-38.04 65.91-73.2 96.22-100.37 2.65-2.37 5.97-3.53 9.26-3.53l44.22-.07c7.7 0 13.95 6.25 13.95 13.95 0 3.86-1.56 7.34-4.09 9.87-40.58 45.12-82.2 96.78-119.92 149.72-34.92 49.02-66.55 99.17-90.93 146.26-3.52 6.83-11.92 9.51-18.75 5.99a13.796 13.796 0 01-6.23-6.5c-13.36-28.57-29.28-54.8-48.23-78.2-18.93-23.37-41-44.09-66.69-61.72-6.35-4.33-7.98-13-3.65-19.35 2.82-4.14 7.49-6.27 12.16-6.06zM62.55 0h270.16c-19.14 19.72-35.72 38.96-49.97 57.45H62.55c-1.42 0-2.71.57-3.64 1.46a5.27 5.27 0 00-1.46 3.64v347.26c0 1.34.6 2.6 1.54 3.55.96.95 2.23 1.56 3.56 1.56h386.89c1.29 0 2.55-.62 3.52-1.58.97-.97 1.59-2.24 1.59-3.53V213.59c20.82-8.61 40.4-17.48 57.45-25.81v222.03c0 17.14-7.11 32.82-18.43 44.14-11.33 11.33-26.99 18.42-44.13 18.42H62.55c-17.13 0-32.83-7.06-44.17-18.4C7.08 442.67 0 427.03 0 409.81V62.55C0 45.4 7.04 29.78 18.35 18.46l.11-.11C29.78 7.04 45.4 0 62.55 0z"
                />
              </svg>
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TaskItem;
