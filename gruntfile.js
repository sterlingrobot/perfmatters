'use strict';
var ngrok = require('ngrok');
module.exports = function(grunt) {
    // Unified Watch Object
    var watchFiles = {
        clientJS: ['js/*.js', 'views/js/*.js'],
        clientCSS: ['css/*.css', 'views/css/*.css']
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
                tasks: ['csslint', 'concat'],
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
            all: {
                src: watchFiles.clientCSS
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
        cssmin: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                // the files to concatenate
                src: watchFiles.clientCSS,
                // the location of the resulting JS file
                dest: 'dist/css/<%= pkg.name %>.min.css'
            }
        },
        htmlmin: {
            dist: {
                options: { // Target options
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
        copy: {
            dist: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['img/*'],
                        dest: 'dist',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        src: ['views/images/*'],
                        dest: 'dist',
                        filter: 'isFile'
                    }
                ]
            }
        },
        ngrok: {
            options: {
                authToken: '58gG2R84WMhabrMngcXCN_v5xdHwbeUs52ZUiHucxz'
            },
            server: {
                proto: 'http',
                port: 80,
                remotePort: 50010,
                onConnected: function(url) {
                    grunt.log.writeln('Local server exposed to %s!', url);
                }
            },
        },
        pagespeed: {
            options: {
                nokey: true,
                url: "",
                locale: "en_US",
                threshold: 40
            },
            local: {
                options: {
                    strategy: "desktop"
                }
            },
            mobile: {
                options: {
                    strategy: "mobile"
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ngrok');
    grunt.loadNpmTasks('grunt-pagespeed');
    // Default task(s).
    grunt.registerTask('default', ['uglify', 'concat', 'cssmin', 'htmlmin', 'copy']);
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