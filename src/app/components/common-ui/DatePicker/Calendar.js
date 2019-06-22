import _ from 'underscore';
import cn from 'classnames';
import moment from 'moment';
import op from 'object-path';
import PropTypes from 'prop-types';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';
import ENUMS from './enums';

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
    dayName,
    disabled,
    first,
    last,
    name,
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
                [dayName]: !!dayName,
                now,
            })}>
            <input
                name={name}
                type='checkbox'
                value={date.format(dateFormat)}
                checked={checked}
                onChange={onChange}
            />
            <span className='text'>{children}</span>
            <span className='bg' />
        </label>
    );

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Calendar
 * -----------------------------------------------------------------------------
 */
let Calendar = ({ namespace, ...props }, ref = {}) => {
    // Refs
    const containerRef = useRef();
    const stateRef = useRef({
        prevState: {},
        ...props,
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = (newState, caller) => {
        // Get the previous state
        const prevState = { ...stateRef.current };

        // Update the stateRef
        stateRef.current = {
            ...prevState,
            ...newState,
            prevState,
        };

        if (ENUMS.DEBUG) {
            console.log('setstate()', caller, stateRef.current);
        }

        // Trigger useEffect()
        setNewState(stateRef.current);
    };

    const _ns = str => `${namespace}-${str}`;

    const _onCheckToggle = e => {
        let { dateFormat, multiple, range, selected = [] } = stateRef.current;
        const { checked, value } = e.target;

        if (range && selected.length >= 2) {
            selected = [];
        }

        if (checked && !range && !multiple) {
            selected = [];
        }

        if (checked) {
            selected.push(value);
        } else {
            selected = _.without(selected, value);
        }

        selected.sort();

        setState({ selected }, '_onCheckToggle()');
    };

    const _next = (duration = 'months') => {
        let { date } = stateRef.current;
        date = moment(date).add(1, duration);
        setState({ date }, 'Calendar -> _next(' + duration + ')');

        onNext({ type: 'next', ...stateRef.current });
        onNav({ type: 'nav', ...stateRef.current });
    };

    const _prev = (duration = 'months') => {
        let { date, onPrev } = stateRef.current;
        date = moment(date).subtract(1, duration);
        setState({ date }, 'Calendar -> _prev(' + duration + ')');

        onPrev({ type: 'next', ...stateRef.current });
        onNav({ type: 'nav', ...stateRef.current });
    };

    const _today = () => {
        const date = moment();
        setState({ date }, 'Calendar -> _today()');
        onNav({ type: 'nav', ...stateRef.current });
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        setState,
        state,
        next: _next,
        prev: _prev,
    }));

    // Side Effects
    useEffect(
        () => setState(props, 'Calendar -> useEffect()'),
        Object.values(props),
    );

    useEffect(() => {
        const { onChange, selected } = state;
        onChange({ type: 'change', selected });
    }, [state.selected]);

    const renderDays = () => {
        const {
            date,
            dateFormat,
            maxDate,
            minDate,
            multiple,
            name,
            range,
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

                    const k = `${_ns('day')}-${day.format('YYYY-MM-DD')}-${i}`;
                    const now = today === day.format('L');
                    const idx = selected.indexOf(day.format(dateFormat));
                    const first = !multiple && idx === 0;
                    const last = !multiple && idx === selected.length - 1;

                    let checked = idx > -1;

                    if (range) {
                        if (!checked) {
                            let min = _.first(selected);
                            let max = _.last(selected);

                            min = min && moment(new Date(min));
                            max = max && moment(new Date(max));

                            if (min && !max) {
                                checked = day.isAfter(min);
                            }

                            if (!min && max) {
                                checked = day.isBefore(max);
                            }

                            if (min && max) {
                                checked = day.isAfter(min) && day.isBefore(max);
                            }
                        }
                    }

                    const dayProps = {
                        date: day,
                        dateFormat,
                        dayName: String(day.format('ddd')).toLowerCase(),
                        disabled,
                        checked,
                        className: _ns('day'),
                        children: day.format('D'),
                        first,
                        last: last && idx > -1,
                        name,
                        now,
                        onChange: _onCheckToggle,
                    };

                    return <Day key={k} {...dayProps} />;
                })}
            </div>
        );
    };

    const renderFooter = () => {
        const { date } = stateRef.current;
        const color = Button.ENUMS.COLOR.CLEAR;
        const isize = 14;
        const size = Button.ENUMS.SIZE.XS;

        return (
            <div className={_ns('footer')}>
                <Button
                    color={color}
                    size={size}
                    onClick={() => _prev('months')}>
                    <Feather.ChevronLeft width={isize} height={isize} />
                </Button>
                <Button
                    size={size}
                    color={color}
                    onClick={() => _today()}
                    className='flex-grow'>
                    Today
                </Button>
                <Button
                    color={color}
                    size={size}
                    onClick={() => _next('months')}>
                    <Feather.ChevronRight width={isize} height={isize} />
                </Button>
            </div>
        );
    };

    const renderHeader = () => {
        const { date, headerFormat } = stateRef.current;
        const color = Button.ENUMS.COLOR.CLEAR;
        const header = moment(date).format(headerFormat);
        const isize = 14;
        const size = Button.ENUMS.SIZE.XS;

        return (
            <div className={_ns('header')}>
                <Button
                    color={color}
                    size={size}
                    onClick={() => _prev('years')}>
                    <Feather.ChevronLeft width={isize} height={isize} />
                </Button>
                <Button
                    readOnly
                    size={size}
                    color={color}
                    className='flex-grow'>
                    {header}
                </Button>
                <Button
                    color={color}
                    size={size}
                    onClick={() => _next('years')}>
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
                {renderHeader()}
                {renderLabels()}
                {renderDays()}
                {renderFooter()}
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
    headerFormat: PropTypes.string,
    labeFormat: PropTypes.func,
    labels: PropTypes.array,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    multiple: PropTypes.bool,
    name: PropTypes.string,
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    onNav: PropTypes.func,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    range: PropTypes.bool,
    selected: PropTypes.array,
};

Calendar.defaultProps = {
    date: new Date(),
    dateFormat: 'L',
    headerFormat: 'MMMM YYYY',
    labelFormat: label => label,
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    multiple: false,
    namespace: 'ar-datepicker-calendar',
    onChange: noop,
    onNav: noop,
    onNext: noop,
    onPrev: noop,
    range: false,
    selected: ['06/15/2019'],
};

export { Calendar as default };
