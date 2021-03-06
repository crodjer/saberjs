'use strict';

module.exports = function (grunt) {
  var closurePads = ['src/intro.js', 'src/outro.js'];


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      source: {
        src: ['src/**/*.js'],
        options: {
          jshintrc: 'src/.jshintrc',
          ignores: closurePads
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
          var output = '// Source: ' + filepath + '\n' + src;
          output = output.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          if (closurePads.indexOf(filepath) === -1) {
            output = output.replace(/(^|\n)(.+)/g, '$1  $2');
          }

          return output;
        },
      },

      dist: {
        src: [
          'src/intro.js',
          'src/deps/utils.js',
          'src/core.js',
          'src/parser.js',
          'src/query-set.js',
          'src/data-source.js',
          'src/exports.js',
          'src/outro.js',
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
        singleRun: true,
        autoWatch: false,
      },

      dist: {
        autoWatch: false,
        singleRun: true,

        options: {
          configFile: 'karma-dist.conf.js'
        }
      },

      background: {
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
        files: ['Gruntfile.js', '.jshintrc'],
        tasks: [
          'jshint:grunt',
        ]
      },

      source: {
        files: ['src/**/*.js', 'src/.jshintrc'],
        tasks: [
          'jshint:source',
          'karma:unit:run'
        ]
      },

      tests: {
        files: ['test/**/*.js', 'test/.jshintrc'],
        tasks: [
          'jshint:tests',
          'karma:background:run'
        ]
      }
    },

    shell: {
      coveralls: {
        command: 'cat "`find .coverage/ -iname lcov.info | head`" | ./node_modules/coveralls/bin/coveralls.js',
        options: {
          stdout: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [
    'concat',
    'jshint',
    'karma:unit',
    'karma:dist'
  ]);

  grunt.registerTask('forever', [
    'karma:background',
    'watch',
  ]);

  grunt.registerTask('test-travis', [
    'concat',
    'jshint',
    'karma:continuous',
    'karma:dist',
    'uglify'
  ]);
};
