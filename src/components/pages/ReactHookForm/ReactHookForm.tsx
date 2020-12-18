import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ReactHookForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    //
    console.log('register');
  }, [register]);

  useEffect(() => {
    //
    console.log('handleSubmit');
  }, [handleSubmit]);
  useEffect(() => {
    //
    console.log('errors');
  }, [errors]);

  const handleSubmitCb = useCallback((data: any) => {
    //
    console.log(data);
  }, []);

  //   console.log(watch('example')); // watch input value by passing the name of it

  return (
    <>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {/* register your input into the hook by invoking the "register" function */}
      <input name="example" defaultValue="test" ref={register} />

      {/* include validation with required or other standard HTML validation rules */}
      <input name="exampleRequired" ref={register({ required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      <button type="button" onClick={handleSubmit(handleSubmitCb)}>
        Submit
      </button>
      {/* <input type="submit" /> */}
      {/* </form> */}
    </>
  );
};
