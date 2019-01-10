import * as React from 'react';
import Auth from '../tools/Auth';

export default class Callback extends React.Component<any, any> {

  public render() {
    return (
      <p>Loading profile...</p>
    );
  }

  public async componentDidMount() {
     await Auth.handleAuthentication();
     this.props.history.replace('/');
  }
}