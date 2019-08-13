/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Button, Modal } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ModalMolecule
 * -----------------------------------------------------------------------------
 */

class ModalMolecule extends Component {
    static defaultProps = {};

    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.modal = React.createRef();
    }

    showModal = () => {
        this.modal.current.show(
            <div className='bg-white' style={{ height: '200vh' }}>
                {Date.now()}
            </div>,
        );
    };

    render() {
        return (
            <div style={{ minHeight: 400 }}>
                <div className='flex-center'>
                    <Button onClick={this.showModal}>Show Modal</Button>
                </div>
                <Modal ref={this.modal} />
            </div>
        );
    }
}

export default ModalMolecule;
