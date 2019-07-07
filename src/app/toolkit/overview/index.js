import React from 'react';
import { ec } from 'reactium-core/easy-connect';
import Card from 'reactium-core/components/Toolkit/Content/Card';
import Docs from 'reactium-core/components/Toolkit/Content/Docs';
import Markdown from 'reactium-core/components/Toolkit/Markdown';

const content = {};

content.install = `
${'```'}
npm install --save @atomic-reactor/reactium-ui
${'```'}
`;

content.css = `
${'```html'}
<link rel="stylesheet" href="https://reactium-cnd.sfo2.cdn.digitaloceanspaces.com/reactium-ui/reactium-ui.css" crossorigin="anonymous">
${'```'}
`;

content.scss = `
${'```scss'}
// Reactium-ui
@import '../../../node_modules/@atomic-reactor/reactium-ui/assets/style/reactium-ui.scss';
${'```'}
`;

content.usage = `
${'```html'}
import React from 'react';
import { PieChart } from '@atomic-reactor/reactium-ui';

const PieChartDemo = ({ data, style }) => (
    <div style={style.flex}>
        <div style={style.demo}>
            <PieChart data={data} />
        </div>
    </div>
);

PieChartDemo.defaultProps = {
    data: [
        { label: 'Cats', value: 1 },
        { label: 'Dogs', value: 1 },
        { label: 'People', value: 2 },
    ],
    style: {
        demo: {
            maxWidth: 500
        },
        flex: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }
    }
};

export default PieChartDemo;
${'```'}
`;

/**
 * -----------------------------------------------------------------------------
 * DO NOT EDIT BELOW HERE
 * -----------------------------------------------------------------------------
 */
const Comp = (Toolkit, cont) => () => (
    <Markdown theme={Toolkit.prefs.codeColor.all}>{cont}</Markdown>
);

const Hr = ({ style = {} }) => (
    <div
        style={{
            borderBottom: '1px solid #DCDCDC',
            margin: '10px -25px',
            ...style,
        }}
    />
);

const Wrap = ({ style = {}, children }) => (
    <div
        style={{
            padding: '0 25px',
            margin: '25px 0',
            ...style,
        }}>
        {children}
    </div>
);

const overview = ({ getState }) => {
    return (
        <>
            <Card>
                <Wrap>
                    <h1 style={{ margin: '40px 0' }}>Introduction</h1>
                </Wrap>
                <Wrap>
                    <p
                        style={{
                            fontSize: 18,
                            paddingBottom: 40,
                            lineHeight: 2,
                        }}>
                        Reactium UI is a collection of useful React components
                        that can be used in any React application.
                    </p>
                </Wrap>
                <Wrap style={{ margin: '25px 0 10px 0' }}>
                    <h2>Install</h2>
                </Wrap>
                <Docs
                    component={Comp(getState().Toolkit, content.install)}
                    visible={true}
                    id='install'
                />
                <Wrap style={{ margin: '25px 0 10px 0' }}>
                    <h2>CSS</h2>
                </Wrap>
                <Wrap style={{ margin: '20px 0 10px 0' }}>
                    <p>Include the stylesheet into your head:</p>
                </Wrap>
                <Docs
                    component={Comp(getState().Toolkit, content.css)}
                    visible={true}
                    id='css'
                />
                <Wrap style={{ margin: '25px 0 10px 0' }}>
                    <h2>SCSS</h2>
                </Wrap>
                <Wrap style={{ margin: '20px 0 10px 0' }}>
                    <p>
                        If sass is your jam, include Reactium UI into your
                        .scss:
                    </p>
                </Wrap>
                <Docs
                    component={Comp(getState().Toolkit, content.scss)}
                    visible={true}
                    id='scss'
                />
                <Wrap>
                    <small>
                        Reactium UI relies on default values for most of it's
                        sass. You can overwrite the defaults by declaring them
                        before including reactium-ui.scss.
                    </small>
                </Wrap>
            </Card>
            <div style={{ margin: 40 }} />
            <Card>
                <Wrap style={{ margin: '25px 0 10px 0' }}>
                    <h2>Usage</h2>
                </Wrap>
                <Docs
                    component={Comp(getState().Toolkit, content.usage)}
                    visible={true}
                    id='usage'
                />
            </Card>
        </>
    );
};

export default ec(overview);
