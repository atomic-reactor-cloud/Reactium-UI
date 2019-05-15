/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import Radio from 'components/common-ui/Radio';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: RadioAtom
 * -----------------------------------------------------------------------------
 */

class RadioAtom extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <div className='mb-xs-4'>
                    <Radio
                        label='Check Me'
                        name='toolkit-radio-atom'
                        id='toolkit-radio-atom-1'
                    />
                </div>
                <div>
                    <Radio
                        label='Check Me Too'
                        name='toolkit-radio-atom'
                        id='toolkit-radio-atom-2'
                    />
                </div>
            </>
        );
    }
}

// Default properties
RadioAtom.defaultProps = {};

export default RadioAtom;
