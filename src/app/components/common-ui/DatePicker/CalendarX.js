import _ from 'underscore';
import cn from 'classnames';
import moment from 'moment';
import op from 'object-path';
import PropTypes from 'prop-types';
import { Feather } from 'components/common-ui/Icon';

import React, { forwardRef } from 'react';

import ENUMS from './enums';

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

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Calendar
 * -----------------------------------------------------------------------------
 */
let Calendar = (
    {
        className,
        collapseable,
        date,
        expanded,
        minDate,
        maxDate,
        headingFormat,
        labels,
        multiple,
        name = 'date',
        namespace,
        onChange,
        onNext,
        onNextYear,
        onPrev,
        onPrevYear,
        onToggle,
        ...props
    },
    ref,
) => {
    const _ns = className => `${namespace}-${className}`;
    const heading = moment(date).format(headingFormat);
    const days = DaysInMonth(date, expanded);
    const today = moment().format('L');

    const render = () => (
        <>
            <div className={_ns('container')} ref={ref}>
                <div className={_ns('heading')}>
                    <button type='button' className='left' onClick={onPrevYear}>
                        <Feather.ChevronLeft width={10} height={10} />
                    </button>
                    <span>{heading}</span>
                    <button
                        type='button'
                        className='right'
                        onClick={onNextYear}>
                        <Feather.ChevronRight width={10} height={10} />
                    </button>
                </div>
                <div className={_ns('week-headings')}>
                    {labels.map(day => (
                        <div key={_ns(`week-headings-${day}`)}>{day}</div>
                    ))}
                </div>
                <button
                    type='button'
                    className={`${_ns('nav')} left`}
                    onClick={onPrev}>
                    <Feather.ChevronLeft width={14} height={14} />
                </button>
                <button
                    type='button'
                    className={`${_ns('nav')} right`}
                    onClick={onNext}>
                    <Feather.ChevronRight width={14} height={14} />
                </button>
                <div className={_ns('week-days')}>
                    {days.map((day, i) => {
                        let disabled = false;
                        disabled =
                            minDate && day.isBefore(minDate) ? true : disabled;
                        disabled =
                            maxDate && day.isAfter(maxDate) ? true : disabled;

                        if (disabled) {
                            return (
                                <span
                                    key={_ns(`${className}-week-days-${i}`)}
                                    className={cn({
                                        [_ns('week-day')]: true,
                                        today: today === day.format('L'),
                                    })}>
                                    <span className={_ns('week-day-label')}>
                                        {day.format('D')}
                                    </span>
                                </span>
                            );
                        }

                        return i >= 42 ? null : (
                            <label
                                key={_ns(
                                    `${className}-week-days-${day.toISOString()}`,
                                )}
                                className={cn({
                                    [_ns('week-day')]: true,
                                    today: today === day.format('L'),
                                })}>
                                <input
                                    type={
                                        multiple !== false
                                            ? 'checkbox'
                                            : 'radio'
                                    }
                                    value={day.toISOString()}
                                    onChange={onChange}
                                    name={name}
                                />
                                <span className={_ns('week-day-bg')} />
                                <span className={_ns('week-day-label')}>
                                    {day.format('D')}
                                </span>
                            </label>
                        );
                    })}
                </div>
            </div>
            {collapseable !== false && (
                <span className={_ns('toggle')} onClick={onToggle} />
            )}
        </>
    );

    return render();
};

Calendar = forwardRef(calendar);

Calendar.propTypes = {
    className: PropTypes.string,
    collapseable: PropTypes.bool,
    date: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    expanded: PropTypes.bool,
    headingFormat: PropTypes.string,
    labels: PropTypes.array,
    maxDate: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    minDate: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    multiple: PropTypes.bool,
    name: PropTypes.string,
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onNextYear: PropTypes.func,
    onPrev: PropTypes.func,
    onPrevYear: PropTypes.func,
    onToggle: PropTypes.func,
};

Calendar.defaultProps = {
    namespace: 'ar-datapicker',
    collapseable: true,
    date: moment().toISOString(),
    expanded: false,
    headingFormat: ENUMS.FORMAT.HEADING,
    labels: ENUMS.LABELS,
    name: 'date',
    multiple: false,
    onChange: noop,
};

export { Calendar as default, DaysInMonth };
