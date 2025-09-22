export class Entity {
  public id: string

  constructor() {
    this.id = this.createId()
  }

  private createId(): string {
    return Math.random().toString(36).substring(2, 10)
  }
}
