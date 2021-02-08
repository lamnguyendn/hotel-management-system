import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 1);

const Input: React.FC<any> = (props) => <input {...props} />;

export const ReactDatePickerWithTestingLibrary = (): JSX.Element => {
  const [value, setValue] = useState(new Date());

  function handleChange(value: any) {
    //
    setValue(value);
  }

  return (
    <div className="App">
      <label htmlFor="from">From:</label>
      <DatePicker
        id="date-picker"
        onChange={handleChange}
        maxDate={maxDate}
        selected={value}
        strictParsing
        dateFormat="yyyy/MM/dd"
        // customInput={(props: any) => <Input {...props} data-testid="date-picker" />}
      />
    </div>
  );
};
