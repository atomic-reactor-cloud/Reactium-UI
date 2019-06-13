import { ToastContainer, toast } from 'react-toastify';
import { Feather } from 'components/common-ui/Icon';
import Button from 'components/common-ui/Button';
import React, { forwardRef } from 'react';

const CloseButton = () => (
    <Button
        className='Toastify__close-button'
        color={Button.ENUMS.COLOR.CLEAR}
        size={Button.ENUMS.SIZE.XS}>
        <Feather.X className='close' width={18} height={18} />
    </Button>
);

let Toast = (props, ref) => (
    <ToastContainer ref={ref} {...props} closeButton={<CloseButton />} />
);

Toast = forwardRef(Toast);

Toast[toast.TYPE.DEFAULT] = toast;

Toast.show = ({
    autoClose = false,
    icon,
    message = null,
    position = Toast.POSITION.TOP_RIGHT,
    type = Toast.TYPE.DEFAULT,
}) => {
    if (!message) {
        return;
    }

    if (!message) {
        return;
    }

    const Ico = icon ? () => icon : () => <span style={{ marginLeft: 4 }} />;

    message = (
        <>
            {Ico && <Ico />}
            {message}
        </>
    );

    type = Object.values(Toast.TYPE).includes(type) ? type : Toast.TYPE.DEFAULT;

    const config = { autoClose, position };

    return Toast[type](message, config);
};

Object.keys(toast).forEach(key => (Toast[key] = toast[key]));

export { Toast as default };
