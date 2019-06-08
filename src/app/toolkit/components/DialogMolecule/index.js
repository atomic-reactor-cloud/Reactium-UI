/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Dialog from 'components/common-ui/Dialog';
import { Feather } from 'components/common-ui/Icon';
import Button from 'components/common-ui/Button';

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
        this.state = {};
    }

    render() {
        return (
            <div style={{ minHeight: 500 }}>
                <Dialog>
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
