/// <reference path='firebase.d.ts'/>

export declare class AngularFire {
    asArray(): FirebaseArray;
}

export interface FirebaseArray {
    getItem(recOrIndex: any): any
    getChild(recOrIndex: any): any;
    add(newData: any): void;
    remove(recOrIndex: any): void;
    save(recOrIndex: any): void;
    keyify(snap: any): any;
    created(snap: any): void;
    moved(snap: any): void;
    updated(snap: any): void;
    removed(snap: any): void;
    bulkUpdate(items: Object): void;
    spliceOut(key: any): void;
    indexFor(key: any): number;
    getRecord(key: any): any;
    list: any[];
}
