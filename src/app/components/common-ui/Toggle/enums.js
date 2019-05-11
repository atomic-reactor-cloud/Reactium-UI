import { ENUMS as BUTTON_ENUMS } from 'components/common-ui/Button';

export default {
    ALIGN: {
        LEFT: 'left',
        RIGHT: 'right',
    },
    COLOR: { ...BUTTON_ENUMS.COLOR },
    TYPE: {
        CHECKBOX: 'checkbox',
        RADIO: 'radio',
    }
};
