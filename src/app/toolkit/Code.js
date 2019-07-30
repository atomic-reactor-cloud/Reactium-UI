import React, { useEffect, useRef, useState } from 'react';
import op from 'object-path';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import prettier from 'prettier/standalone';
import parserbabel from 'prettier/parser-babylon';
import parserHtml from 'prettier/parser-html';
import { useStore } from 'reactium-core/easy-connect';

const prettierOptions = {
    parser: 'babel',
    singleQuote: true,
    tabWidth: 2,
    printWidth: 80,
    jsxSingleQuote: true,
    jsxBracketSameLine: true,
    trailingComma: 'es5',
    plugins: [parserbabel, parserHtml],
};

const syntax = str => prettier.format(str, prettierOptions);

const Code = props => {
    const { getState, subscribe } = useStore();

    const getTheme = () =>
        op.get(getState(), 'Toolkit.prefs.codeColor.all', 'light');

    const stateRef = useRef({
        theme: getTheme(),
        ...props,
    });

    const [state, setNewState] = useState(stateRef.current);

    const setState = (newState = {}) => {
        const prevState = { ...stateRef.current };

        stateRef.current = {
            ...prevState,
            ...newState,
        };

        setNewState(stateRef.current);
    };

    useEffect(() => {
        const unsub = subscribe(() => {
            const theme = getTheme();

            if (stateRef.current.theme !== theme) {
                setState({ theme });
            }
        });

        return () => unsub();
    }, [stateRef.current.theme]);

    const render = () => {
        const {
            children,
            theme,
            language = 'html',
            lineNumbers = false,
            style = {},
        } = stateRef.current;

        const codeColor = theme === 'dark' ? vs2015 : vs;

        return (
            <SyntaxHighlighter
                showLineNumbers={lineNumbers}
                style={codeColor}
                customStyle={{
                    padding: '20px 30px',
                    borderBottom:
                        theme !== 'dark' ? '1px solid #F7F7F7' : 'none',
                    ...style,
                }}
                language={language}>
                {language === 'html' ? syntax(children) : children}
            </SyntaxHighlighter>
        );
    };

    return render();
};

export default Code;
