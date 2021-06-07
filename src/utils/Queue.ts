import IQueue from './models/IQueue'

export default class Queue implements IQueue {
  private queue: Array<number> = [];
  private offset = 0;

  public getLength() {
    return (this.queue.length - this.offset);
  }

  public isEmpty() {
    return (this.queue.length == 0);
  }

  public enqueue(item: number) {
    this.queue.push(item);
  }

  public dequeue() {
    if (this.queue.length == 0) return undefined;
    const item = this.queue[this.offset];

    if (++this.offset * 2 >= this.queue.length) {
      this.queue = this.queue.slice(this.offset);
      this.offset = 0;
    }
    return item
  }

  public peek() {
    return (this.queue.length > 0 ? this.queue[this.offset] : undefined);
  }
}
