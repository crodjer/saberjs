'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        node: true,
        browser: true,
        esnext: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: 'single',
        regexp: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        smarttabs: true,
        globals: {
          'Saber': false,
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
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
  ]);
};
