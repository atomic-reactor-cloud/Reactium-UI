import lunr from 'lunr';
import _ from 'underscore';
import uuid from 'uuid/v4';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import Icon from 'components/common-ui/Icon';
import { Scrollbars } from 'react-custom-scrollbars';
import { TweenMax, Power2 } from 'gsap/umd/TweenMax';

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

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Dropdown
 * -----------------------------------------------------------------------------
 */
let Dropdown = (props, ref) => {
    let animation = null;
    let animating = false;
    let ElementComponent = null;
    const id = uuid();

    // State
    const [data, setData] = useState(props.data || []);
    const [expanded, setExpanded] = useState(props.expanded);
    const [selection, setSelection] = useState(props.selection || []);
    const [tabIndex, setTabIndex] = useState(-1);

    // Refs
    const activeButton = useRef();
    const containerRef = useRef();
    const menuRef = useRef();

    // Internal Interface
    const cname = suffix => _.compact([props.namespace, suffix]).join('-');

    const collapse = () => {
        setTabIndex(-1);

        if (expanded !== true || animating === true) {
            animation = null;
            return Promise.resolve();
        }

        if (animation) {
            return animation;
        }

        animating = true;

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
                    onCollapse(evt);
                    animation = null;
                    animating = false;
                    resolve();
                },
            }),
        );

        return animation;
    };

    const dismiss = e => {
        if (!e) {
            return true;
        }

        const { dismissable } = props;

        if (dismissable === true && !isChild(e.target)) {
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
            return true;
        }

        const parent = containerRef.current;
        let node = child.parentNode;
        while (node !== null) {
            if (node == parent) {
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
    useEffect(() => setData(props.data), [props.data]);

    useEffect(() => {
        const win = op.get(props, 'iWindow', window) || window;
        const doc = op.get(props, 'iDocument', document) || document;

        doc.addEventListener('mousedown', dismiss);
        win.addEventListener('keydown', _onKeyDown);

        return function cleanup() {
            doc.removeEventListener('mousedown', dismiss);
            win.removeEventListener('keydown', _onKeyDown);
        };
    });

    // After Render
    useLayoutEffect(() => {
        let { collapseEvent, expandEvent, toggleEvent } = props;
        const selector = op.get(props, 'selector') || 'button';

        ElementComponent = containerRef.current.querySelector(selector);

        if (collapseEvent || expandEvent) {
            if (collapseEvent) {
                collapseEvent = _.flatten([collapseEvent]);
                collapseEvent.forEach(evt => {
                    if (evt === ENUMS.EVENT.BLUR) {
                        ElementComponent[evt] = e => {
                            if (!isChild(e.relatedTarget)) {
                                collapse(e);
                            }
                        };
                    } else {
                        ElementComponent[evt] = e => collapse(e);
                    }
                });
            }

            if (expandEvent) {
                expandEvent = _.flatten([expandEvent]);
                expandEvent.forEach(evt => {
                    if (evt === ENUMS.EVENT.FOCUS) {
                        ElementComponent[evt] = e => {
                            if (!isChild(e.relatedTarget)) {
                                expand(e);
                            }
                        };
                    } else {
                        ElementComponent[evt] = e => expand(e);
                    }
                });
            }
        } else {
            toggleEvent = _.flatten([toggleEvent]);
            toggleEvent.forEach(evt => {
                ElementComponent[evt] = e => toggle(e);
            });
        }

        const buttons = menuRef.current.querySelectorAll('button');
        if (buttons && tabIndex > -1) {
            try {
                buttons[tabIndex].focus();
            } catch (err) {}
        }
    });

    // Event Handlers
    const _onItemClick = (e, val) => {
        const {
            data,
            iconField,
            labelField,
            multiSelect,
            onChange,
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
            item: data[idx],
            labels,
            selection: sel,
            type: action,
        };

        setSelection(sel);
        setTabIndex(idx);

        onItemClick({ ...evt, type: ENUMS.EVENT.ITEM_CLICK });

        if (action === ENUMS.EVENT.ITEM_SELECT) {
            onItemSelect(evt);
        }

        if (action === ENUMS.EVENT.ITEM_UNSELECT) {
            onItemUnselect(evt);
        }

        if (multiSelect !== true) {
            collapse().then(() => ElementComponent.focus());
        }

        onChange({ ...evt, type: ENUMS.EVENT.CHANGE });
    };

    const _onKeyDown = e => {
        switch (e.keyCode) {
            case 27:
                e.preventDefault();
                _onEsc(e);
                break;

            case 38:
            case 40:
                e.preventDefault();
                if (isChild(e.target)) {
                    expand().then(() => _onNav(e));
                }
                break;

            default:
                if (isChild(e.target)) {
                    expand();
                }
        }
    };

    const _onEsc = e => {
        if (isChild(e.target)) {
            collapse().then(() => ElementComponent.focus());
        }
    };

    const _onNav = e => {
        const inc = e.keyCode === 38 ? -1 : 1;
        const max = data.length;
        let idx = tabIndex + inc;
        idx = Math.max(idx, -2);
        idx = Math.min(idx, max);
        idx = idx === max ? -1 : idx;
        idx = idx < -1 ? max - 1 : idx;

        setTabIndex(idx);
        if (idx === -1) {
            setTimeout(() => ElementComponent.focus(), 1);
        }
    };

    // Renderers
    const renderMenuItems = () => {
        const { iconField, labelField, menuRenderer, name, valueField } = props;
        const filter = op.get(props, 'filter');

        const idx = !filter
            ? []
            : lunr(function() {
                  this.ref('sortIndex');
                  this.field(labelField);
                  data.forEach((item, i) => {
                      item['sortIndex'] = i;
                      this.add(item);
                  });
              }, this);

        let ranked = -1;

        const filteredData = !filter
            ? data
            : idx.search(filter).map((result, i) => {
                  const item = _.findWhere(data, {
                      ['sortIndex']: isNaN(result.ref)
                          ? result.ref
                          : Number(result.ref),
                  });

                  item.score = result.score;

                  ranked = item.score >= 1 ? i : ranked;

                  return item;
              });

        return menuRenderer ? (
            menuRenderer(filteredData)
        ) : (
            <Scrollbars
                autoHeight
                autoHeightMin={0}
                autoHeightMax={220}
                thumbMinSize={5}>
                <ul>
                    {filteredData.map((item, i) => {
                        const key = `ar-dropdown-item-${id}-${i}`;
                        const val = op.get(item, valueField);
                        const label = op.get(item, labelField, val);
                        const sel = selection.includes(val);
                        const className = cn({
                            active: sel,
                            ranked: i === ranked,
                        });

                        let Ico = null;

                        if (iconField) {
                            const icon = op.get(item, iconField);
                            if (icon) {
                                Ico = op.get(Icon, icon);
                            }
                        }

                        return (
                            <li key={key} className={className}>
                                <input type='hidden' value={val} name={name} />
                                <button
                                    type='button'
                                    onClick={e => _onItemClick(e, val)}
                                    ref={i === tabIndex ? activeButton : null}>
                                    {Ico && (
                                        <span className='mr-xs-8'>
                                            <Ico width={18} height={18} />
                                        </span>
                                    )}
                                    {label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </Scrollbars>
        );
    };

    const render = () => {
        const { children, namespace } = props;

        const contClassName = cn({ [namespace]: true, [cname()]: true });
        const menuClassName = cn({ [cname('menu')]: true, expanded });

        return (
            <div ref={containerRef} className={contClassName}>
                {children}
                <div ref={menuRef} className={menuClassName}>
                    {renderMenuItems()}
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
    collapseEvent: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    ]),
    data: PropTypes.array,
    dismissable: PropTypes.bool,
    expanded: PropTypes.bool,
    expandEvent: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    ]),
    filter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iconField: PropTypes.string,
    labelField: PropTypes.string,
    menuRenderer: PropTypes.func,
    multiSelect: PropTypes.bool,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    namespace: PropTypes.string,
    selection: PropTypes.array,
    selector: PropTypes.string,
    toggleEvent: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.oneOf(Object.values(ENUMS.EVENT)),
    ]),
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
    data: [],
    dismissable: true,
    expanded: false,
    expandEvent: null,
    filter: null,
    iconField: 'icon',
    labelField: 'label',
    name: uuid(),
    menuRenderer: null,
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
