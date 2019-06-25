import serialize from 'serialize-javascript';

module.exports = {
    version: '3.0.0',
    template: req => {
        return `<!DOCTYPE html>
        <html>
            <head>
                <title>Reactium UI</title>
                <link rel="shortcut icon" type="image/x-icon" href="/assets/images/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                ${req.styles}
            </head>
            <body>
                <Component type="DevTools"></Component>
                <div id="router"></div>

                <script>
                    window.ssr = false;
                    window.defines = ${serialize(defines)};
                    window.restAPI = '/api';
                    window.parseAppId = '${parseAppId}';
                </script>
                ${req.scripts}
            </body>
        </html>`;
    },
};
