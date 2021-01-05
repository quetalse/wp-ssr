import React, {Fragment, forwardRef, useState} from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from "date-fns/locale/ru";

import './react-datepicker.scss';

registerLocale('ru', ru);

const AppDatePicker = ({label, mode, startDate, setStartDate}) => {

    const ref = React.createRef();
    // const [startDate, setStartDate] = useState(new Date());
    const inline = mode === 'inline';
    const CustomDateInput = forwardRef(({ onClick, value }, ref) => (
        <div>
            <label htmlFor="datePicker">Дата</label>
            <input id="datePicker"
                   className="datepicker"
                   onClick={(e) => {  e.preventDefault(); onClick() }}
                   ref={ref}
                   defaultValue={value}/>
        </div>
    ));
    const customInput = mode === 'popup' ? <CustomDateInput ref={ref}/> : false;

    return (
        <Fragment>
            {inline && <label>{label}</label>}
            <DatePicker
                style={{'margin': '0 auto'}}
                dateFormat="dd/MM/yyyy"
                locale="ru"
                selected={startDate}
                onChange={date => setStartDate(date)}
                closeOnScroll={true}
                popperPlacement="bottom"
                minDate={new Date()}
                customInput={customInput}
                inline={inline}
            />
        </Fragment>
    )
}

export default AppDatePicker;