/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Button, TagsInput } from 'components/common-ui';
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
        this.tagsinput = React.createRef();
    }

    onChange = () => {
        const tags = this.tagsinput.current.value;
        this.setState({ error: null, tags });
    };

    onError = e => {
        const { error } = e;
        this.setState({ error });
    };

    onClick = () => {
        const tags = this.tagsinput.current.value;
        this.setState({ tags });
        console.log({ tags });
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
        const { tags, error } = this.state;
        const { data, value } = this.props;
        return (
            <div style={{ minHeight: 300 }}>
                <div className='row'>
                    <div className='col-xs-12 col-sm-10 col-lg-11 pr-xs-0 pr-sm-8'>
                        <TagsInput
                            ref={this.tagsinput}
                            iWindow={this.props.iWindow}
                            iDocument={this.props.iDocument}
                            editable={true}
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
                    </div>
                    <div className='col-xs-12 col-sm-2 col-lg-1 py-xs-20 py-sm-0 flex-stretch'>
                        <Button
                            onClick={this.onClick}
                            block
                            style={{ height: '100%' }}>
                            Log Value
                        </Button>
                    </div>
                </div>
                {!error && tags && (
                    <div className='pt-xs-8 flex-center'>
                        <small>{tags.join(', ')}</small>
                    </div>
                )}
                {error && (
                    <div className='pt-xs-8 flex-center'>
                        <small className='red'>{error.message}</small>
                    </div>
                )}
            </div>
        );
    }
}

export default TagsInputMolecule;
