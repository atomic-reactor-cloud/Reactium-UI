/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component } from 'react';
import { Button, Icon, Toast, Tooltip } from 'components/common-ui';

/**
 * -----------------------------------------------------------------------------
 * Toolkit Element: ToastMolecule
 * -----------------------------------------------------------------------------
 */
// "default", "success", "info", "warning", "error".

export default class ToastMolecule extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    state = {
        icons: [
            <Icon.Feather.Activity key='toast-demo-icon-0' />,
            <Icon.Feather.Check key='toast-demo-icon-1' />,
            <Icon.Feather.AlertTriangle key='toast-demo-icon-2' />,
            <Icon.Feather.AlertOctagon key='toast-demo-icon-3' />,
            <Icon.Feather.MessageSquare key='toast-demo-icon-4' />,
        ],
    };

    render() {
        return (
            <div style={{ minHeight: 400 }}>
                <div className='btn-group' style={{ width: 228 }}>
                    <Button
                        color={Button.ENUMS.COLOR.TERTIARY}
                        title='Autoclose in 4 seconds'
                        data-tooltip
                        data-auto-close={4000}
                        data-type={Toast.TYPE.INFO}
                        data-message='Autoclose in 4 seconds'
                        onClick={e => Toast.show(e.currentTarget.dataset)}>
                        <Icon.Linear.Timer />
                    </Button>
                    {Object.values(Toast.TYPE).map((TYPE, i) => (
                        <Button
                            key={`toast-demo-${i}`}
                            title={`Toast type - ${TYPE}`}
                            color={TYPE}
                            data-tooltip
                            data-type={TYPE}
                            data-message={`Toast type: ${TYPE}`}
                            onClick={e =>
                                Toast.show({
                                    ...e.currentTarget.dataset,
                                    icon: this.state.icons[i],
                                })
                            }>
                            {this.state.icons[i]}
                        </Button>
                    ))}
                </div>
                <Toast />
                <Tooltip
                    iWindow={this.props.iWindow}
                    align={Tooltip.ENUMS.ALIGN.RIGHT}
                    verticalAlign={Tooltip.ENUMS.VERTICAL_ALIGN.MIDDLE}
                />
            </div>
        );
    }
}
