export default interface IQueue {
    getLength: () => void;
    isEmpty: () => void;
    enqueue: (item: number) => void;
    dequeue: () => void;
    peek: () => void;
}