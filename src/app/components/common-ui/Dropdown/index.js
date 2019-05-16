import lunr from 'lunr';
import _ from 'underscore';
import cn from 'classnames';
import uuid from 'uuid/v4';
import op from 'object-path';
import PropTypes from 'prop-types';
import Icon from 'components/common-ui/Icon';
import { TweenMax, Power2 } from 'gsap/umd/TweenMax';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const ENUMS = {
    EVENT: {
        BLUR: 'onblur',
        CLICK: 'onclick',
        FOCUS: 'onfocus',
        BEFORE_COLLAPSE: 'beforeCollapse',
        BEFORE_EXPAND: 'beforeExpand',
        COLLAPSE: 'collapse',
        EXPAND: 'expand',
        ITEM_CLICK: 'itemClick',
        ITEM_SELECT: 'itemSelect',
        ITEM_UNSELECT: 'itemUnselect',
    },
};

const noop = () => {};

const mockData = [
    { label: 'Test 1', value: 1, icon: 'Feather.Search' },
    { label: 'Item 2', value: 2, icon: 'Feather.User' },
    { label: 'Item 3', value: 3, icon: 'Linear.Grumpy' },
    { label: 'Item 4', value: 4 },
    { label: 'Item 5', value: 5 },
    { label: 'Item 6', value: 6 },
    { label: 'Item 7', value: 7 },
    { label: 'Item 8', value: 8 },
    { label: 'Item 9', value: 9 },
    { label: 'Item 10', value: 10 },
];

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Dropdown
 * -----------------------------------------------------------------------------
 */
let Dropdown = (props, ref) => {
    let animation = null;
    let ElementComponent = null;
    const id = uuid();

    // State
    const [data, setData] = useState(props.data || []);
    const [expanded, setExpanded] = useState(props.expanded);
    const [index, setIndex] = useState(-1);
    const [selection, setSelection] = useState(props.selection || []);

    // Refs
    const activeButton = useRef();
    const containerRef = useRef();
    const menuRef = useRef();

    // Internal Interface
    const cname = suffix => _.compact([props.namespace, suffix]).join('-');

    const collapse = () => {
        setIndex(-1);

        if (expanded !== true) {
            animation = null;
            return Promise.resolve();
        }
        if (animation) {
            return animation;
        }

        const {
            animationEase,
            animationSpeed,
            onBeforeCollapse,
            onCollapse,
        } = props;

        const menu = menuRef.current;

        menu.style.height = 'auto';
        menu.style.display = 'block';
        menu.style.overflow = 'hidden';
        menu.classList.remove('expanded');

        onBeforeCollapse({
            type: ENUMS.EVENT.BEFORE_COLLAPSE,
            menu,
            target: ElementComponent,
        });

        animation = new Promise(resolve =>
            TweenMax.to(menu, animationSpeed, {
                ease: animationEase,
                height: 0,
                onComplete: () => {
                    const evt = {
                        type: ENUMS.EVENT.COLLAPSE,
                        menu,
                        target: ElementComponent,
                    };

                    menu.removeAttribute('style');
                    setExpanded(false);
                    setIndex(-1);
                    onCollapse(evt);
                    animation = null;
                    resolve();
                },
            }),
        );

        return animation;
    };

    const dismiss = (e = {}) => {
        const { dismissable } = props;

        if (dismissable === true && !isChild(op.get(e, 'target'))) {
            return collapse(e);
        } else {
            return Promise.resolve();
        }
    };

    const expand = () => {
        if (expanded === true) {
            animation = null;
            return Promise.resolve();
        }
        if (animation) {
            return animation;
        }

        const {
            animationEase,
            animationSpeed,
            onBeforeExpand,
            onExpand,
        } = props;

        // setExpanded(true);
        const menu = menuRef.current;

        menu.style.height = 'auto';
        menu.style.display = 'block';
        menu.style.overflow = 'hidden';
        menu.classList.remove('expanded');

        onBeforeExpand({
            type: ENUMS.EVENT.BEFORE_EXPAND,
            menu,
            target: ElementComponent,
        });

        animation = new Promise(resolve =>
            TweenMax.from(menu, animationSpeed, {
                ease: animationEase,
                height: 0,
                onComplete: () => {
                    const evt = {
                        type: ENUMS.EVENT.EXPAND,
                        menu,
                        target: ElementComponent,
                    };

                    menu.removeAttribute('style');
                    setExpanded(true);
                    onExpand(evt);
                    animation = null;
                    resolve();
                },
            }),
        );

        return animation;
    };

    const isChild = child => {
        if (!child) {
            return false;
        }

        const parent = containerRef.current;
        let node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    const toggle = e => {
        return expanded !== true ? expand(e) : collapse(e);
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        collapse,
        container: containerRef.current,
        expand,
        toggle,
        value: selected,
    }));

    // Before Render
    useEffect(() => {
        document.addEventListener('click', dismiss);

        return function cleanup() {
            document.removeEventListener('click', dismiss);
        };
    });

    // After Render
    useLayoutEffect(() => {
        const { collapseEvent, expandEvent, toggleEvent } = props;
        const selector = op.get(props, 'selector') || 'button';

        ElementComponent = containerRef.current.querySelector(selector);

        if (collapseEvent || expandEvent) {
            if (collapseEvent) {
                ElementComponent[collapseEvent] = e => collapse(e);
            }

            if (expandEvent) {
                ElementComponent[expandEvent] = e => expand(e);
            }
        } else {
            ElementComponent[toggleEvent] = e => toggle(e);
        }

        if (activeButton.current && index > -1) {
            activeButton.current.focus();
        }
    });

    // Event Handlers
    const _onItemClick = (e, val) => {
        const {
            data,
            iconField,
            labelField,
            multiSelect,
            onItemClick,
            onItemSelect,
            onItemUnselect,
            valueField,
        } = props;
        const idx = _.findIndex(data, { [valueField]: val });

        let action;
        let sel = _.uniq(Array.from(selection));

        if (sel.includes(val)) {
            action = ENUMS.EVENT.ITEM_UNSELECT;
            sel = _.without(sel, val);
        } else {
            sel = multiSelect === true ? sel : [];
            action = ENUMS.EVENT.ITEM_SELECT;
            sel.push(val);
        }

        sel = _.uniq(sel);

        const dataSelected = data.filter(item =>
            sel.includes(item[valueField]),
        );
        const labels = _.compact(_.pluck(dataSelected, labelField));
        const icons = _.compact(_.pluck(dataSelected, iconField));

        const evt = {
            icons,
            index: idx,
            item: data[index],
            labels,
            selection: sel,
            type: action,
        };

        setIndex(val);

        onItemClick({ ...evt, type: ENUMS.EVENT.ITEM_CLICK });

        if (action === ENUMS.EVENT.ITEM_SELECT) {
            onItemSelect(evt);
        }

        if (action === ENUMS.EVENT.ITEM_UNSELECT) {
            onItemUnselect(evt);
        }

        if (multiSelect !== true) {
            collapse();
        }

        setSelection(sel);
    };

    const renderMenuItems = () => {
        const { iconField, labelField, valueField } = props;
        // const filter = String(op.get(props, 'filter') || '*').split(' ').join('~').replace(/\s\s+/, ' ');
        const filter = op.get(props, 'filter') || '*';

        const lnr = lunr(function() {
            this.ref(labelField);
            this.field(valueField);
            this.field(labelField);
            data.forEach(item => this.add(item));
        }, this);

        const filteredData = lnr
            .search(filter)
            .map(result => _.findWhere(data, { [labelField]: result.ref }));

        return filteredData.map((item, i) => {
            const key = `ar-dropdown-item-${id}-${i}`;
            const val = op.get(item, valueField);
            const label = op.get(item, labelField, val);
            const sel = selection.includes(val);
            const className = cn({ active: sel });

            let Ico = null;

            if (iconField) {
                const icon = op.get(item, iconField);
                if (icon) {
                    Ico = op.get(Icon, icon);
                }
            }

            return (
                <li key={key} className={className}>
                    <button
                        type='button'
                        onClick={e => _onItemClick(e, val)}
                        ref={val === index ? activeButton : null}>
                        {Ico && (
                            <span className='mr-xs-8'>
                                <Ico width={18} height={18} />
                            </span>
                        )}
                        {label}
                    </button>
                </li>
            );
        });
    };

    const render = () => {
        const { children, namespace } = props;

        const contClassName = cn({ [namespace]: true, [cname()]: true });
        const menuClassName = cn({ [cname('menu')]: true, expanded });

        return (
            <div ref={containerRef} className={contClassName}>
                {children}
                <div ref={menuRef} className={menuClassName}>
                    <ul>{renderMenuItems()}</ul>
                </div>
            </div>
        );
    };

    return render();
};

Dropdown = forwardRef(Dropdown);

Dropdown.ENUMS = ENUMS;

Dropdown.propTypes = {
    animationEase: PropTypes.object,
    animationSpeed: PropTypes.number,
    className: PropTypes.string,
    collapseEvent: PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    data: PropTypes.array,
    dismissable: PropTypes.bool,
    expanded: PropTypes.bool,
    expandEvent: PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    filter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iconField: PropTypes.string,
    labelField: PropTypes.string,
    multiSelect: PropTypes.bool,
    namespace: PropTypes.string,
    selection: PropTypes.array,
    selector: PropTypes.string,
    toggleEvent: PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    onBeforeCollapse: PropTypes.func,
    onBeforeExpand: PropTypes.func,
    onChange: PropTypes.func,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    onItemClick: PropTypes.func,
    onItemSelect: PropTypes.func,
    onItemUnselect: PropTypes.func,
    valueField: PropTypes.string,
};

Dropdown.defaultProps = {
    animationEase: Power2.easeInOut,
    animationSpeed: 0.25,
    className: 'ar-dropdown',
    collapseEvent: null,
    data: mockData,
    dismissable: true,
    expanded: false,
    expandEvent: null,
    filter: null,
    iconField: 'icon',
    labelField: 'label',
    multiSelect: false,
    namespace: 'ar-dropdown',
    selection: [],
    selector: '[data-dropdown-element]',
    toggleEvent: ENUMS.EVENT.CLICK,
    onBeforeCollapse: noop,
    onBeforeExpand: noop,
    onChange: noop,
    onCollapse: noop,
    onExpand: noop,
    onItemClick: noop,
    onItemSelect: noop,
    onItemUnselect: noop,
    valueField: 'value',
};

export { Dropdown as default };
