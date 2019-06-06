import React from 'react';
import Tabs from './index';
import { shallow } from 'reactium-core/enzyme';

test('<Tabs />', () => {
    const component = shallow(<Tabs />);

    expect(component.html().length).toBeGreaterThan(0);
});
