/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { TagsInput } from 'components/common-ui';
import countries from './countries';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: TagsInputMolecule
 * -----------------------------------------------------------------------------
 */

class TagsInputMolecule extends Component {
    static defaultProps = {
        data: countries,
        value: ['US', 'MX', 'FR', 'GB'],
    };

    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = () => {
        this.setState({ error: null });
    };

    onError = e => {
        const { error } = e;
        this.setState({ error });
    };

    formatter = value => String(value).toUpperCase();

    validator = (value, e) => {
        return value.length === 2 && typeof value === 'string'
            ? true
            : {
                  event: e,
                  message: 'Invalid country code',
                  code: 1,
              };
    };

    render() {
        const { error } = this.state;
        const { data, value } = this.props;
        return (
            <>
                <TagsInput
                    sortable
                    name='tags'
                    placeholder='Add tags'
                    data={data}
                    value={value}
                    validator={this.validator}
                    formatter={this.formatter}
                    onChange={this.onChange}
                    onError={this.onError}
                />
                {error && (
                    <div className='pt-xs-8'>
                        <small className='red'>{error.message}</small>
                    </div>
                )}
            </>
        );
    }
}

export default TagsInputMolecule;
