import dz from 'dropzone';
import cn from 'classnames';
import PropTypes from 'prop-types';

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

const noop = () => {};

/**
 * -----------------------------------------------------------------------------
 * Hook Component: Dropzone
 * -----------------------------------------------------------------------------
 */
let Dropzone = (props, ref) => {
    // Refs
    const containerRef = useRef();
    const dzRef = useRef();
    const initRef = useRef(false);
    const prevStateRef = useRef({});
    const stateRef = useRef({
        files: props.files,
        initialized: initRef.current,
    });

    // State
    const config = { ...Dropzone.defaultProps.config, ...props.config };

    const [state, setNewState] = useState(stateRef.current);
    const [prevState, setPrevState] = useState(prevStateRef.current);

    const [updated, setUpdated] = useState(Date.now());

    // Internal Interface
    const setState = (newState, caller) => {
        const { debug } = props;

        newState = { ...stateRef.current, ...newState };

        if (debug === true) {
            console.log('setState()', caller, newState);
        }

        prevStateRef.current = { ...stateRef.current };
        stateRef.current = newState;

        setNewState(stateRef.current);
        setPrevState(prevStateRef.current);
        setTimeout(() => setUpdated(Date.now()), 1);
    };

    const _onFileAdded = file => {
        const { max = 0 } = stateRef.current;
        const { maxFiles = 0 } = config;
        const { onFileAdded } = props;

        if (maxFiles > 0 && max >= maxFiles) {
            return;
        }

        setTimeout(() => {
            setState(
                { files: dzRef.current.getAcceptedFiles() },
                '_onFileAdded()',
            );

            const evt = {
                type: 'added',
                file,
                files: dzRef.current.getAcceptedFiles(),
            };

            onFileAdded(evt);
        }, 100);
    };

    const _onFileRemoved = file => {
        const { onFileRemoved } = props;

        setState(
            { max: dzRef.current.getAcceptedFiles().length },
            '_onFileRemoved()',
        );

        const evt = {
            type: 'removed',
            file,
            files: dzRef.current.getAcceptedFiles(),
        };

        onFileRemoved(evt);
    };

    const _onFileError = (file, error) => {
        const { onError } = props;
        const { files } = stateRef.current;

        const evt = {
            type: 'error',
            file,
            files,
            error,
        };

        console.log('_onFileError()', evt);

        onError(evt);
    };

    const _onMaxFilesReached = () => {
        setState(
            { max: dzRef.current.getAcceptedFiles().length },
            '_onMaxFilesReached()',
        );
    };

    // External Interface
    useImperativeHandle(ref, () => ({
        container: containerRef.current,
        prevState,
        props,
        setState,
        state,
        files: {
            list: stateRef.current.files,
            remove: file => dzRef.current.removeFile(file),
        },
    }));

    // Side Effects
    useEffect(() => {
        const { initialized } = stateRef.current;

        // Dispatch onChange event
        const { files: currFiles } = stateRef.current;
        const { files: prevFiles } = prevState;

        if (
            JSON.stringify(currFiles) !== JSON.stringify(prevFiles) &&
            initialized === true
        ) {
            const { onChange } = props;

            const evt = { type: 'change', ...state };
            onChange(evt);
        }
    }, [updated]);

    useLayoutEffect(() => {
        if (!dzRef.current) {
            const { files } = stateRef.current;
            const { onInitialize } = props;
            let { maxFiles } = config;
            maxFiles = maxFiles < 1 ? null : maxFiles;

            const dzone = new dz(containerRef.current, { ...config, maxFiles });

            dzRef.current = dzone;
            initRef.current = true;

            setState({ initialized: initRef.current }, 'useLayoutEffect()');

            onInitialize({
                type: 'initialize',
                dropzone: dzRef.current,
                files,
            });

            dzRef.current.on('maxfilesreached', _onMaxFilesReached);
            dzRef.current.on('addedfile', _onFileAdded);
            dzRef.current.on('removedfile', _onFileRemoved);
            dzRef.current.on('error', _onFileError);
        }
    });

    const render = () => {
        const { children, className, namespace } = props;

        return (
            <div
                ref={containerRef}
                className={cn({ [className]: !!className, [namespace]: true })}>
                <div className='dropzone-preview' />
                {children}
            </div>
        );
    };

    return render();
};

Dropzone = forwardRef(Dropzone);

Dropzone.propTypes = {
    config: PropTypes.shape({
        acceptedFiles: PropTypes.string,
        autoProcessQueue: PropTypes.bool,
        clickable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        maxFiles: PropTypes.number,
        method: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        parallelUploads: PropTypes.number,
        paramName: PropTypes.string,
        previewsContainer: PropTypes.string,
        timeout: PropTypes.number,
        uploadMultiple: PropTypes.bool,
    }),
    className: PropTypes.string,
    debug: PropTypes.bool,
    disabled: PropTypes.bool,
    namespace: PropTypes.string,
    onChange: PropTypes.func,
    onEffect: PropTypes.func,
    onError: PropTypes.func,
    onFileAdded: PropTypes.func,
    onFileRemoved: PropTypes.func,
    onInitialize: PropTypes.func,
};

Dropzone.defaultProps = {
    config: {
        acceptedFiles: null,
        autoProcessQueue: false,
        clickable: false,
        maxFiles: 0,
        method: 'post',
        parallelUploads: 1,
        paramName: 'file',
        previewsContainer: '.ar-dropzone-preview',
        timeout: 30000,
        uploadMultiple: false,
        url: '#',
    },
    className: 'fullwidth',
    debug: true,
    disabled: false,
    namespace: 'ar-dropzone',
    onChange: noop,
    onEffect: noop,
    onError: noop,
    onFileAdded: noop,
    onFileRemoved: noop,
    onInitialize: noop,
};

export { Dropzone as default };
