module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*',
        'index.js',
        'test/*.js'
      ],
      options: {
        jshintrc: '_jshintrc'
      }
    },
    jsbeautifier: {
      modify: {
        src: [
          'Gruntfile.js',
          'src/*',
          'index.js',
          'test/*.js'
        ],
        options: {
          config: '_jsbeautifyrc'
        }
      },
      verify: {
        src: [
          'Gruntfile.js',
          'src/*',
          'index.js',
          'test/*.js'
        ],
        options: {
          mode: 'VERIFY_ONLY',
          config: '_jsbeautifyrc'
        }
      }
    },
    simplemocha: {
      options: {
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: {
        src: 'test/**/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('clean', [
    'jsbeautifier:modify',
    'jshint'
  ]);

  grunt.registerTask('verify', [
    'jsbeautifier:verify',
    'jshint'
  ]);

  grunt.registerTask('test', [
    'jsbeautifier:verify',
    'jshint',
    'simplemocha'
  ]);
};
