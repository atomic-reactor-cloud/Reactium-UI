/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import _ from 'underscore';
import Events from './Events';
import Methods from './Methods';
import Code from 'toolkit/Code';
import Properties from './Properties';
import { Button, Collapsible, Icon } from 'components/common-ui';

import React, { Component } from 'react';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: CollapsibleMolecule
 * -----------------------------------------------------------------------------
 */

class CollapsibleMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.collapsible = null;
        this.collapsibleHorizontal = null;
    }

    Demo = () => (
        <div className='row'>
            <div className='col-xs-12 col-lg-6 px-xs-0 px-lg-8 mb-xs-24 mb-lg-0'>
                <div style={{ width: '100%' }}>
                    <Button
                        block
                        onClick={() => this.collapsible.toggle()}
                        style={{ borderRadius: 0 }}>
                        Vertical Collapsible
                    </Button>
                </div>
                <Collapsible ref={elm => (this.collapsible = elm)}>
                    <div
                        className='bg-blue white py-xs-20 pl-xs-20 pr-xs-32'
                        style={{ height: 271 }}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                        <Button
                            size={Button.ENUMS.SIZE.XS}
                            onClick={() => this.collapsible.collapse()}
                            style={{
                                width: 32,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}>
                            <Icon
                                name='Feather.X'
                                style={{ fill: '#FFFFFF' }}
                            />
                        </Button>
                    </div>
                </Collapsible>
            </div>

            <div className='col-xs-12 col-lg-6 px-xs-0 px-lg-8'>
                <div style={{ width: '100%' }}>
                    <Button
                        block
                        onClick={() => this.collapsibleHorizontal.toggle()}
                        style={{ borderRadius: 0 }}>
                        Horizontal Collapsible
                    </Button>
                </div>
                <Collapsible
                    direction='horizontal'
                    minSize='50px'
                    maxSize='300px'
                    ref={elm => (this.collapsibleHorizontal = elm)}>
                    <div
                        className='bg-blue white py-xs-20 pl-xs-20 pr-xs-32'
                        style={{ height: 271 }}>
                        <Button
                            size={Button.ENUMS.SIZE.XS}
                            onClick={() =>
                                this.collapsibleHorizontal.collapse()
                            }
                            style={{
                                width: 32,
                                position: 'absolute',
                                top: 0,
                                right: 0,
                            }}>
                            <Icon
                                name='Feather.X'
                                style={{ fill: '#FFFFFF' }}
                            />
                        </Button>
                    </div>
                </Collapsible>
            </div>
        </div>
    );

    render() {
        const { Demo } = this;

        return (
            <>
                <Demo />

                <div className='hr mx--32' />

                <h3 className='my-xs-20'>Import</h3>
                <div className='ht' style={{ margin: '0 -25px' }}>
                    <Code>
                        {
                            "import { Collapsible } from '@atomic-reactor/reactium-ui';"
                        }
                    </Code>
                </div>

                <h3 className='my-xs-20'>Usage</h3>
                <div className='ht' style={{ margin: '0 -25px -25px -25px' }}>
                    <Code>
                        {`<Collapsible ref={elm => (this.collapsible = elm)}>
                            <div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore
                                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                                    non proident, sunt in culpa qui officia deserunt mollit
                                    anim id est laborum.
                                </p>
                                <Button onClick={() => this.collapsible.collapse()} style={{ position: 'absolute', top: 0, right: 0 }}>
                                    <Icon name='Feather.X' />
                                </Button>
                            </div>
                        </Collapsible>`}
                    </Code>
                </div>

                <div className='hr mx--32' />

                <h3 className='my-xs-20'>Properties</h3>
                <div className='hr mx--32' />
                <div className='ar-data-table'>
                    <Properties />
                </div>

                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Methods</h3>
                <div className='hr mx--32' />
                <div className='ar-data-table'>
                    <Methods />
                </div>

                <div className='hr mx--32' />
                <h3 className='my-xs-20'>Events</h3>
                <div className='hr mx--32' />
                <div className='ar-data-table'>
                    <Events />
                </div>

                <div className='hr mx--32' />

                <h3 className='my-xs-20'>ENUMS</h3>
                <div className='ht' style={{ margin: '0 -25px -25px -25px' }}>
                    <Code language='json'>
                        {JSON.stringify(Collapsible.ENUMS, null, 2)}
                    </Code>
                </div>
            </>
        );
    }
}

// Default properties
CollapsibleMolecule.defaultProps = {};

export default CollapsibleMolecule;
