import * as React from 'react';
import { Dispatch } from 'redux';
import CreateBookForm from '../components/Book/CreateBookForm';

class BookPage extends React.Component<{}, {}>{
    public render() {
        return (
            // Property name should be "onSubmit", by default
            // The redux-form "handleSubmit" method will invoke "onSubmit", by default
            <CreateBookForm />
        );
    }

    // redux-form
    // SubmitHandler<FormData extends DataShape, P, S>
    private save(dispatch: Dispatch<any>) {
        // tslint:disable-next-line:no-console
        console.log('BookPage.save');
    }
}

export default BookPage;