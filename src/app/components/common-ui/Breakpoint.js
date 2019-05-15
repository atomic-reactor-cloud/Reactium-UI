import React, { Component, Fragment } from 'react';
import op from 'object-path';

/**
 * -----------------------------------------------------------------------------
 * React Component: Breakpoint
 * -----------------------------------------------------------------------------
 */

const Empty = () => <Fragment />;

export const getBreakpoints = function(win = window, doc = window.document) {
    return new Promise(resolve => {
        let bps = {};
        const queries = String(
            win
                .getComputedStyle(doc.querySelector('body'), ':before')
                .getPropertyValue('content'),
        ).replace(/\'/g, '"');

        if (queries && queries !== 'none') {
            try {
                bps = JSON.parse(queries);

                if (typeof bps === 'string') {
                    bps = JSON.parse(bps);
                }
            } catch (err) {
                // left intentionally blank
            }
        }

        resolve(
            Object.entries(bps).reduce((bps, [key, mediaQuery]) => {
                bps[key] = win.matchMedia(mediaQuery).matches;
                return bps;
            }, {}),
        );
    });
};

export default class Breakpoint extends Component {
    constructor(props) {
        super(props);
        this.breaks = op.get(props, 'breaks', ['xs', 'sm', 'md', 'lg', 'xl']);

        this.state = {
            active: 'xs',
        };

        this.onResize = this.onResize.bind(this);
        this.mounted = false;

        // Not SSR safe
        this.window = props.iWindow ? props.iWindow : window;
        this.document = props.iWindow ? props.iDocument : window.document;
    }

    componentDidMount() {
        this.mounted = true;
        this.window.addEventListener('resize', this.onResize);
        this.window.addEventListener('load', this.onResize);
        this.onResize();
    }

    componentWillUnmount() {
        this.mounted = false;
        if (typeof this.window !== 'undefined') {
            this.window.removeEventListener('resize', this.onResize);
            this.window.removeEventListener('load', this.onResize);
        }
    }

    onResize() {
        getBreakpoints(this.window, this.document).then(bps => {
            if (this.mounted !== true) {
                return;
            }

            let active = 'xs';

            this.breaks.forEach(bp => {
                active =
                    bps[bp] && typeof this.props[bp] !== 'undefined'
                        ? bp
                        : active;
            });

            if (active !== this.state.active) {
                this.setState({ active });
            }
        });
    }

    render() {
        let { ...componentProps } = this.props;
        const { active } = this.state;
        const Content = op.get(this.props, active, Empty);

        componentProps = Object.keys(Breakpoint.defaultProps).reduce(
            (obj, key) => {
                delete componentProps[key];
                return componentProps;
            },
            componentProps,
        );

        return <Content {...componentProps} breakpoint={active} />;
    }
}

Breakpoint.defaultProps = {
    xs: undefined,
    sm: undefined,
    md: undefined,
    lg: undefined,
    xl: undefined,
    breaks: ['xs', 'sm', 'md', 'lg', 'xl'],
};
