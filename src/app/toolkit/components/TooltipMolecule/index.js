/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Icon, Button, Tooltip } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: TooltipMolecule
 * -----------------------------------------------------------------------------
 */

class TooltipMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className='flex center middle' style={{ minHeight: 400 }}>
                <Tooltip iWindow={this.props.iWindow} />
                <div>
                    <div>
                        <div
                            className='btn-group mb-xs-20'
                            style={{ width: 228 }}>
                            <Button
                                title='Tooltip Top Left'
                                data-tooltip
                                data-vertical-align={
                                    Tooltip.ENUMS.VERTICAL_ALIGN.TOP
                                }
                                data-align={Tooltip.ENUMS.ALIGN.LEFT}>
                                <Icon.Feather.ArrowUpLeft />
                            </Button>
                            <Button
                                title='Tooltip Top Center'
                                data-tooltip
                                data-vertical-align={
                                    Tooltip.ENUMS.VERTICAL_ALIGN.TOP
                                }
                                data-align={Tooltip.ENUMS.ALIGN.CENTER}>
                                <Icon.Feather.ArrowUp />
                            </Button>
                            <Button
                                title='Tooltip Top Right'
                                data-tooltip
                                data-vertical-align={
                                    Tooltip.ENUMS.VERTICAL_ALIGN.TOP
                                }
                                data-align={Tooltip.ENUMS.ALIGN.RIGHT}>
                                <Icon.Feather.ArrowUpRight />
                            </Button>
                        </div>
                    </div>
                    <div className='btn-group mb-xs-20' style={{ width: 228 }}>
                        <Button
                            title='Tooltip Middle Left'
                            data-tooltip
                            data-vertical-align={
                                Tooltip.ENUMS.VERTICAL_ALIGN.MIDDLE
                            }
                            data-align={Tooltip.ENUMS.ALIGN.LEFT}>
                            <Icon.Feather.ArrowLeft />
                        </Button>
                        <Button
                            title='Tooltip Middle Center'
                            data-tooltip
                            data-vertical-align={
                                Tooltip.ENUMS.VERTICAL_ALIGN.MIDDLE
                            }
                            data-align={Tooltip.ENUMS.ALIGN.CENTER}>
                            <Icon.Feather.Crosshair />
                        </Button>
                        <Button
                            title='Tooltip Middle Right'
                            data-tooltip
                            data-vertical-align={
                                Tooltip.ENUMS.VERTICAL_ALIGN.MIDDLE
                            }
                            data-align={Tooltip.ENUMS.ALIGN.RIGHT}>
                            <Icon.Feather.ArrowRight />
                        </Button>
                    </div>
                    <div>
                        <div
                            className='btn-group mb-xs-20'
                            style={{ width: 228 }}>
                            <Button
                                title='Tooltip Bottom Left'
                                data-tooltip
                                data-vertical-align={
                                    Tooltip.ENUMS.VERTICAL_ALIGN.BOTTOM
                                }
                                data-align={Tooltip.ENUMS.ALIGN.LEFT}>
                                <Icon.Feather.ArrowDownLeft />
                            </Button>
                            <Button
                                title='Tooltip Bottom Center'
                                data-tooltip
                                data-vertical-align={
                                    Tooltip.ENUMS.VERTICAL_ALIGN.BOTTOM
                                }
                                data-align={Tooltip.ENUMS.ALIGN.CENTER}>
                                <Icon.Feather.ArrowDown />
                            </Button>
                            <Button
                                title='Tooltip Bottom Right'
                                data-tooltip
                                data-vertical-align={
                                    Tooltip.ENUMS.VERTICAL_ALIGN.BOTTOM
                                }
                                data-align={Tooltip.ENUMS.ALIGN.RIGHT}>
                                <Icon.Feather.ArrowDownRight />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Button
                            block
                            title='Tooltip Autohide'
                            data-tooltip
                            data-autohide={2000}>
                            Auto Hide 2 sec
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TooltipMolecule;
