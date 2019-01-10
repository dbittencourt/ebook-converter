import { Actions } from '@app/actions';
import { Field, Formik } from 'formik';
import * as React from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { Dispatch } from 'redux';

interface IBookData {
    author: string;
    title: string;
    year: number;
}

const customInputForm = ({field, form: {touched, errors}, ...props}) => {
    return (<div>
        <Input invalid={!!(touched[field.name] && errors[field.name])} {...field} {...props} />
        {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
    </div>);
};

class CreateBook extends React.Component<any, any>{
    public render() {
        return (
            <div>
                <Formik
                initialValues={{
                    author: '',
                    title: '',
                    year: ''
                }}
                onSubmit={this._handleSubmit} >
              <Form>
                  <FormGroup>
                      <Label for="author">Author</Label>
                      <Field name="author" type={'text'} component={customInputForm}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="title">Title</Label>
                      <Field name="title" type={'text'} component={customInputForm}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for="year">Year</Label>
                      <Field name="year" type={'text'} component={customInputForm}/>
                  </FormGroup>
                  <Button>Submit</Button>
              </Form>
            </Formik>
            </div>
        );
    }

    private _handleSubmit (e){
        e.preventDefault();
        const book: IBookData = {
            author: e.author,
            title: e.title,
            year: e.year
        };
    }
}

export default CreateBook;