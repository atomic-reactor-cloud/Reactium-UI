/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Slider } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: SliderMolecule
 * -----------------------------------------------------------------------------
 */

class SliderMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='mb-xs-20' style={{ height: 250 }}>
                <div className='row'>
                    <div className='col-xs-12 col-sm-6'>
                        <Slider
                            value={25}
                            name='ar-slider-demo-1'
                            iWindow={this.props.iWindow}
                            iDocument={this.props.iDocument}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

// Default properties
SliderMolecule.defaultProps = {};

export default SliderMolecule;

/*
<div className='col-xs-12 col-sm-3'>
    <Slider value={50} name='ar-slider-demo-2' min={0} max={100} points={2} />
</div>
<div className='col-xs-12 col-sm-3'>
    <Slider value={75} name='ar-slider-demo-3' />
</div>
*/
