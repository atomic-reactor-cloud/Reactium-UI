/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Feather } from 'components/common-ui/Icon';
import { Checkpoints } from 'components/common-ui';

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
                    <span className='flex-middle flex-center'>
                        Upload your .csv files
                        <span className='ml-xs-4'>
                            <Feather.HelpCircle width={16} height={16} />
                        </span>
                    </span>
                ),
                icon: <Feather.Check />,
            },
            {
                label: (
                    <span className='flex-middle flex-center pl-xs-8'>
                        Map your data
                        <span className='ml-xs-4'>
                            <Feather.HelpCircle width={16} height={16} />
                        </span>
                    </span>
                ),
                icon: <Feather.Check />,
                value: 'TEST',
            },
            {
                label: (
                    <span className='flex-middle flex-center pl-xs-8'>
                        Review and submit
                        <span className='ml-xs-4'>
                            <Feather.HelpCircle width={16} height={16} />
                        </span>
                    </span>
                ),
                icon: <Feather.Check />,
            },
        ],
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.checkpoints = null;
    }

    onCheckpointChange = () => {
        // console.log('onCheckpointChange()', e);
        console.log(this.checkpoints.value);
    };

    onNext = () => {
        this.checkpoints.next();
    };

    onPrev = () => {
        this.checkpoints.prev();
    };

    onComplete = () => {
        this.checkpoints.complete();
    };

    onRestart = () => {
        this.checkpoints.restart();
    };

    render() {
        const { points } = this.props;

        return (
            <>
                <div className='flex-center'>
                    <Checkpoints
                        ref={elm => {
                            this.checkpoints = elm;
                        }}
                        index={1}
                        points={points}
                        name='checkpoints-toolkit-demo'
                        onChange={this.onCheckpointChange}
                    />
                </div>
                <div className='mt-xs-40 flex-center'>
                    <div className='btn-group'>
                        <button
                            title='Restart'
                            className='btn-tertiary-xs'
                            onClick={this.onRestart}>
                            <Feather.ChevronsLeft width={14} height={14} />
                        </button>
                        <button
                            title='Previous'
                            className='btn-tertiary-xs'
                            onClick={this.onPrev}>
                            <Feather.ChevronLeft width={14} height={14} />
                        </button>
                        <button
                            title='Next'
                            className='btn-tertiary-xs'
                            onClick={this.onNext}>
                            <Feather.ChevronRight width={14} height={14} />
                        </button>
                        <button
                            title='Complete'
                            className='btn-tertiary-xs'
                            onClick={this.onComplete}>
                            <Feather.ChevronsRight width={14} height={14} />
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default CheckpointsMolecule;
