/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Image } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ImageMolecule
 * -----------------------------------------------------------------------------
 */

class ImageMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = { breakpoint: null };
        this.iref = React.createRef();
    }

    onResize = ({ breakpoint }) => this.setState({ breakpoint });

    render() {
        const { breakpoint = null } = this.state;
        return (
            <>
                <div style={{ height: 40 }} className='text-center'>
                    {breakpoint}
                </div>
                <Image
                    iWindow={this.props.iWindow}
                    iDocument={this.props.iDocument}
                    onResize={this.onResize}
                    lowRes={{
                        xs:
                            'https://reactium-cnd.sfo2.cdn.digitaloceanspaces.com/demo/demo-1x1.jpg',
                        sm:
                            'https://reactium-cnd.sfo2.cdn.digitaloceanspaces.com/demo/demo-3x2.jpg',
                        lg:
                            'https://reactium-cnd.sfo2.cdn.digitaloceanspaces.com/demo/demo-16x9.jpg',
                    }}
                    highRes={{
                        xs:
                            'https://reactium-cnd.sfo2.cdn.digitaloceanspaces.com/demo/demo-1x1@2.jpg',
                        sm:
                            'https://reactium-cnd.sfo2.cdn.digitaloceanspaces.com/demo/demo-3x2@2.jpg',
                        lg:
                            'https://reactium-cnd.sfo2.cdn.digitaloceanspaces.com/demo/demo-16x9@2.jpg',
                    }}
                />
            </>
        );
    }
}

// Default properties
ImageMolecule.defaultProps = {};

export default ImageMolecule;
