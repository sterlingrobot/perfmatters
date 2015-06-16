'use strict';

var ngrok = require('ngrok');

module.exports = function(grunt) {

    // Unified Watch Object
    var watchFiles = {
        clientJS: ['js/*.js', 'views/js/*.js'],
        clientCSS: ['views/css/*.css', 'css/*.css']
    };

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint', 'concat', 'postcss'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: {
                src: watchFiles.clientJS,
                options: {
                    jshintrc: true
                }
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: watchFiles.clientCSS
            }
        },
        // Remove previously generated builds
        clean: {
            dist: ['dist']
        },
        // Copy things to the dist dir, and only change things in that dir
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['**/*.html', '!node_modules/**', '!dist/**'],
                    dest: 'dist/'
                }]
            }
        },
        concat: {
            options: { },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.js': ['js/*.js'],
                    'dist/views/js/<%= pkg.name %>.js': ['views/js/*.js'],
                    'dist/css/<%= pkg.name %>.min.css': ['css/*.css'],
                    'dist/views/css/<%= pkg.name %>.min.css': ['views/css/*.css']
                }
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.js'],
                    'dist/views/js/<%= pkg.name %>.min.js': ['dist/views/js/<%= pkg.name %>.js']
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({
                        browsers: 'last 2 versions'
                    }),
                    require('csswring')
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['css/*.css', 'views/css/*.css'],
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },
        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true,
                    useShortDoctype: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    'dist/index.html': 'dist/index.html',
                    'dist/project-2048.html': 'dist/project-2048.html',
                    'dist/project-mobile.html': 'dist/project-mobile.html',
                    'dist/project-webperf.html': 'dist/project-webperf.html',
                    'dist/views/pizza.html': 'dist/views/pizza.html'
                }
            },
        },
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dist: {
                files: [{
                    expand: true,
                    src: ['img/*.{png,jpg,gif}', 'views/images/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        pagespeed: {
            options: {
                nokey: true,
                url: "",
                locale: "en_US",
                threshold: 90
            },
            mobile: {
                options: {
                    strategy: "mobile"
                }
            }
        }
    });

    // Load NPM tasks automatically vs calling loadNpmTasks for each
    require('load-grunt-tasks')(grunt);
    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    grunt.registerTask('default', ['lint', 'build', 'psi-ngrok' /*, 'watch'*/ ]);
    grunt.registerTask('lint', ['jshint', 'csslint']);
    grunt.registerTask('build', ['clean', 'copy', 'concat', 'uglify', 'postcss', 'optimize']);
    grunt.registerTask('optimize', ['processhtml', 'htmlmin', 'imagemin']);
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8083;
        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done(function() {
                // Disconnect after testing
                ngrok.disconnect();
            });
        });
    });
};