/**
 * XadillaX created at 2015-12-01 17:44:16 With ♥
 *
 * Copyright (c) 2015 Souche.com, all rights
 * reserved.
 */
"use strict";

var config = require("config");
var resp = require("express/lib/response");
var _render = resp.render;

/**
 * render
 * @param {String} view the template
 * @param {Object} options the render options
 * @param {Function} [fn] the render function
 */
resp.render = function(view, options, fn) {
    options = options || {};
    var renderData = this.renderData;
    for(var key in renderData) {
        if(undefined === options[key]) {
            options[key] = renderData[key];
        }
    }

    _render.bind(this)(view, options, fn);
};

global.oj.use(function(req, resp, next) {
    var renderData = resp.renderData = Object.clone(config.get("render"), true);
    renderData.startTimestamp = +new Date();
    renderData.referer = req.headers.referer || "/";
    resp.nav = renderData.nav = [ { name: "Home", url: "/" } ];
    next();
});
