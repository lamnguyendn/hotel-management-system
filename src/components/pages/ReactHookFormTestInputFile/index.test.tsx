import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { ReactHookFormTestInputFile } from './ReactHookFormTestInputFile';

jest.useFakeTimers();

test('Uploading file should show its name', async () => {
  const { getByLabelText, getByText } = render(<ReactHookFormTestInputFile />);

  await waitFor(() => {
    expect(getByLabelText('Upload File')).toBeInTheDocument();
  });
  const inputEl = getByLabelText('Upload File');

  const file = new File(['dummy content'], 'filename.png', {
    type: 'image/png',
  });

  const fileList = { 0: file, 1: file, length: 2, item: () => file };

  Object.defineProperty(inputEl, 'files', { value: fileList });

  fireEvent.change(inputEl);

  fireEvent.click(getByText(/submit/i));

  await waitFor(() => expect(getByText('Uploaded file name is filename.png')).toBeInTheDocument());
});
