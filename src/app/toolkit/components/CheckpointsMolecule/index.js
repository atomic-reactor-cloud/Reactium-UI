/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import Sass from './Sass';
import Events from './Events';
import Methods from './Methods';
import Code from 'toolkit/Code';
import Properties from './Properties';
import React, { Component } from 'react';
import { Checkpoints, Icon } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: CheckpointsMolecule
 * -----------------------------------------------------------------------------
 */

class CheckpointsMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    static defaultProps = {
        points: [
            {
                label: (
                    <span className='flex middle center'>Select a file</span>
                ),
                icon: <Icon name='Linear.FileSpreadsheet' size={20} />,
            },
            {
                label: (
                    <span className='flex middle center'>Map your data</span>
                ),
                icon: <Icon name='Linear.ChartBars' size={18} />,
            },
            {
                label: <span className='flex middle center'>Review</span>,
                icon: <Icon name='Feather.Check' size={20} />,
            },
            {
                label: <span className='flex middle center'>Upload</span>,
                icon: <Icon name='Feather.UploadCloud' size={20} />,
            },
        ],
    };

    constructor(props) {
        super(props);
        this.state = { value: null };
        this.checkpoints = null;
    }

    Demo = () => {
        const { points } = this.props;
        const { value } = this.state;

        return (
            <>
                <div>
                    <Checkpoints
                        readOnly
                        index={-1}
                        points={points}
                        name='checkpoints-toolkit-demo'
                        ref={elm => (this.checkpoints = elm)}
                        onChange={({ value }) => this.setState({ value })}
                    />
                </div>
                <div className='text-center mt-xs-16'>
                    {Array.isArray(value)
                        ? 'Complete!'
                        : value !== null
                        ? value
                        : 'Start!'}
                </div>
                <div className='mt-xs-16 flex-center'>
                    <div className='btn-group'>
                        <button
                            title='Restart'
                            className='btn-tertiary-xs'
                            onClick={() => this.checkpoints.first()}>
                            <Icon name='Feather.ChevronsLeft' size={14} />
                        </button>
                        <button
                            title='Previous'
                            className='btn-tertiary-xs'
                            onClick={() => this.checkpoints.prev()}>
                            <Icon name='Feather.ChevronLeft' size={14} />
                        </button>
                        <button
                            title='Next'
                            className='btn-tertiary-xs'
                            onClick={() => this.checkpoints.next()}>
                            <Icon name='Feather.ChevronRight' size={14} />
                        </button>
                        <button
                            title='Complete'
                            className='btn-tertiary-xs'
                            onClick={() => this.checkpoints.last()}>
                            <Icon name='Feather.ChevronsRight' size={14} />
                        </button>
                    </div>
                </div>
            </>
        );
    };

    render() {
        const { Demo } = this;

        return (
            <>
                <div className='mb-xs-32'>
                    <p>
                        The Checkpoints component is useful when you want to
                        track progress with milestones or when certain
                        activities have been completed.
                    </p>
                </div>

                <Demo />

                <div className='hr mx--32' />

                <h3 className='my-xs-20'>Import</h3>
                <div className='ht' style={{ margin: '0 -25px' }}>
                    <Code>
                        {
                            "import { Checkpoints } from '@atomic-reactor/reactium-ui';"
                        }
                    </Code>
                </div>

                <h3 className='my-xs-20'>Usage</h3>
                <div className='ht' style={{ margin: '0 -25px -25px -25px' }}>
                    <Code>{`const points = [
                        {
                            label: (
                                <span className='flex middle center'>Select a file</span>
                            ),
                            icon: <Icon name='Linear.FileSpreadsheet' />,
                            value: 0,
                        },
                        {
                            label: (
                                <span className='flex middle center'>Map your data</span>
                            ),
                            icon: <Icon name='Linear.ChartBars' />,
                            value: 1,
                        },
                        {
                            label: <span className='flex middle center'>Review</span>,
                            icon: <Icon name='Feather.Check' />,
                            value: 2,
                        },
                        {
                            label: <span className='flex middle center'>Upload</span>,
                            icon: <Icon name='Feather.UploadCloud' />,
                            value: 3
                        },
                    ];`}</Code>

                    <Code>{`<Checkpoints
                        readOnly
                        index={0}
                        points={points}
                        name='checkpoints'
                        onChange={console.log}
                        ref={elm => (this.checkpoints = elm)} />`}</Code>
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
                <div className='ht' style={{ margin: '0 -25px' }}>
                    <Code language='json'>
                        {JSON.stringify(Checkpoints.ENUMS, null, 2)}
                    </Code>
                </div>

                <h3 className='my-xs-20'>SCSS</h3>
                <div className='ht' style={{ margin: '0 -25px -25px -25px' }}>
                    <Code language='scss'>{Sass()}</Code>
                </div>
            </>
        );
    }
}

export default CheckpointsMolecule;
