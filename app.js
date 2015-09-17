require.config({
    baseUrl: 'bower_components',
    paths: {
        'app': '../app',
        
        'q': 'q/q',
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
        'primitives': '../lib/primitives.latest'
    },
    shim: {
        /* "react": {
            "exports": "React"
        },
        "JSXTransformer": "JSXTransformer", */
        'jquery': {
            "exports": "jQuery",
            "init": function() {
                return jQuery.noConflict();
            }
        },
        'jqueryui': {
            'exports': 'jQuery',
            'deps': ['jquery']
        },
        'primitives': {
            'deps': ['jquery', 'jqueryui'],
            'exports': 'primitives'
        },
        'q': {
            'exports': 'Q'
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