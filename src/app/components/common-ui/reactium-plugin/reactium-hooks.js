import Reactium from '@atomic-reactor/reactium-sdk-core';

const ReactiumUI = require('./index');

const pluginInit = async () => {
    await Reactium.Plugin.register(
        'ReactiumUI',
        Reactium.Enums.priority.lowest,
    );

    Reactium.Component.register('ReactiumUI', ReactiumUI);
};

pluginInit();
