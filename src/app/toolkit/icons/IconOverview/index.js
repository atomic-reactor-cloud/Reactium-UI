/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import Code from 'toolkit/Code';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Alert, Icon } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: IconOverview
 * -----------------------------------------------------------------------------
 */

class IconOverview extends Component {
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
                <p>Reactium UI provides 2 different SVG icon sets:</p>
                <ul>
                    <li>
                        <Link to='/toolkit/icons/feather-icons'>Feather</Link>
                    </li>
                    <li>
                        <Link to='/toolkit/icons/linear-icons'>Linear</Link>
                    </li>
                </ul>

                <div className='hr mx--32' />

                <h3 className='my-xs-20'>Import</h3>
                <div style={{ margin: '0 -25px' }}>
                    <Code>
                        {"import { Icon } from '@atomic-reactor/reactium-ui';"}
                    </Code>
                </div>

                <h3 className='my-xs-20'>Usage</h3>
                <div
                    className='bg-black'
                    style={{ margin: '0 -25px -25px -25px' }}>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-10'>
                            <Code>
                                {
                                    "<Icon color={Icon.ENUMS.COLOR.DANGER} name='Feather.ChevronRight' size={24} />"
                                }
                            </Code>
                        </div>
                        <div className='col-xs-12 col-sm-2 flex middle center py-xs-16'>
                            <Icon
                                size={24}
                                name='Feather.ChevronRight'
                                color={Icon.ENUMS.COLOR.DANGER}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-10'>
                            <Code>
                                {
                                    "<Icon color={Icon.ENUMS.COLOR.SUCCESS} name='Linear.ChevronRight' size={18} />"
                                }
                            </Code>
                        </div>
                        <div className='col-xs-12 col-sm-2 flex middle center py-xs-16'>
                            <Icon
                                size={18}
                                name='Linear.ChevronRight'
                                color={Icon.ENUMS.COLOR.SUCCESS}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// Default properties
IconOverview.defaultProps = {};

export default IconOverview;
