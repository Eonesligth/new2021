'use strict;'
module.exports =function (grunt) {
   require('time-grunt')(grunt);
   require('jit-grunt')(grunt,{
   	useminPrepare: 'grunt-usemin'
   });

	grunt.initConfig({
		sass: {
			dist:{
				files: [{
					expand:true,
					cwd: 'css',
					src: ['*.scss'],
					dest:'css',
					ext: '.css'
				}]
			}
		},

		watch:{
			files:['css/*.scss'],
			tasks: ["css"]
		},
		browserSync: {
			dev:{
				bsFiles: { //browser files
					src:[
					'css/*.css',
					'*.html',
					'js/*.js'
					]
				},
				options:{
					watchTask: true,
					server: {
						baseDir:'./'
					}
				}
			    }
		},

		imagemin: {
			dynamic: {
				files:[{
					expand:true,
					cwd:'./',
					src: 'imagenes/*.{png,gif,jpg,jpeg}',
					dest: 'dist/'
				}]
			}
		},
		copy:{
			html: {
				files:[{
					expand:true,
					dot:true,
					cwd:'./',
					src:['*.html'],
					dest:'dist'
				}]
			},
		},

		clean: {
			build:{
				src: ['dist/']
			}
		},

		cssmin: {
			dist:{}
		},

		uglify:{
			dist:{}
		},

		filerev: {
			options:{
			enconding: 'utf8',
			algorithm: 'md5',
			length:20
		},

		release: {
			//filerev:release hashes(md5) all assets (images,js and css)
			// in dist directory
			  files:[{
			  	src:[
			  	'dist/js*.js',
                'dist/css/*.css',
			  	]
			  }]
		}
	},

	concat: {
		options:{
			separator:';'
		},
		dist:{}
	},

	useminPrepare: {
		foo: {
			dest: 'dist',
			src:['index.html', 'catalogo.html','contacto.html','dudas.html','about.html', 'pqr.html']
		},
		options: {
			flow: {
				steps:{
					css:['cssmin'],
					js:['uglify']
				},
				post: {
					css:[{
						name:'cssmin',
						createConfig: function(contex, block) {
							var generated = context.Options.generated;
							generated.options = {
								keepSpecialComments:0,
								rebase:false
							};
						}
					}]
				}
			}
		}
	},

	usemin :{
		html:['dist/index.html', 'dist/catalogo.html', 'dist/contacto.html','dist/dudas.html','dist/about.html', 'dist/pqr.html'],
		options:{
			assetsDir : ['dist', 'dist/css', 'dist/js']
		}
	}

	});
   

	grunt.registerTask('css',['sass']);
	grunt.registerTask('default',['browserSync',"watch"]);
	grunt.registerTask('img:compress',['imagemin']);
	grunt.registerTask('build',[
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'filerev',
		'usemin'
		])
};