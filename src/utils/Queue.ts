import IQueue from './models/IQueue'

export default class Queue implements IQueue {
  private queue: Array<number> = [];
  private offset = 0;

  public getLength(): number {
    return (this.queue.length - this.offset);
  }

  public isEmpty(): boolean {
    return (this.queue.length == 0);
  }

  public enqueue(item: number): void {
    this.queue.push(item);
  }

  public dequeue(): number | undefined {
    if (this.queue.length == 0) return undefined;
    const item = this.queue[this.offset];

    if (++this.offset * 2 >= this.queue.length) {
      this.queue = this.queue.slice(this.offset);
      this.offset = 0;
    }
    return item
  }

  public peek(): number | undefined {
    return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
  }
}
