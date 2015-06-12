'use strict';

var fileIncludePlugin = require('..'),
  gutil = require('gulp-util'),
  should = require('should'),
  fs = require('fs');

describe('## recursive include', function() {
  var result = fs.readFileSync('test/fixtures-recursive-include/result.txt', 'utf8');

  describe('# basepath: @file', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-recursive-include/index.txt',
        contents: fs.readFileSync('test/fixtures-recursive-include/index.txt')
      });

      var stream = fileIncludePlugin({
        basepath: '@file',
        recursive: true
      });
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(result);
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('stream', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-recursive-include/index.txt',
        contents: fs.createReadStream('test/fixtures-recursive-include/index.txt')
      });

      var stream = fileIncludePlugin({
        basepath: '@file',
        recursive: true
      });
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(result);
        done();
      });

      stream.write(file);
      stream.end();
    });
  });
});
