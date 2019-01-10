import { createAction } from "@app/tools/action-helpers";
import { ActionsUnion } from '@app/tools/types';

export const ADD_BOOK = '[book] ADD_BOOK';

export const Actions = {
    addBook: (book: object) => createAction(ADD_BOOK, book)
};

export type Actions = ActionsUnion<typeof Actions>;