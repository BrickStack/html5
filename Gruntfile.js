var fs = require('fs');
/**
 * step1  The "wrapper" function
 * @param grunt
 */
module.exports = function (grunt) {
    //step3 加载jshint模块
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    //压缩，美化js
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //js语法检查
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    var package = JSON.parse(fs.readFileSync('package.json', 'UTF-8'));
    var dist = 'uportal-' + package.version;

    /**
     * step2 Project and task configuration
     */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), //读取package.json文件，返回一个JSON对象，这里将会用到任务模板中

        //清空build和tmp目录
        clean: {
            build: ['build'],
            tmp: ['tmp']
        },

        //js语法检查
        jshint: {
            app: {
                files: { src: ['src/app/**/*.js']},
                options: { jshintrc: 'src/.jshintrc'}
            }
        },

        //压缩
        uglify: {
            min: {
                options: {
                    width: 120,
                    beautify: true
                },
                files: [
                    {
                        dest: 'build/output.min.js',
                        src: "src/**/*.js"
                    }
                ]
            }
        },
        //复制
        copy: {
            i18n: {
                files: [
                    { src: 'src/i18n/**', dest: 'build/i18n/', expand: true, flatten: true }
                ]
            },
            theme: {
                files: [
                    { src: 'theme/default/**', dest: 'build/theme/default/', expand: true, flatten: true }
                ]
            }
        },

        //打包
        compress: {
            build: {
                options: {archive: 'build/' + dist + '.zip', mode: 'zip'},
                src: ['**'], cwd: 'build', expand: true, dot: true, dest: dist + '/'
            }
        },

        "jsbeautifier": {
            files: ["src/app/services/**/*.js"],
            options: {
                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 4,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 4
                },
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        }
    });

    grunt.registerTask('minify', ['clean']);
    grunt.registerTask('package', ['clean', 'uglify', 'copy', 'compress']);
    grunt.registerTask('ci-checks', ['jshint']);
    grunt.registerTask('beautifier', ['jsbeautifier']);

    //default task  设置默认启动任务
    grunt.registerTask('default', ['beautifier']);
};