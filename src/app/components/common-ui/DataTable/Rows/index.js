import React from 'react';
import Row from '../Row';
import Column from '../Column';
import ENUMS from '../enums';
import { Feather } from 'components/common-ui/Icon';

const Rows = ({
    columns = {},
    data = [],
    selection = [],
    id,
    multiselect,
    namespace,
    rowsPerPage = -1,
    selectable = false,
    state,
    onToggle,
    ...props
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
                        {selectable === true && (
                            <Column
                                key={`${id}-row-col-select`}
                                className={`${namespace}-select`}
                                width={40}
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
                        {Object.keys(columns).map((key, c) => {
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

export default Rows;
