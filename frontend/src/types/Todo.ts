import {StatusType} from "./StatusType.ts";

export type Todo = {
    id: string,
    description: string,
    status: StatusType
}