/* eslint-disable react/destructuring-assignment */
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  onChange: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  timeString: PropTypes.string,
  timeInputLabel: PropTypes.string,
  customTimeInput: PropTypes.element,
};

export default class inputTime extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      time: this.props.timeString,
    };
  }

  static getDerivedStateFromProps(props: { timeString: any }, state: { time: never }) {
    if (props.timeString !== state.time) {
      return {
        time: props.timeString,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  onTimeChange = (time: { split: (arg0: string) => number[] }) => {
    this.setState({ time });
    const date = new Date();
    date.setHours(time.split(':')[0]);
    date.setMinutes(time.split(':')[1]);
    this.props.onChange(date);
  };

  renderTimeInput = () => {
    const { time } = this.state;
    const { date, timeString, customTimeInput } = this.props;

    if (customTimeInput) {
      return React.cloneElement(customTimeInput, {
        date,
        value: time,
        onChange: this.onTimeChange,
      });
    }

    return (
      <input
        type="time"
        className="react-datepicker-time__input"
        placeholder="Time"
        name="time-input"
        required
        value={time}
        onChange={(ev) => {
          this.onTimeChange(ev.target.value || timeString);
        }}
      />
    );
  };

  render() {
    return (
      <div className="react-datepicker__input-time-container">
        <div className="react-datepicker-time__caption">{this.props.timeInputLabel}</div>
        <div className="react-datepicker-time__input-container">
          <div className="react-datepicker-time__input">{this.renderTimeInput()}</div>
        </div>
      </div>
    );
  }
}
