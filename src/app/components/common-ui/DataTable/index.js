import lunr from 'lunr';
import uuid from 'uuid/v4';
import _ from 'underscore';
import cn from 'classnames';
import op from 'object-path';
import PropTypes from 'prop-types';
import { Feather } from 'components/common-ui/Icon';

import Row from './Row';
import Rows from './Rows';
import Column from './Column';
import Footer from './Footer';
import Header from './Header';
import Heading from './Heading';
import Headings from './Headings';
import SearchBar from './SearchBar';
import Pagination from './Pagination';

import ENUMS from './enums';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: DataTable
 * -----------------------------------------------------------------------------
 */
let DataTable = (props, ref) => {
    // Refs
    const containerRef = useRef();
    const stateRef = useRef({
        page: props.page || 1,
        prevState: { page: 0 },
        selection: [],
        search: props.search,
        sort: props.sort,
        sortable: props.sortable,
        sortBy: props.sortBy,
    });

    // State
    const [state, setNewState] = useState(stateRef.current);

    // Internal Interface
    const setState = newState => {
        const { prevState = {} } = stateRef.current;
        stateRef.current = { ...stateRef.current, ...newState, prevState };
        setNewState(stateRef.current);
    };

    const defaultFilter = (item, i, data, search) => {
        const { results, ids } = search;
        const { id } = item;
        const valid = ids.includes(id);
        return valid;
    };

    const getData = search => {
        let output;
        const { sort, sortable, sortBy } = stateRef.current;
        const { data = [], filter = defaultFilter } = props;

        search = search || op.get(stateRef, 'current.search');

        if (search) {
            // Data types to index
            const types = ['string', 'number'];

            // Get all keys
            const keys = _.uniq(_.flatten(data.map(item => Object.keys(item))));

            // Lunr search index
            const idx = lunr(function() {
                data.forEach((item, i) => {
                    if (!op.has(item, 'id')) {
                        item['id'] = i;
                    }

                    this.field('id');

                    keys.forEach(key => {
                        const type = typeof item[key];

                        if (types.includes(type)) {
                            this.field(key);
                        }
                    });

                    this.add(item);
                });
            });

            const rankings = idx.search(search);
            const ranker = op.get(_.max(rankings, 'score'), 'score') || 0;
            const results = rankings
                .filter(item => item.score >= ranker)
                .map(item => {
                    const id = isNaN(item.ref) ? id : Number(item.ref);
                    return data[id];
                });
            const ids = _.pluck(results, 'id').map(id => {
                return isNaN(id) ? id : Number(id);
            });

            output = Array.from(
                data.filter((item, i, arr) =>
                    filter(item, i, arr, { results, ids }),
                ),
            );
        } else {
            output = Array.from(data);
        }

        // sort
        if (sortable === true) {
            output = _.sortBy(output, sortBy);

            if (sort === ENUMS.SORT.DESC) {
                output.reverse();
            }
        }

        return output;
    };

    const getPages = () => {
        const { rowsPerPage = -1 } = props;

        if (rowsPerPage < 1) {
            return 1;
        }

        const temp = getData();

        const limit = Math.max(0, rowsPerPage);
        return Math.ceil(Math.max(0, temp.length / limit));
    };

    const getSelection = () => {
        const { page } = stateRef.current;
        const { rowsPerPage } = props;

        const limit = Math.max(0, rowsPerPage);
        const idx = page > 1 ? page * limit - limit : 0;
        const temp = getData();

        const selection = limit < 1 ? temp : temp.splice(idx, limit);

        return selection;
    };

    const nextPage = () => {
        const { page: currPage = 1 } = stateRef.current;
        const page = Math.min(currPage + 1, getPages());

        if (currPage !== page) {
            setState({ page });
        }
    };

    const prevPage = () => {
        const { page: currPage = 1 } = stateRef.current;
        const page = Math.max(1, currPage - 1);

        if (currPage !== page) {
            setState({ page });
        }
    };

    const applySort = ({ sort, sortBy }) => {
        const { onSort } = props;

        setState({
            sort,
            sortBy,
        });

        onSort({ e: 'sort', sort, sortBy });
    };

    const onToggle = e => {
        const data = getData();
        let { index = -1 } = e.target.dataset;
        index = Number(index);

        const { checked } = e.target;
        const { multiselect, onSelect, onUnSelect } = props;
        const item = data[index];

        if (item) {
            if (multiselect !== true) {
                data.forEach((row, i) => {
                    const { selected } = row;
                    if (i !== index && selected === true) {
                        row.selected = false;
                        onUnSelect({
                            event: ENUMS.EVENT.UNSELECT,
                            item: row,
                            index: i,
                        });
                    }
                });
            }

            item.selected = checked;

            if (checked === true) {
                onSelect({ event: ENUMS.EVENT.SELECT, item, index });
            } else {
                onUnSelect({ event: ENUMS.EVENT.UNSELECT, item, index });
            }

            setTimeout(() => setState({ updated: Date.now() }), 1);
        }
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        container: containerRef.current,
        data: getData(),
        nextPage,
        page: stateRef.current.page,
        pages: getPages(),
        prevPage,
        props,
        search: stateRef.current.search,
        selection: getSelection(),
        setState,
        state: stateRef.current,
    }));

    // Side Effects
    useEffect(() => {
        const { onChange } = props;
        const { page } = stateRef.current;

        if (page > getPages()) {
            setState({ page: 1 });
        }

        onChange({
            type: ENUMS.EVENT.CHANGE,
            page: stateRef.current.page,
            data: getData(),
        });
    }, [state]);

    const render = () => {
        const { sort, sortBy } = stateRef.current;
        const { children, className, id, namespace, style = {} } = props;

        return (
            <div
                id={`data-table-${id}`}
                ref={containerRef}
                style={style}
                className={cn({
                    [className]: !!className,
                    [namespace]: !!namespace,
                })}>
                <Header {...props} />
                <Headings
                    {...props}
                    onClick={applySort}
                    sortBy={sortBy}
                    sort={sort}
                />
                {children}
                <Rows
                    {...props}
                    data={getData()}
                    selection={getSelection()}
                    state={stateRef.current}
                    onToggle={onToggle}
                />
                <Footer {...props} />
            </div>
        );
    };

    return render();
};

DataTable = forwardRef(DataTable);

DataTable.ENUMS = ENUMS;

DataTable.propTypes = {
    className: PropTypes.string,
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    filter: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    footer: PropTypes.node,
    header: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    multiselect: PropTypes.bool,
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onSort: PropTypes.func,
    onUnSelect: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selectable: PropTypes.bool,
    sort: PropTypes.oneOf(_.uniq(Object.values(ENUMS.SORT))),
    sortable: PropTypes.bool,
    sortBy: PropTypes.string,
    style: PropTypes.object,
};

DataTable.defaultProps = {
    data: [],
    id: uuid(),
    multiselect: false,
    namespace: 'ar-data-table',
    onChange: noop,
    onSelect: noop,
    onSort: noop,
    onUnSelect: noop,
    page: 1,
    rowsPerPage: -1,
    selectable: false,
    sort: ENUMS.SORT.ASC,
    sortable: false,
    style: {},
};

export { DataTable as default, Row, Column, Heading, Pagination, SearchBar };
