import { shallow } from 'enzyme';
import * as React from 'react';
import HomePage from './HomePage';

it('Home Page tests', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('h1').text()).toEqual('Home');
});
