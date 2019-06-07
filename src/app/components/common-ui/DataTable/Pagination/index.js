import React from 'react';
import cn from 'classnames';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';

const noop = () => {};

const Pagination = ({
    className = null,
    namespace = 'ar-data-table',
    onNextClick = noop,
    onPrevClick = noop,
    page = 0,
    pages = 0,
}) =>
    pages < 2 ? null : (
        <div
            className={cn({
                [`${namespace}-pagination`]: true,
                [className]: !!className,
            })}>
            <div className='btn-group'>
                <Button
                    color={Button.ENUMS.COLOR.CLEAR}
                    size={Button.ENUMS.SIZE.XS}
                    className='px-xs-4'
                    onClick={onPrevClick}>
                    <Feather.ChevronLeft width={14} height={14} />
                </Button>
                <span
                    className='btn-clear-xs'
                    style={{ width: 50, minWidth: 50, maxWidth: 50 }}>
                    {page}
                    <span className='lowercase mx-xs-8'>of</span>
                    {pages}
                </span>
                <Button
                    color={Button.ENUMS.COLOR.CLEAR}
                    size={Button.ENUMS.SIZE.XS}
                    className='px-xs-4'
                    onClick={onNextClick}>
                    <Feather.ChevronRight width={14} height={14} />
                </Button>
            </div>
        </div>
    );

export default Pagination;
