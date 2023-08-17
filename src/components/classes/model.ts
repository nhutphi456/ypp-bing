export class Model<T> {
  private data: T;
  constructor() {
  }
  getData() {
    return this.data;
  }
  setData(data: T) {
    this.data = { ...this.data, ...data };
  }
}
