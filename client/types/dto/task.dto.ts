export interface TaskCreateDto {
  title: string
  description: string
  createdAt: Date
  status: "TODO" | "IN_PROGRESS" | "DONE"
}

export interface TaskUpdateDto {
  id: number
  title?: string
  description?: string
  status?: "TODO" | "IN_PROGRESS" | "DONE"
}
