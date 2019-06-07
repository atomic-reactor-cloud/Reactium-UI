import React from 'react';
import Row from '../Row';
import Column from '../Column';
import ENUMS from '../enums';
import { Feather } from 'components/common-ui/Icon';

const DefaultRows = ({
    columns = {},
    data = [],
    selection = [],
    id,
    multiselect,
    namespace,
    reorderable = false,
    rowsPerPage = -1,
    selectable = false,
    state,
    onToggle,
}) => {
    const { page = 1 } = state;

    if (data.length < 1) {
        return null;
    }

    const limit = Math.max(0, rowsPerPage);
    const idx = page > 1 ? page * limit - limit : 0;

    return (
        <div className={`${namespace}-rows`}>
            {selection.map((item, i) => {
                const itemTmp = { ...item };
                let { selected = false, value } = itemTmp;
                const index = page > 1 ? idx + i : i;

                value = value || index;

                delete itemTmp.selected;

                return (
                    <Row key={`${id}-row-${i}`} selectable={selectable}>
                        {reorderable === true && (
                            <Column
                                verticalAlign={ENUMS.VERTICAL_ALIGN.MIDDLE}
                                style={{ padding: 0 }}
                                className={`${namespace}-handle`}
                                key={`${id}-row-${i}-col-handle`}
                                width={40}>
                                <button className='drag-handle' type='button'>
                                    <Feather.MoreVertical
                                        width={10}
                                        height={10}
                                    />
                                </button>
                            </Column>
                        )}

                        {selectable === true && (
                            <Column
                                key={`${id}-row-col-select`}
                                className={`${namespace}-select`}
                                width={30}
                                style={{ padding: '0 8px' }}
                                verticalAlign={ENUMS.VERTICAL_ALIGN.MIDDLE}>
                                <input
                                    key={`${id}-checkbox-${i}`}
                                    type={
                                        multiselect === true
                                            ? 'checkbox'
                                            : 'radio'
                                    }
                                    name='selected'
                                    data-index={index}
                                    value={value}
                                    checked={selected}
                                    onChange={e => onToggle(e)}
                                />
                                <span className='box'>
                                    <Feather.Check width={15} height={15} />
                                </span>
                            </Column>
                        )}
                        {Object.keys(columns).map(key => {
                            let value = itemTmp[key];
                            const col = { ...columns[key], field: key };
                            delete col.label;

                            return (
                                <Column
                                    key={`${id}-row-${i}-col-${key}`}
                                    {...col}>
                                    {value}
                                </Column>
                            );
                        })}
                    </Row>
                );
            })}
        </div>
    );
};

const ReorderRows = props => (
    <div className='dnd'>
        <DefaultRows {...props} reorderable />
    </div>
);

const Rows = ({ reorderable, ...props }) =>
    reorderable === true ? (
        <ReorderRows {...props} />
    ) : (
        <DefaultRows {...props} reorderable />
    );

export default Rows;
