/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Dialog from 'components/common-ui/Dialog';
import { Feather } from 'components/common-ui/Icon';
import Button from 'components/common-ui/Button';
import op from 'object-path';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: DialogMolecule
 * -----------------------------------------------------------------------------
 */

class DialogMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = { visible: true };
        this.dialog = null;
    }

    onToggle = e => {
        const { visible } = e.target.state;
        this.setState({ visible });
    };

    footerElements = () => [
        <span>Are you sure?</span>,
        <Button
            outline
            className='ml-xs-12'
            color={Button.ENUMS.COLOR.DANGER}
            onClick={() => this.dialog.hide()}>
            Cancel
        </Button>,
        <Button className='ml-xs-8'>Yes</Button>,
    ];

    render() {
        const { visible } = this.state;

        return (
            <div style={{ minHeight: 400 }}>
                <div className='flex-center pb-32'>
                    <Button
                        onClick={() => this.dialog.toggle.visible()}
                        style={{ width: 140 }}>
                        {visible === true ? 'Hide Dialog' : 'Show Dialog'}
                    </Button>
                </div>
                <Dialog
                    ref={elm => (this.dialog = elm)}
                    dismissable
                    pref='toolkit.dialog-1'
                    onHide={this.onToggle}
                    onShow={this.onToggle}
                    visible={visible}
                    header={{ title: 'Confirm Something' }}
                    footer={{
                        elements: this.footerElements(),
                    }}>
                    <p className='p-xs-16'>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio. Nam libero tempore, cum
                        soluta nobis est eligendi optio cumque nihil impedit quo
                        minus id quod maxime placeat facere possimus, omnis
                        voluptas assumenda est, omnis dolor repellendus.
                        Temporibus autem quibusdam et aut officiis debitis aut
                        rerum necessitatibus saepe eveniet ut et voluptates
                        repudiandae sint et molestiae non recusandae. Itaque
                        earum rerum hic tenetur a sapiente delectus, ut aut
                        reiciendis voluptatibus maiores alias consequatur aut
                        perferendis doloribus asperiores repellat.
                    </p>
                </Dialog>
            </div>
        );
    }
}

// Default properties
DialogMolecule.defaultProps = {};

export default DialogMolecule;
