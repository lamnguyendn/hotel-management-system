import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ReactDatePickerWithTestingLibrary } from './ReactDatePickerWithTestingLibrary';

afterEach(cleanup);

describe('<MyComponent/>', () => {
  it('should render correctly', () => {
    const component = render(<ReactDatePickerWithTestingLibrary />);
    expect(component).toBeTruthy();
  });

  it('should allow me to enter text into the text box', async () => {
    const { container, getByText } = render(<ReactDatePickerWithTestingLibrary />);
    const label = getByText('From:');
    expect(container).toMatchSnapshot();
    const textbox = container.querySelector('input[id="date-picker"]');
    // fireEvent.click(label);
    fireEvent.change(textbox as HTMLElement, { target: { value: '2022/01/01' } });
    // userEvent.type(textbox as HTMLElement, '2022/01/01');
    // fireEvent.blur(textbox as HTMLElement);
    fireEvent.click(label);

    await waitFor(() => expect((textbox as HTMLElement).getAttribute('value')).toBeEmpty());
  });
});
