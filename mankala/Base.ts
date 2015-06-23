///<reference path="Driver.ts"/>

namespace Base {
    export interface IList<T> {
        isHead: boolean;
        next: IList<T>;
        prev: IList<T>;
        data: T;
        insertAfter(entry: IList<T>): IList<T>;
        insertBefore(entry: IList<T>): IList<T>;
        empty(): boolean;
    }

    export class List<T> implements IList<T> {
        next: IList<T>;
        prev: IList<T>;

        constructor(public isHead: boolean, public data: T) { }

        empty(): boolean {
            return this.next == this;
        }

        insertAfter(entry: IList<T>): IList<T> {
            entry.next = this.next;
            entry.prev = this;
            this.next = entry;
            entry.next.prev = entry;
            return (entry);
        }

        insertBefore(entry: IList<T>): IList<T> {
            this.prev.next = entry;
            entry.next = this;
            entry.prev = this.prev;
            this.prev = entry;
            return entry;
        }
    }

    export function listMakeEntry<T>(data: T): IList<T> {
        var entry: List<T> = new List<T>(false, data);
        entry.prev = entry;
        entry.next = entry;
        return entry;
    }

    export function listMakeHead<T>(): IList<T> {
        var entry: List<T> = new List(true, null);
        entry.prev = entry;
        entry.next = entry;
        return entry;
    }

    export function listRemove<T>(entry: IList<T>): IList<T> {
        if (entry == null) {
            return null;
        }
        else if (entry.isHead) {
            return null;
        }
        else {
            entry.next.prev = entry.prev;
            entry.prev.next = entry.next;
        }
        return (entry);
    }
}
