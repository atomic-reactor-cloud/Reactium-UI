import _ from 'underscore';
import cn from 'classnames';
import moment from 'moment';
import op from 'object-path';
import PropTypes from 'prop-types';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const noop = () => {};

const DaysInMonth = (d, expanded) => {
    const startDay = !expanded
        ? moment(d)
              .clone()
              .startOf('week')
        : moment(d)
              .clone()
              .startOf('month')
              .startOf('week');

    const endDay = !expanded
        ? moment(d)
              .clone()
              .endOf('week')
        : moment(d)
              .clone()
              .endOf('month')
              .endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];
    while (date.isBefore(endDay, 'day')) {
        calendar.push(
            Array(7)
                .fill(0)
                .map(() => date.add(1, 'day').clone()),
        );
    }

    return _.flatten(calendar);
};

const Day = ({
    children,
    className,
    checked,
    date,
    dateFormat,
    disabled,
    first,
    last,
    now,
    onChange,
}) =>
    disabled ? (
        <div className={cn({ [className]: true, disabled, now })}>
            <span className='text'>{children}</span>
        </div>
    ) : (
        <label
            className={cn({
                [className]: true,
                checked,
                'checked-first': first,
                'checked-last': last,
                now,
            })}>
            <input
                type='checkbox'
                value={date.format(dateFormat)}
                checked={checked}
                onChange={onChange}
            />
            <span className='bg' />
            <span className='text'>{children}</span>
        </label>
    );

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Calendar
 * -----------------------------------------------------------------------------
 */
let Calendar = ({ namespace, ...props }, ref) => {
    // Refs
    const containerRef = useRef();
    const stateRef = useRef({
        prevState: {},
        ...props,
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        // Get the previous state
        const prevState = { ...stateRef.current };

        // Update the stateRef
        stateRef.current = {
            ...prevState,
            ...newState,
            prevState,
        };

        // Trigger useEffect()
        setNewState(stateRef.current);
    };

    const _ns = str => `${namespace}-${str}`;

    const _onCheckToggle = e => {
        let { dateFormat, selected = [] } = stateRef.current;
        const { checked, value } = e.target;

        if (checked === true) {
            selected.push(value);
        } else {
            selected = _.without(selected, value);
        }

        selected.sort();

        setState({ selected }, '_onCheckToggle()');
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
    }));

    // Side Effects
    useEffect(() => setState(props), Object.values(props));

    const renderDays = () => {
        const {
            date,
            dateFormat,
            maxDate,
            minDate,
            selected = [],
        } = stateRef.current;
        const days = DaysInMonth(date, true);
        const today = moment().format('L');

        return (
            <div className={_ns('days')}>
                {days.map((day, i) => {
                    let disabled = false;
                    disabled =
                        minDate && day.isBefore(minDate) ? true : disabled;
                    disabled =
                        maxDate && day.isAfter(maxDate) ? true : disabled;

                    const idx = selected.indexOf(day.format(dateFormat));
                    const k = `${_ns('day')}-${day.format('YYYY-MM-DD')}-${i}`;
                    const checked = selected.includes(day.format(dateFormat));
                    const now = today === day.format('L');
                    const first = idx === 0;
                    const last = idx === selected.length - 1;

                    const dayProps = {
                        date: day,
                        dateFormat,
                        disabled,
                        checked,
                        className: _ns('day'),
                        children: day.format('D'),
                        first,
                        last,
                        now,
                        onChange: _onCheckToggle,
                    };

                    return <Day key={k} {...dayProps} />;
                })}
            </div>
        );
    };

    const renderHeading = () => {
        const { date, headingFormat } = stateRef.current;
        const color = Button.ENUMS.COLOR.CLEAR;
        const heading = moment(date).format(headingFormat);
        const isize = 14;
        const size = Button.ENUMS.SIZE.XS;

        return (
            <div className={_ns('heading')}>
                <Button color={color} size={size}>
                    <Feather.ChevronLeft width={isize} height={isize} />
                </Button>
                <Button
                    readOnly
                    size={size}
                    color={color}
                    className='flex-grow'>
                    {heading}
                </Button>
                <Button color={color} size={size}>
                    <Feather.ChevronRight width={isize} height={isize} />
                </Button>
            </div>
        );
    };

    const renderLabels = () => {
        const { labelFormat, labels } = stateRef.current;

        return !Array.isArray(labels) ? null : (
            <div className={_ns('labels')}>
                {labels.map(label => (
                    <div
                        key={`${_ns('labels')}-label-${label}-${Date.now}`}
                        className={_ns('label')}>
                        {labelFormat(label)}
                    </div>
                ))}
            </div>
        );
    };

    const render = () => {
        const { className } = stateRef.current;
        const cname = cn({
            [namespace]: !!namespace,
            [className]: !!className,
        });

        return (
            <div ref={containerRef} className={cname}>
                {renderHeading()}
                {renderLabels()}
                {renderDays()}
            </div>
        );
    };

    return render();
};

Calendar = forwardRef(Calendar);

Calendar.propTypes = {
    className: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    dateFormat: PropTypes.string,
    headingFormat: PropTypes.string,
    labeFormat: PropTypes.func,
    labels: PropTypes.array,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    namespace: PropTypes.string,
};

Calendar.defaultProps = {
    date: new Date(),
    dateFormat: 'L',
    headingFormat: 'MMMM YYYY',
    labelFormat: label => label,
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    namespace: 'ar-datepicker-calendar',
    selected: ['06/15/2019'],
};

export { Calendar as default };
