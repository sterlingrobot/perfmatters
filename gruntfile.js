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
                csslintrc: '.csslintrc',
            },
            src: {
                src: watchFiles.clientCSS
            },
            dist: {
                src: ['dist/css/<%= pkg.name %>.css', 'dist/views/css/<%= pkg.name %>.css']
            }
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.js': ['js/*.js'],
                    'dist/views/js/<%= pkg.name %>.js': ['views/js/*.js'],
                    'dist/css/<%= pkg.name %>.css': ['css/*.css'],
                    'dist/views/css/<%= pkg.name %>.css': ['views/css/*.css']
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
                map: true,
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
                    cwd: '',
                    src: ['css/*.css', 'views/css/*.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    useShortDoctype: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyJS: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'index.html', // 'destination': 'source'
                    'dist/project-2048.html': 'project-2048.html',
                    'dist/project-mobile.html': 'project-mobile.html',
                    'dist/project-webperf.html': 'project-webperf.html',
                    'dist/views/pizza.html': 'views/pizza.html'
                }
            },
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
        },
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dynamic: {
                files: [{
                    expand: true,
                    src: ['img/*.{png,jpg,gif}', 'views/images/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-ngrok');
    grunt.loadNpmTasks('grunt-pagespeed');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['optimize', 'lint', 'psi-ngrok'/*, 'watch'*/]);
    grunt.registerTask('lint', ['jshint', 'csslint:src']);
    grunt.registerTask('optimize', ['newer:uglify', 'newer:concat', 'newer:postcss', 'newer:htmlmin', 'newer:imagemin']);
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
            done();
        });
    });
};