/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import { cleanup } from '@testing-library/react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import InputTimeComponent from './inputTime';
import { ReactDatePickerWithTestingLibrary } from './ReactDatePickerWithTestingLibrary';

afterEach(cleanup);

describe('<MyComponent/>', () => {
  it('should allow me to enter text into the text box', async () => {
    const timeComponent = shallow(<ReactDatePickerWithTestingLibrary />);
    const input = timeComponent.find('[id="date-picker"]');
    input.simulate('change', new Date('2022/12/31'));
  });

  it('should trigger onChange event and set the value as last valid timeString if empty string is passed as time input value', () => {
    const timeComponent = shallow(<InputTimeComponent timeString="13:00" onChange={console.log} />);
    const input = timeComponent.find('input');
    input.simulate('change', { target: { value: '13:01' } });
    expect(timeComponent.state('time')).to.equal('13:00');
  });
});
