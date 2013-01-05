/**
 * @fileoverview Description of this file.
 * @author sharvil.nanavati@gmail.com (Sharvil Nanavati)
 */

goog.provide('dotprod.model.Simulation');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('dotprod.model.ModelObject');

/**
 * @constructor
 * @param {!dotprod.model.ModelObjectFactory} modelObjectFactory
 */
dotprod.model.Simulation = function(modelObjectFactory) {
  /**
   * @type {!dotprod.model.ModelObjectFactory}
   * @private
   */
  this.modelObjectFactory_ = modelObjectFactory;

  /**
   * @type {!Array.<!dotprod.model.ModelObject>}
   * @private
   */
  this.registeredObjects_ = [];
};

/**
 * @param {!dotprod.model.ModelObject} obj
 */
dotprod.model.Simulation.prototype.registerObject = function(obj) {
  goog.asserts.assert(obj.isValid(), 'Cannot register an invalid object.');
  goog.array.extend(this.registeredObjects_, obj);
};

/**
 * @param {!dotprod.model.ModelObject} obj
 */
dotprod.model.Simulation.prototype.unregisterObject = function(obj) {
  goog.array.remove(this.registeredObjects_, obj);
};

dotprod.model.Simulation.prototype.advanceTime = function() {
  goog.array.forEach(this.registeredObjects_, function(obj) {
    obj.advanceTime();
  });

  this.registeredObjects_ = goog.array.filter(this.registeredObjects_, function(obj) {
    return obj.isValid();
  });
};
