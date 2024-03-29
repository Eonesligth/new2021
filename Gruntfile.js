module.exports = function (grunt) {
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});
	
	grunt.initConfig ({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},

		watch: {
			files: ['css/*.scss'],
			tasks: ['css']
		},

		browserSync: {
			dev: {
				bsFiles: { //browser files
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},

				options: {
					watchTask: true,
					server: {
						baseDir: './' //Directorio base para nuestro servidor
					}
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: './',
					src: 'imagenes/*.{png,gif,jpg,jpeg}',
					dest: 'dist/'
				}]
			}
		},

		copy: {
			html: {
				files: [{
					expand: true,
					dot: true,
					cwd: './',
					src: ['*.html', '*.ico'],
					dest: 'dist'
				}]
			},

			'fonts-awesome': {
				files: [{
					expand: true,
					dot: true,
					cwd: 'node_modules/@fortawesome/fontawesome-free',
					src: ['webfonts/*.*'],
					dest: 'dist'
				}]
			},

			'fonts-iconic': {
				files: [{
					expand: true,
					dot: true,
					cwd: 'node_modules/open-iconic/font',
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			}
		},

		clean: {
			build: {
				src: ['dist/']
			}
		},

		cssmin: {
			dist: {}
		},

		uglify: {
			dist: {}
		},

		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				lenght: 20
			},

			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css',
					]
				}]
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {}
		},

		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['index.html', 'about.html', 'contacto.html', 'catalogo.html', 'dudas.html','pqr.html']
			},

			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},

					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block) {
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								}
							}
						}]
					}
				}
			}
		},

		usemin: {
			html: ['dist/index.html', 'dist/about.html', 'dist/contact.html', 'dist/prices.html', 'dist/terms_conditions.html'],
			options: {
				assetsDir: ['dist', 'dist/css', 'dist/js']
			}
		}

	});

	//grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-sass');
	//grunt.loadNpmTasks('grunt-browser-sync');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('css', ['sass']);		
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('img:compress', ['imagemin']);
	grunt.registerTask('build', [
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'filerev',
		'usemin'
	]);
};
