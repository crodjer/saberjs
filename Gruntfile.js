'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      source: {
        src: ['src/**/*.js'],
        options: {
          jshintrc: 'src/.jshintrc'
        }
      },

      dist: {
        src: ['dist/<%= pkg.name %>.js'],
        options: {
          jshintrc: 'src/.jshintrc'
        }
      },

      grunt: {
        src: ['Gruntfile.js'],
        options: {
          jshintrc: '.jshintrc'
        }
      },

      tests: {
        src: ['test/**/*.js'],
        options: {
          jshintrc: 'test/.jshintrc'
        }
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n' +
          '\'use strict\';\n',
        process: function(src, filepath) {
          return '// Source: ' + filepath + '\n' +
            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
        },
      },

      dist: {
        src: [
          'src/core.js',
          'src/data-source.js',
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      all: {
        files: 'dist/<%= pkg.name %>.min.js',
      },

      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
      },

      unit: {
        autoWatch: false,
        background: true
      },

      continuous: {
        autoWatch: false,
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: [
          'jshint:grunt',
        ]
      },

      source: {
        files: ['src/**/*.js'],
        tasks: [
          'jshint:source',
          'karma:unit:run'
        ]
      },

      tests: {
        files: ['test/**/*.js'],
        tasks: [
          'jshint:tests',
          'karma:unit:run'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [
    'concat',
    'jshint',
    'karma:unit',
    'uglify'
  ]);

  grunt.registerTask('forever', [
    'karma:unit',
    'watch',
  ]);

  grunt.registerTask('test-travis', [
    'concat',
    'jshint',
    'karma:continuous',
    'uglify'
  ]);
};
