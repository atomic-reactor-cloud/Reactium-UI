/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Button, Progress } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ProgressMolecule
 * -----------------------------------------------------------------------------
 */

class ProgressMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            percent: 0,
            val: 0,
        };

        this.bar = React.createRef();
        this.ival = null;
        this.timeout = null;
    }

    componentDidMount() {
        this.reset();
    }

    componentWillUnount() {
        this.cleanUp();
    }

    cleanUp = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.ival) {
            clearInterval(this.ival);
            this.ival = null;
        }
    };

    onChange = e => {
        const { percent } = e;
        this.setState({ complete: false, percent });
    };

    onComplete = () => {
        this.setState({ complete: true });
    };

    reset = () => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        if (this.ival) {
            clearInterval(this.ival);
            this.ival = null;
        }

        this.setState({ percent: 0, val: 0 });

        this.timeout = setTimeout(() => {
            this.ival = setInterval(() => {
                let { val } = this.state;

                if (val === 1) {
                    this.cleanUp();
                    return;
                }

                try {
                    val += 0.001;
                    val = Math.min(1, val);
                    this.bar.current.setState({ value: val });
                    this.setState({ val });
                } catch (err) {
                    this.cleanUp();
                }
            }, 10);
        });
    };

    render() {
        const { complete = false, percent } = this.state;

        return (
            <>
                <div className='mb-xs-20'>
                    <Progress
                        value={0.5}
                        appearance={Progress.ENUMS.APPEARANCE.PILL}>
                        50%
                    </Progress>
                </div>

                {Object.values(Progress.ENUMS.COLOR).map((color, i) => {
                    if (i === 0) {
                        return null;
                    }

                    const v =
                        i / (Object.values(Progress.ENUMS.COLOR).length - 1);
                    const p = Math.min(100, Math.ceil(v * 100));

                    return (
                        <div
                            className='mb-xs-20'
                            key={`progress-${color}-${i}`}>
                            <Progress
                                color={color}
                                size={Progress.ENUMS.SIZE.XS}
                                value={v}>
                                {p}%
                            </Progress>
                        </div>
                    );
                })}

                <div className='row'>
                    <div className='col-xs-12 col-sm-10 col-md-11'>
                        <Progress
                            value={0}
                            ref={this.bar}
                            size={Button.ENUMS.SIZE.XS}
                            onChange={this.onChange}
                            onComplete={this.onComplete}
                            color={Progress.ENUMS.COLOR.DANGER}>
                            {percent && !complete && <span>{percent}%</span>}
                            {complete && <span>Complete!</span>}
                        </Progress>
                    </div>
                    <div className='col-xs-12 col-sm-2 col-md-1 pl-sm-8 pt-sm-0 pt-xs-8'>
                        <Button
                            block
                            disabled={!complete}
                            onClick={this.reset}
                            size={Button.ENUMS.SIZE.XS}
                            color={Button.ENUMS.COLOR.SECONDARY}>
                            Restart
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

// Default properties
ProgressMolecule.defaultProps = {};

export default ProgressMolecule;
