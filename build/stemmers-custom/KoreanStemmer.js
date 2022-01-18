/*!
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

function KoreanStemmer() {

	this.setCurrent = function(word) {
    this.word = word;
	};

	this.getCurrent = function() {
    return this.word;
	};

	this.stem = function() {
    // Noop.
		return true;
	}
}
