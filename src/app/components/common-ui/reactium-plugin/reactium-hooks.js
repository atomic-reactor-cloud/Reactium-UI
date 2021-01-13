import Reactium from '@atomic-reactor/reactium-sdk-core';

const ReactiumUI = require('../index');
const priority = Reactium.Enums.priority.lowest;

Reactium.Plugin.register('ReactiumUI', priority).then(() => {
    Reactium.Hook.runSync('reactium-ui', ReactiumUI);
    Reactium.Component.register('ReactiumUI', ReactiumUI);
});
