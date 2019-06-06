/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import Collapsible from 'components/common-ui/Collapsible';
import Button from 'components/common-ui/Button';
import { Feather } from 'components/common-ui/Icon';

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
    }

    collapse = () => this.collapsible.collapse();

    toggle = () => this.collapsible.toggle();

    render() {
        return (
            <div style={{ minHeight: 140 }}>
                <div className='mb-xs-8'>
                    <Button onClick={this.toggle}>Toggle Collapsible</Button>
                </div>
                <Collapsible ref={elm => (this.collapsible = elm)}>
                    <div className='pr-xs-32'>
                        <p className='bg-blue white p-xs-20'>
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
                    </div>
                    <div style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Button
                            size={Button.ENUMS.SIZE.XS}
                            onClick={this.collapse}
                            style={{ width: 33 }}>
                            <Feather.X />
                        </Button>
                    </div>
                </Collapsible>
            </div>
        );
    }
}

// Default properties
CollapsibleMolecule.defaultProps = {};

export default CollapsibleMolecule;
