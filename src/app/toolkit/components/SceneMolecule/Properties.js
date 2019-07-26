import React from 'react';
import _ from 'underscore';
import { Scene } from 'components/common-ui';

const Table = ({ children }) => (
    <table style={{ tableLayout: 'fixed' }}>
        <colgroup>
            <col width={150} />
            <col width={110} />
            <col />
            <col width={180} />
        </colgroup>
        <thead>
            <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
                <th>Default</th>
            </tr>
        </thead>
        <tbody>{children}</tbody>
    </table>
);

const Row = ({ children, property, type, value = 'null' }) => (
    <tr className='top'>
        <th>{property}</th>
        <th>{type}</th>
        <td>{children}</td>
        <td>
            <span className='number'>{value}</span>
        </td>
    </tr>
);

const data = [
    {
        children: (
            <>
                The id of the visible child element. If a child does not have
                the <kbd>id</kbd>
                {" attribute it's index in relation to "}
                <kbd>React.Children.map()</kbd> is used. If no value is present,
                the Scene will display empty.
            </>
        ),
        property: 'active',
        type: 'Number, String',
    },
    {
        children: (
            <>
                {'The type of animation used when displaying a child element: '}
                <kbd>{Object.values(Scene.ENUMS.ANIMATION).join(', ')}</kbd>.
            </>
        ),
        property: 'animation',
        type: 'String',
        value: Scene.defaultProps.animation,
    },
    {
        children: 'Time in seconds of the hide/show animation.',
        property: 'animationSpeed',
        type: 'Number',
        value: Scene.defaultProps.animationSpeed,
    },
    {
        children: 'Valid React node or element.',
        property: 'children',
        type: 'Element, Node, String',
    },
    {
        children: (
            <>
                {'The direction of the animation: '}
                <kbd>{Object.values(Scene.ENUMS.DIRECTION).join(', ')}</kbd>.
            </>
        ),
        property: 'direction',
        type: 'String',
        value: Scene.defaultProps.direction,
    },
    {
        children:
            'The height of the Scene container. Height can be any valid CSS value for height.',
        property: 'height',
        type: 'Number, String',
        value: Scene.defaultProps.height,
    },
    {
        children:
            'The width of the Scene container. Width can be any valid CSS value for width.',
        property: 'width',
        type: 'Number, String',
        value: Scene.defaultProps.width,
    },
    {
        children: 'The index of the active child.',
        property: 'index',
        type: 'Number',
        value: 'read only',
    },
    {
        children: (
            <>
                <kbd>beforeChange</kbd> event callback.
            </>
        ),
        property: 'onBeforeChange',
        type: 'Function',
    },
    {
        children: (
            <>
                <kbd>change</kbd> event callback.
            </>
        ),
        property: 'onChange',
        type: 'Function',
    },
    {
        children:
            'Reference to the internal state object. Useful when interacting with the Scene as a ref.',
        property: 'state',
        type: 'Object',
        value: 'read only',
    },
    {
        children: (
            <>
                {'Style Object passed down to Scene container '}
                <kbd>{'<div />'}</kbd>.
            </>
        ),
        property: 'style',
        type: 'Object',
    },
];

const Properties = () => (
    <Table>
        {data.map((item, i) => (
            <Row key={`property-row-${i}`} {...item} />
        ))}
    </Table>
);

export default Properties;
