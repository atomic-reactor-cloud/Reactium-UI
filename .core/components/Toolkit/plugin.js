import loadable from '@loadable/component';
const Toolkit = loadable(() => import('./Toolkit'));

export default {
    /**
     * Required - used as rendering key. Make this unique.
     * @type {String}
     */
    id: 'Toolkit',

    /**
     * Component to render. May also be a string, and
     * the component will be looked up in components directory.
     * @type {Component|String}
     */
    component: Toolkit,

    /**
     * One or more zones this component should render.
     * @type {String|Array}
     */
    zone: 'toolkit',

    /**
     * By default plugins in zone are rendering in ascending order.
     * @type {Number}
     */
    order: 0,

    /**
     * (Optional) additional search subpaths to use to find the component,
     * if String provided for component property.
     * @type {[type]}
     *
     * e.g. If component is a string 'TextInput', uncommenting the line below would
     * look in components/common-ui/form/inputs and components/general to find
     * the component 'TextInput'
     */
    // paths: ['common-ui/form/inputs', 'general']

    /**
     * Additional params: (optional)
     *
     * Any free-form additional properties you provide below, will be provided as params
     * to the component when rendered.
     *
     * e.g. Below will be provided to the MyComponent, <MyComponent pageType={'home'} />
     * These can also be used to help sort or filter plugins, or however you have your
     * component use params.
     * @type {Mixed}
     */
    // pageType: 'home',
};
