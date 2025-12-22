import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

// Custom CSS to override default styles for dark theme
const datePickerStyles = `
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker {
    background-color: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-family: inherit;
    color: white;
  }
  .react-datepicker__header {
    background-color: #2a2a2a;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    color: white;
  }
  .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
    color: #ccc;
  }
  .react-datepicker__day:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
    background-color: #00eaff !important;
    color: #000 !important;
    font-weight: bold;
  }
  .react-datepicker__navigation-icon::before {
    border-color: #ccc;
  }
`;

const CustomInput = forwardRef(({ value, onClick, placeholder, className }, ref) => (
    <div
        onClick={onClick}
        ref={ref}
        className={`cursor-pointer flex items-center gap-3 w-full ${className}`}
    >
        <Calendar className="text-gray-500 h-5 w-5 flex-shrink-0" />
        <span className={`block w-full truncate ${!value ? 'text-gray-400' : 'text-white'}`}>
            {value || placeholder}
        </span>
        <style>{datePickerStyles}</style>
    </div>
));

const CustomDatePicker = ({ selected, onChange, placeholder, minDate, className }) => {
    return (
        <DatePicker
            selected={selected}
            onChange={onChange}
            customInput={<CustomInput placeholder={placeholder} className={className} />}
            dateFormat="MMM dd, yyyy"
            minDate={minDate || new Date()}
            placeholderText={placeholder}
            wrapperClassName="w-full"
        />
    );
};

export default CustomDatePicker;
