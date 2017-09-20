/* global describe, before, it */
var expect = require('chai').expect;
var util = require('../../src/module/Util');
var filter = require('../../src/index');
var frenchBadwordsList = require('french-badwords-list');

describe('Util', function() {
  before(function() {

  });

  describe('getIndicesOf', function() {
    var key = 'le';

    it('should get array of index', function() {
      expect(util.getIndicesOf(key, 'I learned to play the Ukulele in Lebanon.')).to.eql([
        2,
        25,
        27,
      ]);
    });

    it('should start with given index', function() {
      expect(util.getIndicesOf(key, 'I learned to play the Ukulele in Lebanon.', 25)).to.eql([
        25,
        27,
      ]);
    });
  });

  describe('leo-profanity with \'fr\' dictionary', function () {
    it('should return \'****** de *****\' for \'bordel de merde\'', function () {
      filter.loadDictionary('fr');
      expect(filter.clean('bordel de merde')).to.eql('****** de *****');
    });

    it('should return true for \'bordel de merde\' input', function () {
      filter.loadDictionary('fr');
      expect(filter.check('bordel de merde')).to.be.true;
    });
  });

  describe('loadDictionary(\'fr\')', function () {
    it('should set the french-badwords-list content as dictionary', function () {
      filter.loadDictionary('fr');

      var isFrenchDictionaryLoaded = true;
      var dictionary = filter.list();

      if (dictionary.length !== frenchBadwordsList.array.length) {
        isFrenchDictionaryLoaded = false;
      }

      var i = 0;
      while (i < dictionary.length && isFrenchDictionaryLoaded) {
        isFrenchDictionaryLoaded = filter.list()[i] === frenchBadwordsList.array[i++];
      }

      expect(isFrenchDictionaryLoaded).to.be.true;
    });
  });

  describe('loadDictionary()', function () {
    it('should have the default dictionary', function () {
      var isDefaultLoaded = true;
      var i = 0;
      var filter2 = require('../../src/index');

      filter.clearList();
      filter.loadDictionary();

      if (filter.list().length !== filter2.list().length) {
        isDefaultLoaded = false;
      }

      while (i < filter.list().length && isDefaultLoaded) {
        isDefaultLoaded = filter.list()[i] === filter2.list()[i++];
      }

      expect(isDefaultLoaded).to.be.true;
    });
  });
});
