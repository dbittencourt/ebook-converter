import { string } from 'prop-types';

export interface IBook {
    id: string,
    title: string,
    author: string,
    year: number,
    format: string
};

export type ApiResponse = Record<string, any>;

export interface IBookState {
    readonly loading; boolean,
    readonly data: IBook[],
    readonly errors?: string
};