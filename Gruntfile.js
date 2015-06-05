module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      coffee: {
        files: 'www/**/*.coffee',
        tasks: ['newer:coffee:compile', 'exec:cordova-prepare']
      }
    },
    coffeelint: {
      options: {
        'no_trailing_whitespace': {
          'level': 'error'
        }
      }
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: [{
          expand: true,
          cwd: "www/coffee",
          src: ['**/*.coffee'],
          dest: 'www/js',
          ext: '.js'
        }]
      }
    },
    exec: {
      'cordova-prepare': {
        command:"cordova prepare",
        stdout:true,
        stderror:true
      }
    },
    concurrent: {
      default: {
        tasks: ['exec:cordova-prepare', 'watch'],
        options: {
            logConcurrentOutput: true
        }
      }
  }
  });
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask("default", ["concurrent:default"]);
};
