export class TodoItem {
  constructor(
    public readonly _id: string,
    public title: string,
    public description: string,
    public priority: number,
    public readonly todoListId: string,
  ) {}

  // update todo item
  public updateInfo(title: string, description: string, priority: number) {
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}
