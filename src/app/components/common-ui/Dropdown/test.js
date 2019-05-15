import React from 'react';
import Dropdown from './index';
import { shallow } from 'reactium-core/enzyme';

test('<Dropdown />', () => {
    const component = shallow(<Dropdown />);

    expect(component.html().length).toBeGreaterThan(0);
});
