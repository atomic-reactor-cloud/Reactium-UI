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

    onChange = () => {
        // console.log(JSON.stringify(e.value));
    };

    labelFormat = label => {
        return label !== undefined ? `${Number(label)}°` : null;
    };

    render() {
        return (
            <div className='p-xs-20' style={{ height: 320 }}>
                <div className='row'>
                    <div className='col-xs-12 col-sm-6'>
                        <Slider
                            max={25}
                            min={-50}
                            ticks={[-50, -25, 0, 25]}
                            name='ar-slider-demo-1'
                            onChange={this.onChange}
                            value={0}
                            iDocument={this.props.iDocument}
                            labelFormat={this.labelFormat}
                            tickFormat={this.labelFormat}
                            direction={Slider.ENUMS.DIRECTION.HORIZONTAL}
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
