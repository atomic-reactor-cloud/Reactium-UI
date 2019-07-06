import React from 'react';
import { Button } from 'components/common-ui';
import Markdown from 'reactium-core/components/Toolkit/Markdown';

/**
 * -----------------------------------------------------------------------------
 * ButtonAtom Readme
 * -----------------------------------------------------------------------------
 */

const content = `
### ENUMS
${'```'}
${JSON.stringify(Button.ENUMS, null, 4)}
${'```'}
`;

/**
 * -----------------------------------------------------------------------------
 * DO NOT EDIT BELOW HERE
 * -----------------------------------------------------------------------------
 */
const readme = props => <Markdown {...props}>{content}</Markdown>;
export default readme;
