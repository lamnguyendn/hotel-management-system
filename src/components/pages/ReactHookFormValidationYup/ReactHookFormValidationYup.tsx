import update from 'immutability-helper';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './index.scss';

type InputType = {
  inputId: string;
  inputLabel: string;
  validation: {
    [key: string]: {
      message: string;
    };
  };
};

const generateNextId = (index: number): string => {
  return `inputId_${index + 1}`;
};

const inputData: InputType[] = [
  {
    inputId: 'inputId_001',
    inputLabel: 'input label 001',
    validation: { required: { message: 'message 1' } },
  },
  {
    inputId: 'inputId_002',
    inputLabel: 'input label 002',
    validation: { required: { message: 'message 2' } },
  },
  {
    inputId: 'inputId_003',
    inputLabel: 'input label 003',
    validation: { required: { message: 'message 3' } },
  },
];

const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

export const ReactHookFormValidationYup: React.FC = () => {
  const [inputDataState, setInputDataState] = useState<InputType[]>(inputData);

  const validationSchema = useMemo(() => {
    //
    const yupObject: Record<string, yup.StringSchema<string, unknown>> = {};
    inputDataState.forEach((input) => {
      yupObject[input.inputId] = yup.string().required('Required');
    });
    //
    return yup.object({
      ...yupObject,
    });
  }, [inputDataState]);

  // const resolver = useYupValidationResolver(validationSchema);
  const resolver = yupResolver(validationSchema);

  const { register, handleSubmit, errors } = useForm({ resolver });

  console.log('errors: ', errors);

  const onSubmit = useCallback((data: Record<string, string>) => {
    //
    console.log(data);
  }, []);

  const onClickAddInput = (input: InputType) => {
    //
    setInputDataState((prevState: InputType[]) => {
      //
      const cloneInput = { ...input };
      cloneInput.inputId = generateNextId(prevState.length);
      return update(prevState, { $push: [cloneInput] });
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" />
        {inputDataState.map((input) => {
          return (
            <Fragment key={input.inputId}>
              <div className="wrap-input">
                <label htmlFor={input.inputId}>{input.inputLabel}</label>
                <input type="text" id={input.inputId} name={input.inputId} ref={register} />
                <button type="button" onClick={() => onClickAddInput(input)}>
                  Add input
                </button>
              </div>
              <br />
            </Fragment>
          );
        })}
      </form>
    </>
  );
};
