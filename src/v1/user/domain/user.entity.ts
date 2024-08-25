export class User {
  constructor(
    public readonly _id: string,
    public readonly username: string,
    private password: string,
    public readonly todoLists: string[] = [],
  ) {}

  // password validation
  public validatePassword(password: string): boolean {
    return this.password === password;
  }
}
