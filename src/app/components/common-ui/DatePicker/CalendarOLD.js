import _ from 'underscore';
import React, { Component } from 'react';
import moment from 'moment';
import cn from 'classnames';
import Icon from 'components/common-ui/Icon';

/**
 * -----------------------------------------------------------------------------
 * Functional Component: Calendar
 * -----------------------------------------------------------------------------
 */

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

class Calendar extends Component {
    state = {};

    componentDidMount() {
        const { expanded } = this.props;
        this.setState({ expanded });
    }

    componentDidUpdate(prevProps) {
        const { expanded: prev } = prevProps;
        const { expanded: curr } = this.props;

        if (prev !== curr) {
            this.setState({ expanded: curr });
        }
    }

    render() {
        const {
            className,
            collapseable,
            date,
            minDate,
            maxDate,
            headingFormat,
            labels,
            multiple,
            name = 'date',
            onChange,
            onNext,
            onNextYear,
            onPrev,
            onPrevYear,
            onToggle,
        } = this.props;

        const { expanded } = this.state;

        const heading = moment(date).format(headingFormat);
        const days = DaysInMonth(date, expanded);
        const today = moment().format('L');
        const cname = suffix => {
            return `${className}-${suffix}`;
        };

        return (
            <>
                <div className={cname('container')}>
                    <div className={cname('heading')}>
                        <button
                            type='button'
                            className='left'
                            onClick={onPrevYear}>
                            <Icon.Feather.ChevronLeft width={10} height={10} />
                        </button>
                        <span>{heading}</span>
                        <button
                            type='button'
                            className='right'
                            onClick={onNextYear}>
                            <Icon.Feather.ChevronRight width={10} height={10} />
                        </button>
                    </div>
                    <div className={cname('week-headings')}>
                        {labels.map(day => (
                            <div key={cname(`week-headings-${day}`)}>{day}</div>
                        ))}
                    </div>
                    <button
                        type='button'
                        className={`${cname('nav')} left`}
                        onClick={onPrev}>
                        <Icon.Feather.ChevronLeft width={14} height={14} />
                    </button>
                    <button
                        type='button'
                        className={`${cname('nav')} right`}
                        onClick={onNext}>
                        <Icon.Feather.ChevronRight width={14} height={14} />
                    </button>
                    <div className={cname('week-days')}>
                        {days.map((day, i) => {
                            let disabled = false;
                            disabled =
                                minDate && day.isBefore(minDate)
                                    ? true
                                    : disabled;
                            disabled =
                                maxDate && day.isAfter(maxDate)
                                    ? true
                                    : disabled;

                            if (disabled) {
                                return (
                                    <span
                                        key={cname(
                                            `${className}-week-days-${i}`,
                                        )}
                                        className={cn({
                                            [cname('week-day')]: true,
                                            today: today === day.format('L'),
                                        })}>
                                        <span
                                            className={cname('week-day-label')}>
                                            {day.format('D')}
                                        </span>
                                    </span>
                                );
                            }

                            return i >= 42 ? null : (
                                <label
                                    key={cname(
                                        `${className}-week-days-${day.toISOString()}`,
                                    )}
                                    className={cn({
                                        [cname('week-day')]: true,
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
                                    <span className={cname('week-day-bg')} />
                                    <span className={cname('week-day-label')}>
                                        {day.format('D')}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                {collapseable !== false && (
                    <span className={cname('toggle')} onClick={onToggle} />
                )}
            </>
        );
    }
}

export { Calendar as default, DaysInMonth };
