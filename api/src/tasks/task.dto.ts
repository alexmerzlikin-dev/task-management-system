export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface CreateTaskDto {
  userId: number;
  title: string;
  status: TaskStatus;
  description: string;
  createdAt: Date;
}

export interface UpdateTaskDto {
  id: number;
  title: string;
  status: TaskStatus;
  description: string;
}
