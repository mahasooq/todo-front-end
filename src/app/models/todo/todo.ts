export class Todo {
    public _id: string;
    public title: string;
    public completed: boolean;
}

export class TodoForCreation {
    constructor(
        public title: string,
        public completed: boolean
        ) { }
}