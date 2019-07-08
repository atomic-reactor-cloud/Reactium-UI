/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */

import _ from 'underscore';
import React, { Component } from 'react';
import { Button, Icon } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * React Component: Icons
 * -----------------------------------------------------------------------------
 */

export default class FeatherIcons extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    state = {
        filtered: [],
        icons: [],
        ready: false,
        search: null,
        size: 24,
    };

    componentDidMount() {
        const icons = Object.keys(Icon.Feather);
        icons.sort();

        setTimeout(() => {
            this.setState({ icons, ready: true });
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('resize'));
            }
        }, 100);
    }

    onSearchChange(e) {
        const { icons } = this.state;
        const search = e.target.value;
        const filtered = icons.filter(icon => {
            const reg = new RegExp(search, 'gi');
            return icon.search(reg) > -1;
        });

        this.setState({ filtered, search });
    }

    onSizeChange(e) {
        const size = e.target.value;
        this.setState({ size });
    }

    render() {
        const {
            filtered = [],
            icons = [],
            ready,
            search,
            searchStyle,
            size = 24,
        } = this.state;
        const items = search ? filtered : icons;

        return ready === false ? null : (
            <div className='mb--32'>
                <div className='flex center mb-xs-24'>
                    <div className='btn-group'>
                        <Button
                            readOnly
                            size={Button.ENUMS.SIZE.MD}
                            style={{ padding: '0 16px' }}
                            color={Button.ENUMS.COLOR.SECONDARY}>
                            Icon Size:
                        </Button>
                        <div className='form-group'>
                            <input
                                type='number'
                                value={size}
                                id='size'
                                onChange={this.onSizeChange.bind(this)}
                                max={120}
                                min={10}
                                style={{ textAlign: 'center' }}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='search'
                                placeholder='Search'
                                value={search || ''}
                                id='search'
                                autoComplete='off'
                                onChange={this.onSearchChange.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {items.map((item, i) => (
                        <div
                            key={`icon-feather-${i}`}
                            className='col-xs-6 col-sm-4 col-lg-3 col-xl-2'>
                            <div className='text-center'>
                                <Icon size={size} name={`Feather.${item}`} />
                                <div className='text-center small mt-16 mb-32'>
                                    {item}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
