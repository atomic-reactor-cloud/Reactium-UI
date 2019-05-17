/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import op from 'object-path';
import React, { Component } from 'react';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';
import Dropdown from 'components/common-ui/Dropdown';
/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: DropdownMolecule
 * -----------------------------------------------------------------------------
 */

class DropdownMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);

        this.state = {
            selection: 'Dropdown 1',
        };
        this.typeahead;
    }

    onTypeAhead = e => {
        this.setState({ typeahead: e.target.value });
    };

    onSelect = e => {
        const def = ['Dropdown 1'];
        let selection = op.get(e, 'labels') || def;

        selection = selection.length < 1 ? def : selection;

        this.setState({ selection: selection.join(', ') });
    };

    render() {
        const { iDocument, iWindow } = this.props;
        const { selection, typeahead } = this.state;

        return (
            <div className='row' style={{ minHeight: 450 }}>
                <div className='col-xs-12 col-sm-6 mb-xs-20 mb-sm-0'>
                    <Dropdown
                        expanded={true}
                        onChange={this.onSelect}
                        iWindow={iWindow}
                        iDocument={iDocument}>
                        <Button
                            color={Button.ENUMS.COLOR.PRIMARY}
                            style={{
                                width: 140,
                                justifyContent: 'flex-start',
                                padding: 10,
                                overflowX: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                            data-dropdown-element>
                            {selection}
                        </Button>
                    </Dropdown>
                </div>
                <div className='col-xs-12 col-sm-6 mb-xs-20 mb-sm-0'>
                    <Dropdown
                        multiSelect
                        expandEvent={[
                            Dropdown.ENUMS.EVENT.MOUSE_DOWN,
                            Dropdown.ENUMS.EVENT.FOCUS,
                        ]}
                        collapseEvent={Dropdown.ENUMS.EVENT.BLUR}
                        filter={typeahead}
                        iWindow={iWindow}
                        iDocument={iDocument}>
                        <div className='input-group'>
                            <input
                                id='dropdown-input-2'
                                type='text'
                                placeholder='Dropdown 2'
                                data-dropdown-element
                                autoComplete='off'
                                value={typeahead || ''}
                                onChange={this.onTypeAhead}
                            />
                            <Button
                                size={Button.ENUMS.SIZE.XS}
                                style={{ maxWidth: 41 }}>
                                <Feather.Search width={18} height={18} />
                            </Button>
                        </div>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

// Default properties
DropdownMolecule.defaultProps = {};

export default DropdownMolecule;
