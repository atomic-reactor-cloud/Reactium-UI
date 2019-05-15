/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
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
        this.state = {};
    }

    render() {
        return (
            <div className='row' style={{ minHeight: 400 }}>
                <div className='col-xs-12 col-sm-6 mb-xs-20 mb-sm-0'>
                    <Dropdown expanded={true}>
                        <Button
                            color={Button.ENUMS.COLOR.PRIMARY}
                            data-dropdown-element>
                            Dropdown 1
                        </Button>
                    </Dropdown>
                </div>
                <div className='col-xs-12 col-sm-6 mb-xs-20 mb-sm-0'>
                    <Dropdown expandEvent={Dropdown.ENUMS.EVENT.FOCUS}>
                        <div className='input-group'>
                            <input
                                id='dropdown-input-2'
                                type='text'
                                placeholder='Dropdown 2'
                                data-dropdown-element
                            />
                            <Button
                                size={Button.ENUMS.SIZE.XS}
                                inlineStyle={{ maxWidth: 41 }}>
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
