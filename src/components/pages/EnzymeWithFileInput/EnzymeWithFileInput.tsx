import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FileChooserProps } from './types';

const FileChooser = (props: FileChooserProps): JSX.Element => {
  const refInput = useRef(document.createElement('input'));
  const { fileName, changeValue } = props;

  useEffect(() => {
    //
    console.log('trigger useEffect');

    if (fileName) {
      refInput.current.value = fileName;
    }
  }, [fileName]);

  return (
    <>
      <input type="text" ref={refInput} name="input-text" />
      <label htmlFor="input-file">Choose file</label>
      <input type="file" hidden id="input-file" onChange={changeValue} name="input-file" />
    </>
  );
};

export const EnzymeWithFileInput = (): JSX.Element => {
  const [value, setValue] = useState<string>();

  const changeValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    //
    console.log('trigger changeValue');
    const { files } = event.target;
    if (files && files.length > 0) {
      setValue(files.item(0)?.name);
    }
  }, []);

  return <FileChooser fileName={value} changeValue={changeValue} />;
};
