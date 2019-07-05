import React from 'react';
import Markdown from 'reactium-core/components/Toolkit/Markdown';

/**
 * -----------------------------------------------------------------------------
 * SceneMolecule Readme
 * -----------------------------------------------------------------------------
 */

const content = `
${'```'}
/*
 * @func navTo
 * @description Navigate to the specified panel

    navTo({
        animation:String,
        direction:String,
        duration:Number,
        panel:String|Number,
    })

 * @params {Object}
 * @params.animation {String} Type of animation. See ENUMS.ANIMATION for available types.
 * @params.direction {String} Direction of the animating panel if the animation supports it. See: ENUMS.DIRECTION for available directions.
 * @params.duration {Number} Duration in seconds of the animation. If set to zero, no animation will be executed.
 */
${'```'}
`;

/**
 * -----------------------------------------------------------------------------
 * DO NOT EDIT BELOW HERE
 * -----------------------------------------------------------------------------
 */
const readme = props => <Markdown {...props}>{content}</Markdown>;
export default readme;
