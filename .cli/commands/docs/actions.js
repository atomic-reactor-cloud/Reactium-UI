const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const _ = require('underscore');
const op = require('object-path');
const handlebars = require('handlebars').compile;
const clipboard = require('clipboardy');

module.exports = spinner => {
    const message = text => {
        if (spinner) {
            spinner.text = text;
        }
    };

    let dest;

    let content = ({ filepath, params }) =>
        handlebars(fs.readFileSync(filepath, 'utf-8'))(params);

    let createFile = ({ filepath, content }) =>
        fs.writeFileSync(filepath, content);

    let template = filename =>
        path.normalize(`${__dirname}/template/${filename}.hbs`);

    return {
        setup: ({ action, params, props }) => {
            dest = op.get(params, 'destination');
            dest = path.normalize(dest);

            fs.ensureDirSync(dest);

            return Promise.resolve({ action, status: 200 });
        },
        create: ({ action, params, props }) =>
            new Promise(resolve => {
                const files = ['Events', 'Methods', 'Properties', 'Sass'];
                const ival = setInterval(() => {
                    if (files.length < 1) {
                        clearInterval(ival);
                        resolve({ action, status: 200 });
                        return;
                    }

                    const f = files.shift();
                    message(`Creating ${chalk.cyan(f)} docs...`);

                    createFile({
                        filepath: path.normalize(path.join(dest, `${f}.js`)),
                        content: content({ filepath: template(f), params }),
                    });
                }, 500);
            }),
        copy: ({ action, params, props }) => {
            clipboard.writeSync(
                content({ filepath: template('Imports'), params }),
            );
            return Promise.resolve({ action, status: 200 });
        },
        complete: ({ action, params, props }) => {
            spinner.succeed('Docs complete and imports copied to clipboard!');

            return Promise.resolve({ action, status: 200 });
        },
    };
};
