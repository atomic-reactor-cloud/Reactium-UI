module.exports = {
    header: {
        name: 'Reactium',
        title: 'Reactium UI',
        logo: '/assets/images/atomic-reactor-logo.svg',
        version: '0.0.43',
    },
    overview: require('appdir/toolkit/overview').default,
    themes: [
        {
            name: 'Reactium UI',
            css: '/assets/style/reactium-ui.css',
            selected: true,
        },
    ],
    sidebar: {
        closed: false,
        position: 'left',
    },
    toolbar: {
        buttons: [
            {
                icon: 'Dna',
                name: 'filter-all',
                label: 'All Elements',
            },
            {
                icon: 'Atom',
                name: 'filter-atom',
                label: 'Atoms',
            },
            {
                icon: 'Molecule',
                name: 'filter-molecule',
                label: 'Molecules',
            },
            {
                icon: 'Organism',
                name: 'filter-organism',
                label: 'Organisms',
            },
            {
                icon: 'Settings',
                name: 'toggle-settings',
                cls: 'toggle',
            },
        ],
    },
    menu: {
        global: {
            label: 'Global',
            route: '/toolkit/global',
            elements: {
                theming: {
                    type: 'organism',
                    label: 'Theming',
                    route: '/toolkit/global/theming',
                    dna: '/toolkit/global/Theming',
                    component: require('appdir/toolkit/global/Theming').default,
                    readme: require('appdir/toolkit/global/Theming/readme')
                        .default,
                    hideCode: true,
                    hideDna: true,
                    hideDocs: false,
                },
                colors: {
                    type: 'atom',
                    label: 'Colors',
                    hideCode: true,
                    route: '/toolkit/global/colors',
                    dna: '/toolkit/global/Colors',
                    component: require('appdir/toolkit/global/Colors').default,
                    readme: require('appdir/toolkit/global/Colors/readme')
                        .default,
                },
                grid: {
                    type: 'atom',
                    label: 'Responsive Grid',
                    route: '/toolkit/global/grid',
                    dna: '/toolkit/global/Grid',
                    hideCode: true,
                    hideDna: true,
                    hideDocs: true,
                    component: require('appdir/toolkit/global/Grid').default,
                    readme: require('appdir/toolkit/global/Grid/readme')
                        .default,
                },
                spacing: {
                    type: 'atom',
                    label: 'Spacing',
                    route: '/toolkit/global/spacing',
                    dna: '/toolkit/global/Spacing',
                    hideCode: true,
                    hideDna: true,
                    hideDocs: true,
                    component: require('appdir/toolkit/global/Spacing').default,
                    readme: require('appdir/toolkit/global/Spacing/readme')
                        .default,
                },
            },
        },
        typography: {
            label: 'Typography',
            route: '/toolkit/typography',
            elements: {
                fonts: {
                    type: 'atom',
                    label: 'Fonts',
                    route: '/toolkit/typography/fonts',
                    dna: '/toolkit/typography/Fonts',
                    hideDna: true,
                    hideCode: true,
                    hideDocs: true,
                    component: require('appdir/toolkit/typography/Fonts')
                        .default,
                    readme: require('appdir/toolkit/typography/Fonts/readme')
                        .default,
                },
                headings: {
                    type: 'atom',
                    label: 'Headings',
                    route: '/toolkit/typography/headings',
                    dna: '/toolkit/typography/Headings',
                    hideCode: true,
                    component: require('appdir/toolkit/typography/Headings')
                        .default,
                    readme: require('appdir/toolkit/typography/Headings/readme')
                        .default,
                },
                paragraph: {
                    type: 'atom',
                    label: 'Paragraph',
                    route: '/toolkit/typography/paragraph',
                    dna: '/toolkit/typography/Paragraph',
                    component: require('appdir/toolkit/typography/Paragraph')
                        .default,
                    readme: require('appdir/toolkit/typography/Paragraph/readme')
                        .default,
                },
                'text-link': {
                    type: 'atom',
                    label: 'Text Link',
                    route: '/toolkit/typography/text-link',
                    dna: '/toolkit/typography/TextLink',
                    hideDna: true,
                    hideCode: true,
                    component: require('appdir/toolkit/typography/TextLink')
                        .default,
                    readme: require('appdir/toolkit/typography/TextLink/readme')
                        .default,
                },
                'text-strong': {
                    type: 'atom',
                    label: 'Strong Text',
                    route: '/toolkit/typography/text-strong',
                    dna: '/toolkit/typography/TextStrong',
                    component: require('appdir/toolkit/typography/TextStrong')
                        .default,
                    readme: require('appdir/toolkit/typography/TextStrong/readme')
                        .default,
                },
                'text-italic': {
                    type: 'atom',
                    label: 'Italic Text',
                    route: '/toolkit/typography/text-italic',
                    dna: '/toolkit/typography/TextItalic',
                    component: require('appdir/toolkit/typography/TextItalic')
                        .default,
                    readme: require('appdir/toolkit/typography/TextItalic/readme')
                        .default,
                },
                'text-underline': {
                    type: 'atom',
                    label: 'Underlined Text',
                    route: '/toolkit/typography/text-underline',
                    dna: '/toolkit/typography/TextUnderline',
                    component: require('appdir/toolkit/typography/TextUnderline')
                        .default,
                    readme: require('appdir/toolkit/typography/TextUnderline/readme')
                        .default,
                },
                'text-strike': {
                    type: 'atom',
                    label: 'Strikethrough Text',
                    route: '/toolkit/typography/text-strike',
                    dna: '/toolkit/typography/TextStrike',
                    component: require('appdir/toolkit/typography/TextStrike')
                        .default,
                    readme: require('appdir/toolkit/typography/TextStrike/readme')
                        .default,
                },
                'text-super': {
                    type: 'atom',
                    label: 'Superscript',
                    route: '/toolkit/typography/text-super',
                    dna: '/toolkit/typography/TextSuper',
                    component: require('appdir/toolkit/typography/TextSuper')
                        .default,
                    readme: require('appdir/toolkit/typography/TextSuper/readme')
                        .default,
                },
                'text-sub': {
                    type: 'atom',
                    label: 'Subscript',
                    route: '/toolkit/typography/text-sub',
                    dna: '/toolkit/typography/TextSub',
                    component: require('appdir/toolkit/typography/TextSub')
                        .default,
                    readme: require('appdir/toolkit/typography/TextSub/readme')
                        .default,
                },
                'text-small': {
                    type: 'atom',
                    label: 'Small Text',
                    route: '/toolkit/typography/text-small',
                    dna: '/toolkit/typography/TextSmall',
                    component: require('appdir/toolkit/typography/TextSmall')
                        .default,
                    readme: require('appdir/toolkit/typography/TextSmall/readme')
                        .default,
                },
                blockquote: {
                    type: 'atom',
                    label: 'Blockquote',
                    route: '/toolkit/typography/blockquote',
                    dna: '/toolkit/typography/Blockquote',
                    component: require('appdir/toolkit/typography/Blockquote')
                        .default,
                    readme: require('appdir/toolkit/typography/Blockquote/readme')
                        .default,
                },
                'list-unordered': {
                    type: 'atom',
                    label: 'Unordered List',
                    route: '/toolkit/typography/list-unordered',
                    dna: '/toolkit/typography/ListUnordered',
                    component: require('appdir/toolkit/typography/ListUnordered')
                        .default,
                    readme: require('appdir/toolkit/typography/ListUnordered/readme')
                        .default,
                },
                'list-ordered': {
                    type: 'atom',
                    label: 'Ordered List',
                    route: '/toolkit/typography/list-ordered',
                    dna: '/toolkit/typography/ListOrdered',
                    component: require('appdir/toolkit/typography/ListOrdered')
                        .default,
                    readme: require('appdir/toolkit/typography/ListOrdered/readme')
                        .default,
                },
                'text-align': {
                    type: 'atom',
                    label: 'Text Align',
                    hideCode: true,
                    hideDna: true,
                    hideDocs: true,
                    route: '/toolkit/typography/text-align',
                    dna: '/toolkit/typography/TextAlign',
                    component: require('appdir/toolkit/typography/TextAlign')
                        .default,
                    readme: require('appdir/toolkit/typography/TextAlign/readme')
                        .default,
                },
            },
        },
        buttons: {
            label: 'Buttons',
            route: '/toolkit/buttons/button-overview',
            elements: {
                'button-overview': {
                    type: 'organism',
                    label: 'Overview',
                    route: '/toolkit/buttons/button-overview',
                    dna: '/toolkit/buttons/ButtonOverview',
                    hideCode: true,
                    component: require('appdir/toolkit/buttons/ButtonOverview')
                        .default,
                },
                'button-state': {
                    type: 'atom',
                    label: 'Button States',
                    route: '/toolkit/buttons/button-state',
                    dna: '/toolkit/buttons/ButtonState',
                    hideDna: true,
                    hideCode: true,
                    component: require('appdir/toolkit/buttons/ButtonState')
                        .default,
                    readme: require('appdir/toolkit/buttons/ButtonState/readme')
                        .default,
                },
                'button-size': {
                    type: 'atom',
                    label: 'Button Sizing',
                    route: '/toolkit/buttons/button-size',
                    dna: '/toolkit/buttons/ButtonSize',
                    hideDna: true,
                    hideCode: true,
                    component: require('appdir/toolkit/buttons/ButtonSize')
                        .default,
                    readme: require('appdir/toolkit/buttons/ButtonSize/readme')
                        .default,
                },
                'button-block': {
                    type: 'atom',
                    label: 'Button Block',
                    route: '/toolkit/buttons/button-block',
                    dna: '/toolkit/buttons/ButtonBlock',
                    hideDna: true,
                    component: require('appdir/toolkit/buttons/ButtonBlock')
                        .default,
                    readme: require('appdir/toolkit/buttons/ButtonBlock/readme')
                        .default,
                },
            },
        },
        form: {
            label: 'Form Elements',
            route: '/toolkit/form',
            elements: {
                'checkbox-atom': {
                    type: 'atom',
                    label: 'Checkbox',
                    route: '/toolkit/form/checkbox-atom',
                    dna: '/toolkit/form/CheckboxAtom',
                    component: require('appdir/toolkit/form/CheckboxAtom')
                        .default,
                    readme: require('appdir/toolkit/form/CheckboxAtom/readme')
                        .default,
                    hideCode: true,
                },
                'radio-atom': {
                    type: 'atom',
                    label: 'Radio',
                    route: '/toolkit/form/radio-atom',
                    dna: '/toolkit/form/RadioAtom',
                    component: require('appdir/toolkit/form/RadioAtom').default,
                    readme: require('appdir/toolkit/form/RadioAtom/readme')
                        .default,
                    hideCode: true,
                },
                'toggle-molecule': {
                    type: 'molecule',
                    label: 'Toggle',
                    route: '/toolkit/form/toggle-molecule',
                    dna: '/toolkit/form/ToggleMolecule',
                    component: require('appdir/toolkit/form/ToggleMolecule')
                        .default,
                    readme: require('appdir/toolkit/form/ToggleMolecule/readme')
                        .default,
                    hideCode: true,
                },
                textfield: {
                    type: 'atom',
                    label: 'Text Field',
                    route: '/toolkit/form/textfield',
                    dna: '/toolkit/form/Textfield',
                    component: require('appdir/toolkit/form/Textfield').default,
                    readme: require('appdir/toolkit/form/Textfield/readme')
                        .default,
                },
                textarea: {
                    type: 'atom',
                    label: 'Text Area',
                    route: '/toolkit/form/textarea',
                    dna: '/toolkit/form/Textarea',
                    component: require('appdir/toolkit/form/Textarea').default,
                    readme: require('appdir/toolkit/form/Textarea/readme')
                        .default,
                },
                select: {
                    type: 'atom',
                    label: 'Select',
                    route: '/toolkit/form/select',
                    dna: '/toolkit/form/Select',
                    component: require('appdir/toolkit/form/Select').default,
                    readme: require('appdir/toolkit/form/Select/readme')
                        .default,
                },
                'tags-input-molecule': {
                    type: 'molecule',
                    label: 'TagsInput',
                    route: '/toolkit/form/tags-input-molecule',
                    dna: '/toolkit/form/TagsInputMolecule',
                    component: require('appdir/toolkit/form/TagsInputMolecule')
                        .default,
                    readme: require('appdir/toolkit/form/TagsInputMolecule/readme')
                        .default,
                    hideCode: true,
                },
                'input-group-molecule': {
                    type: 'molecule',
                    label: 'Input Group',
                    route: '/toolkit/form/input-group-molecule',
                    dna: '/toolkit/form/InputGroupMolecule',
                    component: require('appdir/toolkit/form/InputGroupMolecule')
                        .default,
                    readme: require('appdir/toolkit/form/InputGroupMolecule/readme')
                        .default,
                    hideCode: true,
                },
            },
        },
        icons: {
            label: 'Icons',
            route: '/toolkit/icons/icon-overview',
            hideEmpty: true,
            elements: {
                'icon-overview': {
                    type: 'atom',
                    label: 'Overview',
                    route: '/toolkit/icons/icon-overview',
                    dna: '/toolkit/icons/IconOverview',
                    component: require('appdir/toolkit/icons/IconOverview')
                        .default,
                    hideCode: true,
                    hideDna: true,
                    hideDocs: true,
                },
                'feather-icons': {
                    type: 'atom',
                    label: 'Feather Icons',
                    route: '/toolkit/icons/feather-icons',
                    dna: '/toolkit/icons/Feather',
                    component: require('appdir/toolkit/icons/Feather').default,
                    hideCode: true,
                    hideDna: true,
                    hideDocs: true,
                },
                'linear-icons': {
                    type: 'atom',
                    label: 'Linear Icons',
                    route: '/toolkit/icons/linear-icons',
                    dna: '/toolkit/icons/Linear',
                    component: require('appdir/toolkit/icons/Linear').default,
                    hideCode: true,
                    hideDna: true,
                    hideDocs: true,
                },
            },
        },
        charts: {
            label: 'Charts',
            route: '/toolkit/charts',
            elements: {
                'pie-molecule': {
                    type: 'molecule',
                    label: 'Pie Chart',
                    route: '/toolkit/charts/pie-molecule',
                    dna: '/toolkit/charts/PieMolecule',
                    component: require('appdir/toolkit/charts/PieMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'area-chart-molecule': {
                    type: 'molecule',
                    label: 'Area Chart',
                    route: '/toolkit/charts/area-chart-molecule',
                    dna: '/toolkit/charts/AreaChartMolecule',
                    component: require('appdir/toolkit/charts/AreaChartMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'bar-chart-molecule': {
                    type: 'molecule',
                    label: 'Bar Chart',
                    route: '/toolkit/charts/bar-chart-molecule',
                    dna: '/toolkit/charts/BarChartMolecule',
                    component: require('appdir/toolkit/charts/BarChartMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
            },
        },
        components: {
            label: 'Components',
            route: '/toolkit/components/alert-molecule',
            hideEmpty: false,
            elements: {
                'alert-molecule': {
                    type: 'molecule',
                    label: 'Alert',
                    route: '/toolkit/components/alert-molecule',
                    dna: '/toolkit/components/AlertMolecule',
                    component: require('appdir/toolkit/components/AlertMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'button-atom': {
                    type: 'atom',
                    label: 'Button',
                    route: '/toolkit/components/button-atom',
                    dna: '/toolkit/components/ButtonAtom',
                    component: require('appdir/toolkit/components/ButtonAtom')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'carousel-molecule': {
                    type: 'molecule',
                    label: 'Carousel',
                    route: '/toolkit/components/carousel-molecule',
                    dna: '/toolkit/components/CarouselMolecule',
                    component: require('appdir/toolkit/components/CarouselMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'checkpoints-molecule': {
                    type: 'molecule',
                    label: 'Checkpoints',
                    route: '/toolkit/components/checkpoints-molecule',
                    dna: '/toolkit/components/CheckpointsMolecule',
                    component: require('appdir/toolkit/components/CheckpointsMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'collapsible-molecule': {
                    type: 'molecule',
                    label: 'Collapsible',
                    route: '/toolkit/components/collapsible-molecule',
                    dna: '/toolkit/components/CollapsibleMolecule',
                    component: require('appdir/toolkit/components/CollapsibleMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'data-table-molecule': {
                    type: 'molecule',
                    label: 'Data Table',
                    route: '/toolkit/components/data-table-molecule',
                    dna: '/toolkit/components/DataTableMolecule',
                    component: require('appdir/toolkit/components/DataTableMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'dialog-molecule': {
                    type: 'molecule',
                    label: 'Dialog',
                    route: '/toolkit/components/dialog-molecule',
                    dna: '/toolkit/components/DialogMolecule',
                    component: require('appdir/toolkit/components/DialogMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'dropdown-molecule': {
                    type: 'molecule',
                    label: 'Dropdown',
                    route: '/toolkit/components/dropdown-molecule',
                    dna: '/toolkit/components/DropdownMolecule',
                    component: require('appdir/toolkit/components/DropdownMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'image-molecule': {
                    type: 'molecule',
                    label: 'Image',
                    route: '/toolkit/components/image-molecule',
                    dna: '/toolkit/components/ImageMolecule',
                    component: require('appdir/toolkit/components/ImageMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'modal-molecule': {
                    type: 'molecule',
                    label: 'Modal',
                    route: '/toolkit/components/modal-molecule',
                    dna: '/toolkit/components/ModalMolecule',
                    component: require('appdir/toolkit/components/ModalMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'pagination-molecule': {
                    type: 'molecule',
                    label: 'Pagination',
                    route: '/toolkit/components/pagination-molecule',
                    dna: '/toolkit/components/PaginationMolecule',
                    component: require('appdir/toolkit/components/PaginationMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'progress-molecule': {
                    type: 'molecule',
                    label: 'Progress',
                    route: '/toolkit/components/progress-molecule',
                    dna: '/toolkit/components/ProgressMolecule',
                    component: require('appdir/toolkit/components/ProgressMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'scene-molecule': {
                    type: 'molecule',
                    label: 'Scene',
                    route: '/toolkit/components/scene-molecule',
                    dna: '/toolkit/components/SceneMolecule',
                    component: require('appdir/toolkit/components/SceneMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'slider-molecule': {
                    type: 'molecule',
                    label: 'Slider',
                    route: '/toolkit/components/slider-molecule',
                    dna: '/toolkit/components/SliderMolecule',
                    component: require('appdir/toolkit/components/SliderMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'spinner-molecule': {
                    type: 'molecule',
                    label: 'Spinner',
                    route: '/toolkit/components/spinner-molecule',
                    dna: '/toolkit/components/SpinnerMolecule',
                    component: require('appdir/toolkit/components/SpinnerMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'tab-molecule': {
                    type: 'molecule',
                    label: 'Tabs',
                    route: '/toolkit/components/tab-molecule',
                    dna: '/toolkit/components/TabMolecule',
                    component: require('appdir/toolkit/components/TabMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'toast-molecule': {
                    type: 'molecule',
                    label: 'Toast',
                    route: '/toolkit/components/toast-molecule',
                    dna: '/toolkit/components/ToastMolecule',
                    component: require('appdir/toolkit/components/ToastMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'tooltip-molecule': {
                    type: 'molecule',
                    label: 'Tooltip',
                    route: '/toolkit/components/tooltip-molecule',
                    dna: '/toolkit/components/TooltipMolecule',
                    component: require('appdir/toolkit/components/TooltipMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
            },
        },
        picker: {
            label: 'Picker',
            route: '/toolkit/picker',
            elements: {
                'date-picker-molecule': {
                    type: 'molecule',
                    label: 'DatePicker',
                    route: '/toolkit/picker/date-picker-molecule',
                    dna: '/toolkit/picker/DatePickerMolecule',
                    component: require('appdir/toolkit/picker/DatePickerMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                'time-picker-molecule': {
                    type: 'molecule',
                    label: 'TimePicker',
                    route: '/toolkit/picker/time-picker-molecule',
                    dna: '/toolkit/picker/TimePickerMolecule',
                    component: require('appdir/toolkit/picker/TimePickerMolecule')
                        .default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
                picker: {
                    type: 'molecule',
                    label: 'Picker Primitive',
                    route: '/toolkit/picker/picker',
                    dna: '/toolkit/picker/Picker',
                    component: require('appdir/toolkit/picker/Picker').default,
                    hideCode: true,
                    hideDocs: true,
                    hideDna: true,
                },
            },
        },
    },
};
