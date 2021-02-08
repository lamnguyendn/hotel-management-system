import update from 'immutability-helper';
import React, { useEffect } from 'react';

const DELIMITER_COMPONENT = '__';
const DELIMITER_SEQUENCE = '--';

const myData = [
  {
    noteOnRequestPage: '',
    requestArea: [
      {
        sessionId: 'sessionId--01',
        inputForm: [
          {
            formRequestId: 'sessionId--01__formRequestId--01',
            inputField: [
              {
                fieldRequestId: 'sessionId--01__formRequestId--01__fieldRequestId--01',
                value: 'value',
              },
              {
                fieldRequestId: 'sessionId--01__formRequestId--01__fieldRequestId--02',
                value: 'value',
              },
            ],
          },
        ],
      },
      {
        sessionId: 'sessionId--02',
        inputForm: [
          {
            formRequestId: 'sessionId--02__formRequestId--02',
            inputField: [
              {
                fieldRequestId: 'sessionId--02__formRequestId--02__fieldRequestId--01',
                value: 'value',
              },
              {
                fieldRequestId: 'sessionId--02__formRequestId--02__fieldRequestId--02',
                value: 'value',
              },
            ],
          },
        ],
      },
    ],
  },
];

export const ImmutabilityHelper: React.FC = () => {
  useEffect(() => {
    const newInputField = {
      fieldRequestId: 'sessionId--01__formRequestId--01__fieldRequestId--03',
      value: 'value',
    };
    const newData = update(myData, {
      0: { requestArea: { 0: { inputForm: { 0: { inputField: { $push: [newInputField] } } } } } },
    });
    console.log('newData: ', newData);
    console.log('myData: ', myData);
  }, []);

  return <></>;
};
