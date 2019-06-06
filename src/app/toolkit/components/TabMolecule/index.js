/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Button, Collapsible, Icon, Tabs } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: TabMolecule
 * -----------------------------------------------------------------------------
 */

export default class TabMolecule extends Component {
    static defaultProps = {
        expanded: true,
    };

    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.collapsible = null;
        this.toggleButton = null;
    }

    toggle = e =>
        this.collapsible.toggle(e).then(() => {
            const { expanded } = this.collapsible.state;
            const buttonChildren =
                expanded === true ? (
                    <Icon.Feather.ChevronUp />
                ) : (
                    <Icon.Feather.ChevronDown />
                );
            this.toggleButton.setState({ children: buttonChildren });
        });

    render() {
        const { expanded } = this.props;
        return (
            <Tabs>
                <div data-tab-bar>
                    <button type='button'>Tab 1</button>
                    <button type='button'>Tab 2</button>
                    <button type='button'>Tab 3</button>
                    <button type='button'>Tab 4</button>
                    <span
                        style={{
                            position: 'absolute',
                            right: -1,
                            top: -1,
                            zIndex: 1000,
                        }}>
                        <Button
                            ref={elm => (this.toggleButton = elm)}
                            onClick={this.toggle}
                            style={{
                                width: 37,
                                height: 37,
                                padding: 0,
                                borderRadius: 0,
                            }}>
                            {expanded === true && <Icon.Feather.ChevronUp />}
                            {expanded !== true && <Icon.Feather.ChevronDown />}
                        </Button>
                    </span>
                </div>
                <Collapsible ref={elm => (this.collapsible = elm)}>
                    <div data-tabs>
                        <div>Tab 1 </div>
                        <div>Tab 2</div>
                        <div>Tab 3</div>
                        <div>Tab 4</div>
                    </div>
                </Collapsible>
            </Tabs>
        );
    }
}
