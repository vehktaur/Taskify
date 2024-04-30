export interface Task {
  id: string;
  text: string;
  isComplete: boolean;
}

export interface Props {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  index: number;
}
