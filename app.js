require.config({
    baseUrl: 'bower_components',
    paths: {
        'app': '../app',
        
        'jquery': 'jquery/dist/jquery',
        'jqueryui': 'jquery-ui/jquery-ui',
        'bootstrap': 'bootstrap/dist/js/bootstrap',
        'classnames': 'classnames/index',
        'text': 'requirejs-text/text',
        'domReady': 'requirejs-domReady/domReady',
        'react': 'react/react-with-addons',
        'JSXTransformer': 'react/JSXTransformer',
        'jsx': 'requirejs-react-jsx/jsx',
        'react-router': 'react-router/build/umd/ReactRouter',
        'react-bootstrap': 'react-bootstrap/react-bootstrap',
        'react-router-bootstrap': 'react-router-bootstrap/lib/ReactRouterBootstrap',
    },
    shim: {
        /* "react": {
            "exports": "React"
        },
        "JSXTransformer": "JSXTransformer", */
        'jquery': {
            "exports": "$",
            "init": function() {
                return $.noConflict();
            }
        },
        'jqueryui': {
            'exports': '$',
            'deps': ['jquery']
        }
    },
    
    config: {
        jsx: {
            fileExtension: ".jsx",
            transformOptions: {
                harmony: true,
                stripTypes: false,
                inlineSourceMap: true
            },
            usePragma: false
        }
    }
});

require(['jsx!./app/main']);