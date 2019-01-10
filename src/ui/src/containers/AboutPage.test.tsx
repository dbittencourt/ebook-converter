import { shallow } from 'enzyme';
import * as React from 'react';
import AboutPage from './AboutPage';

it('About Page tests', () => {
    const wrapper = shallow(<AboutPage />);
    expect(wrapper.find('h1').text()).toEqual('About');
});
