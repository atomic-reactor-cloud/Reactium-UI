import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/styles/hljs';
import prettier from 'prettier/standalone';
import parserbabel from 'prettier/parser-babylon';
import parserHtml from 'prettier/parser-html';

const prettierOptions = {
    parser: 'babel',
    singleQuote: true,
    tabWidth: 4,
    printWidth: 80,
    jsxSingleQuote: true,
    jsxBracketSameLine: true,
    trailingComma: 'es5',
    plugins: [parserbabel, parserHtml],
};

const syntax = str => prettier.format(str, prettierOptions);

const Usage = ({
    children,
    language = 'html',
    lineNumbers = false,
    style = {},
}) => (
    <SyntaxHighlighter
        showLineNumbers={lineNumbers}
        style={vs2015}
        customStyle={{ padding: '20px 30px' }}
        language={language}>
        {language === 'html' ? syntax(children) : children}
    </SyntaxHighlighter>
);

export default Usage;
