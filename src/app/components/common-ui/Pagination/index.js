import _ from 'underscore';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Button from 'components/common-ui/Button';
import Dropdown from 'components/common-ui/Dropdown';
import { Feather } from 'components/common-ui/Icon';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

const DEBUG = true;
const noop = () => {};

let Pagination = (
    { onClick, onNextClick, onPrevClick, update, ...props },
    ref,
) => {
    const containerRef = useRef();
    const stateRef = useRef({
        ...props,
    });

    const [state, setNewState] = useState({ ...stateRef.current });

    const setState = (newState, caller) => {
        if (!containerRef.current) return;
        stateRef.current = {
            ...stateRef.current,
            ...newState,
        };

        if (caller && DEBUG === true) {
            console.log(caller, stateRef.current);
        }
        setNewState(stateRef.current);
    };

    const _onClick = (e, p) => {
        setState({ page: p });
        onClick(e, p);
    };

    const _onNextClick = e => {
        const { page, pages } = stateRef.current;
        const p = page + 1;
        if (p <= pages) {
            setState({ page: p });
            onNextClick(e);
        }
    };

    const _onPrevClick = e => {
        const { page, pages } = stateRef.current;
        const p = page - 1;
        if (p > 0) {
            setState({ page: p });
            onPrevClick(e);
        }
    };

    useEffect(() => {
        setState(props);
    }, Object.values(props));

    useImperativeHandle(ref, () => ({
        setState,
        state: stateRef.current,
    }));

    const renderNumbers = () => {
        const {
            color,
            namespace,
            numbers,
            page,
            pages,
            size,
        } = stateRef.current;

        let pgs = _.range(1, pages + 1);
        let idx = pgs.indexOf(page) - Math.floor(numbers / 2);
        idx = Math.max(0, idx);

        let sel = Array.from(pgs).splice(idx, numbers);

        if (sel.length < numbers) {
            const diff = numbers - sel.length;
            idx -= diff;
            idx = Math.max(0, idx);

            sel = Array.from(pgs).splice(idx, numbers);
        }

        return sel.map(n => (
            <Button
                key={`${namespace}-button-${n}`}
                onClick={e => _onClick(e, n)}
                color={color}
                size={size}
                type='button'
                readOnly={Boolean(page === n)}
                className={cn({
                    'px-xs-8': true,
                    active: page === n,
                })}>
                {n}
            </Button>
        ));
    };

    const renderCurrent = () => {
        const { arrows, color, dropdown, page, pages, size } = stateRef.current;

        const style = { minWidth: 50 };

        if (arrows) {
            style.paddingLeft = 2;
            style.paddingRight = 2;
        }

        const dropdownSelector =
            dropdown === true
                ? { 'data-dropdown-element': true, type: 'button' }
                : { readOnly: true };

        return (
            <Button
                size={size}
                style={style}
                color={color}
                type='button'
                {...dropdownSelector}>
                {page}
                <span className='lowercase mx-xs-8'>of</span>
                {pages}
            </Button>
        );
    };

    const Drop = ({ children }) => {
        const { align, page, pages, size, veritcalAlign } = stateRef.current;

        const data =
            pages < 1
                ? []
                : _.times(pages, i => {
                      const n = i + 1;
                      return { value: n, label: n };
                  });

        return pages < 1 ? (
            children
        ) : (
            <Dropdown
                align={align}
                checkbox={false}
                data={data}
                onItemSelect={e => _onClick(e, e.item.value)}
                selection={[page]}
                size={size}
                veritcalAlign={veritcalAlign}>
                {children}
            </Dropdown>
        );
    };

    const render = () => {
        const {
            arrows,
            className,
            color,
            dropdown,
            namespace,
            numbers,
            page,
            pages,
            size,
        } = stateRef.current;

        const display = pages > 1 ? null : 'none';

        const pagination = () => (
            <div className='btn-group' ref={containerRef}>
                {arrows && (
                    <Button
                        color={color}
                        size={size}
                        type='button'
                        readOnly={Boolean(page <= 1)}
                        onClick={e => _onPrevClick(e)}
                        className='px-xs-4'>
                        <Feather.ChevronLeft width={14} height={14} />
                    </Button>
                )}
                {numbers < 2 && renderCurrent()}
                {numbers > 1 && renderNumbers()}
                {arrows && (
                    <Button
                        color={color}
                        size={size}
                        type='button'
                        readOnly={Boolean(page >= pages)}
                        onClick={e => _onNextClick(e)}
                        className='px-xs-4'>
                        <Feather.ChevronRight width={14} height={14} />
                    </Button>
                )}
            </div>
        );

        return (
            <div
                ref={ref}
                style={{ display }}
                className={cn({
                    [namespace]: !!namespace,
                    [className]: !!className,
                })}>
                {dropdown ? <Drop>{pagination()}</Drop> : pagination()}
            </div>
        );
    };

    return render();
};

Pagination = forwardRef(Pagination);

Pagination.COLOR = Button.ENUMS.COLOR;

Pagination.propTypes = {
    align: PropTypes.oneOf(Object.values(Dropdown.ENUMS.ALIGN)),
    arrows: PropTypes.bool,
    className: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dropdown: PropTypes.bool,
    namespace: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    numbers: PropTypes.number,
    onClick: PropTypes.func,
    onNextClick: PropTypes.func,
    onPrevClick: PropTypes.func,
    page: PropTypes.number,
    pages: PropTypes.number,
    veritcalAlign: PropTypes.oneOf(Object.values(Dropdown.ENUMS.VALIGN)),
};

Pagination.defaultProps = {
    align: Dropdown.ENUMS.ALIGN.CENTER,
    arrows: true,
    className: null,
    color: Button.ENUMS.COLOR.CLEAR,
    dropdown: false,
    namespace: 'ar-pagination',
    numbers: 0,
    onClick: noop,
    onNextClick: noop,
    onPrevClick: noop,
    page: 0,
    size: Button.ENUMS.SIZE.XS,
    veritcalAlign: Dropdown.ENUMS.VALIGN.BOTTOM,
};

export default Pagination;
