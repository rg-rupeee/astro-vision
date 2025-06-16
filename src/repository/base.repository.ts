export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

export interface IRead<T> {
  find(item: Partial<T>): Promise<T[]>;
  findOne(item: Partial<T>): Promise<T | null>;
  findById(id: string): Promise<T | null>;
}

export interface IBaseRepository<T> extends IWrite<T>, IRead<T> {}
