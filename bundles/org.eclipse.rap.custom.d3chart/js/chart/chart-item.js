/*******************************************************************************
 * Copyright (c) 2013 EclipseSource and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Ralf Sternberg - initial API and implementation
 ******************************************************************************/

d3chart.ChartItem = function( chart ) {
  this._chart = chart;
  this._value = 0;
};

d3chart.ChartItem.prototype = {

  getChart: function() {
    return this._chart;
  },

  getValue: function() {
    return this._value;
  },

  setValue: function( value ) {
    this._value = value;
    this._chart._scheduleUpdate();
  },

  getColor: function() {
    return this._color;
  },

  setColor: function( color ) {
    this._color = color;
    this._chart._scheduleUpdate();
  },

  getText: function() {
    return this._text;
  },

  setText: function( text ) {
    this._text = text;
    this._chart._scheduleUpdate();
  },

  id: function() {
    return this._rwtId;
  }

};

// TYPE HANDLER

rap.registerTypeHandler( "d3chart.ChartItem", {

  factory: function( properties ) {
    var chart = rap.getObject( properties.parent );
    var item = new d3chart.ChartItem( chart );
    chart._addItem( item );
    return item;
  },

  destructor: function( item ) {
    item.getChart()._removeItem( item );
  },

  properties: [
    "value", "color", "text"
  ],

  propertyHandler: {
    "color": function( chartItem, value ) {
      chartItem.setColor( "#" + rwt.util.Colors.rgbToHexString( value ) );
    }
  }

} );
