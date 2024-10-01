export interface ITodoItem{
    id: number;
    task: string;
    done: boolean;
}

export interface ITodoList{
    todos: ITodoItem[]
}

