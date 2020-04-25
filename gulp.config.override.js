/**
 * Rename this file to gulp.config.override.js to use it.
 */

const op = require('object-path');

/**
 * Passed the current gulp configuration from core
 * @param  {Object} gulpConfig the .core gulp configuration
 * @return {Object} your gulp configuration override
 */
module.exports = config => {
    op.set(
        config,
        'dest.colors',
        'src/app/components/common-ui/assets/style/_scss/_colors.scss',
    );

    op.set(config, 'port', {
        browsersync: 3070,
        proxy: 3080,
    });

    return config;
};
