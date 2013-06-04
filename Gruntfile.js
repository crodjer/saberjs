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

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        all: {
          src: [
            'src/core.js',
            'src/data-source.js',
          ],
          dest: 'dist/<%= pkg.name %>.min.js'
        }
      }
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
      karma: {
        files: ['src/**/*.js', 'test/**/*.js'],
        tasks: [
          'jshint:source',
          'jshint:test',
          'karma:unit:run'
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [
    'jshint',
    'karma:unit',
    'uglify'
  ]);

  grunt.registerTask('forever', [
    'karma:unit',
    'watch',
  ]);

  grunt.registerTask('test-travis', [
    'jshint',
    'karma:continuous',
    'uglify'
  ]);
};
