/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      scripts:{
        files:['js/*.js']
      },
      css:{
        files:['sass/**/*.scss'],
        tasks:['compass']
      }
    },
    compass:{
      dist:{
        options:{
          cssDir:'css',
          sassDir:'sass',
          require:['breakpoint'],
          httpPath:'',
          relativeAssets:true,
          //raw: "sass_options = {:sourcemap => true}\n",
          noLineComments:true,
          outputStyle:'compact'
          //raw:' --sourcemap\n'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['watch']);

};
