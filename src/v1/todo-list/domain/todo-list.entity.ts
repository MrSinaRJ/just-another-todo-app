export class TodoList {
  constructor(
    public readonly _id: string,
    public title: string,
    public readonly userId: string,
    public todoItems: string[] = [],
  ) {}

  // Domain logic to add, remove, or reorder todoItems
  public addTodoItem(todoItemId: string): void {
    this.todoItems.push(todoItemId);
  }

  public removeTodoItem(todoItemId: string): void {
    this.todoItems = this.todoItems.filter((_id) => _id !== todoItemId);
  }
}
