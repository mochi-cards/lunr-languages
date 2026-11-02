var assert = require('assert');

var versions = ['0.6.0.min', '0.7.0.min', '1.0.0.min', '2.0.1', '2.3.5'];
var words = { ko: '경솔하다', th: 'ภาษาไทย', vi: 'nghiêng' };

['source', 'minified'].forEach(function(distribution) {
  versions.forEach(function(version) {
    Object.keys(words).forEach(function(language) {
      describe(distribution + ' ' + version + ' ' + language + ' trimming', function() {
        var lunrPath = './lunr/lunr-' + version;
        delete require.cache[require.resolve(lunrPath)];
        var lunr = require(lunrPath);
        var prefix = distribution === 'source' ? '../lunr.' : '../min/lunr.';
        var suffix = distribution === 'source' ? '.js' : '.min.js';
        require(prefix + 'stemmer.support' + suffix)(lunr);
        // Only pipeline behavior is under test; do not invoke Thai segmentation.
        lunr.wordcut = { init: function() {} };
        require(prefix + language + suffix)(lunr);
        require(prefix + 'multi' + suffix)(lunr);
        var multi = { pipeline: new lunr.Pipeline() };
        lunr.multiLanguage('en', language).call(multi);

        function token(text) {
          return lunr.Token ? new lunr.Token(text) : text;
        }

        function run(pipeline, text) {
          return pipeline.run([token(text)]).map(function(t) { return t.toString(); });
        }

        it('trims punctuation and preserves native letters and combining marks', function() {
          var samples = [words[language]];
          if (language === 'vi') samples.push('nghie\u0302ng');
          samples.forEach(function(word) {
            [['', ';'], ['(', ')'], ['', ','], ['', ':'], ['「', '！」']].forEach(function(pair) {
              assert.equal(lunr[language].trimmer(token(pair[0] + word + pair[1])).toString(), word);
            });
          });
        });

        it('trims both English and native words in a multilingual pipeline', function() {
          var builder = multi;
          ['hasty', words[language]].forEach(function(word) {
            [['', ';'], ['(', ')'], ['', ','], ['', ':'], ['「', '！」']].forEach(function(pair) {
              assert.deepEqual(run(builder.pipeline, pair[0] + word + pair[1]), run(builder.pipeline, word));
            });
            assert.ok(run(builder.pipeline, word).length);
          });
          assert.ok(run(builder.pipeline, ';！').every(function(t) { return t === ''; }));
        });

        it('round-trips the single-language and multilingual pipelines', function() {
          var single = new lunr.Pipeline();
          if (lunr[language].stopWordFilter) single.add(lunr[language].stopWordFilter);
          single.add(lunr[language].trimmer);
          [single, multi.pipeline].forEach(function(pipeline) {
            var labels = pipeline.toJSON();
            labels.forEach(function(label) { assert.equal(typeof label, 'string'); });
            var restored = lunr.Pipeline.load(JSON.parse(JSON.stringify(labels)));
            assert.deepEqual(run(restored, words[language] + ';'), run(pipeline, words[language]));
          });
          if (language === 'vi') {
            assert.equal(lunr.vi.stopWordFilter.label, 'stopWordFilter-vi');
            assert.deepEqual(run(lunr.Pipeline.load(['stopWordFilter-vi']), 'là'), []);
          }
        });
      });
    });
  });
});
