import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const validationFileUpload = (value: FileList): boolean => {
  console.log('value: ', value);

  if (value.item(0)) {
    return true;
  }
  return false;
};

export const ReactHookFormTestInputFile = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm();
  const [fileName, setFileName] = useState('');

  function handleFileUpload(data: any) {
    setFileName(data.upload[0].name);
  }

  const [inputFileComponent, setInputFileComponent] = useState<JSX.Element>();

  useEffect(() => {
    //
    setTimeout(() => {
      setInputFileComponent(
        <label htmlFor="upload">
          Upload File
          <input
            name="upload"
            id="upload"
            type="file"
            ref={register({
              validate: validationFileUpload,
            })}
          />
        </label>
      );
    }, 2500);
  }, [register]);

  return (
    <form onSubmit={handleSubmit(handleFileUpload)}>
      {errors.upload && errors.upload.type === 'required' && <div>file missing</div>}

      {fileName && <div>Uploaded file name is {fileName}</div>}

      {inputFileComponent}

      <button type="submit">submit</button>
    </form>
  );
};
