import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    public readonly _id: string,
    public readonly username: string,
    private password: string,
    public readonly todoLists: string[] = [],
  ) {}

  // password validation
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // hash password before saving (not a problem with double hashing)
  public async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
}
