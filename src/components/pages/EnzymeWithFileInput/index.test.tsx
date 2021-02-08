import { fireEvent, render, waitFor } from '@testing-library/react';
import { expect as expectEnzyme } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { EnzymeWithFileInput } from './EnzymeWithFileInput';

jest.useFakeTimers();

const INPUT_FILE_ATTR = '[name="input-file"]';
const INPUT_TEXT_ATTR = '[name="input-text"]';
const FILE_NAME_VALUE = 'fileName.txt';

test('Uploading file should show its name with enzyme', async () => {
  //
  const wrapper = mount(<EnzymeWithFileInput />);
  await waitFor(() => expectEnzyme(wrapper.find(INPUT_FILE_ATTR).exists()).to.equal(true));
  const file = new File(['123'], FILE_NAME_VALUE);

  const files: Omit<FileList, '[Symbol.iterator]'> = {
    0: file,
    length: 1,
    item: () => file,
  };

  wrapper.find(INPUT_FILE_ATTR).simulate('change', {
    target: {
      files,
    },
  });

  await waitFor(() => expectEnzyme(wrapper.find(INPUT_TEXT_ATTR).exists()).to.equal(true));

  const input = wrapper.find(INPUT_TEXT_ATTR).get(0);

  await waitFor(() => {
    expectEnzyme((input as any).ref.current.value).to.equal(FILE_NAME_VALUE);
  });
});

test('Uploading file should show its name with testing-react-library', async () => {
  //
  const { container } = render(<EnzymeWithFileInput />);
  await waitFor(() => expect(container.querySelector(INPUT_FILE_ATTR)).toBeInTheDocument());
  const file = new File(['123'], FILE_NAME_VALUE);

  const files: Omit<FileList, '[Symbol.iterator]'> = {
    0: file,
    length: 1,
    item: () => file,
  };

  const inputFile = container.querySelector(INPUT_FILE_ATTR) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputFile, { target: { files } });
  });

  await waitFor(() => expect(container.querySelector(INPUT_TEXT_ATTR)).toBeInTheDocument());

  const input = container.querySelector(INPUT_TEXT_ATTR) as HTMLInputElement;

  await waitFor(() => {
    expect(input.value).toEqual(FILE_NAME_VALUE);
  });
});
