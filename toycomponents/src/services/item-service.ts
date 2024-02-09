import create from "./http-service";

export interface Item {
    id: number;
    name: string;
}

export default create("/list");
