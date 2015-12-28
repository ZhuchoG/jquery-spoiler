/*jslint browser: true, vars: true, devel: true, nomen: true, maxerr: 50 */
/*global module, exports, define, jQuery */

/*
 * jQuery Spoiler
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * With code by Jarred Ballard
 * <http://jarred.io/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */

(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS style for Browserify
    module.exports = factory;
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  "use strict";
  $.fn.spoiler = function (options) {
    
    if (options === "update") {
//      showContent.height = setHeight($content, spoiler);
      return this;
    }
    
    var settings = $.extend({
      contentClass       : "spoiler-content",
      paddingValue       : 6,
      triggerEvents      : false,
      includePadding     : true,
      buttonActiveClass  : "spoiler-active",
      spoilerVisibleClass: "spoiler-content-visible"
    }, options);

    var showContent    = {"height": "0"},
        hideContent    = {"height": "0"},
        contentClass   = "." + settings.contentClass,
        spoilerHeights = {};


    /**
     * Set and/or update the spoiler height.
     * @param {jQuery} $this The current spoiler.
     * @returns {String} The content height, expressed in pixels.
     */
    function setHeight($this) {
      // Get the height of the content to be spoilered now,
      // as once we hide the text it cannot be restored.
      // Use the value of `scrollHeight`, which does not change
      // even if a height is applied through CSS.
      var contentHeight = $this.prop("scrollHeight");

      // Add padding to bottom of container only if enabled
      contentHeight = (settings.includePadding ?
                       contentHeight + parseInt(settings.paddingValue, 10) : contentHeight);
      return contentHeight + "px";
    }


    function spoilerAction($this, $content, restart) {
      // Check if content is visible or not
      var isVisible = restart !== undefined ? restart : $content.hasClass(settings.spoilerVisibleClass);

      // Toggle content visibility
      if (isVisible) {
        $content.css(hideContent);
      } else {
        $content.css(showContent);
      }

      // If enabled, trigger events upon show/hide
      if (settings.triggerEvents) {
        if (isVisible) {
          $this.trigger("jq-spoiler-hidden");
        } else {
          $this.trigger("jq-spoiler-visible");
        }
      }

      // Add the visible classes as they should be
      if (restart !== undefined && !restart) {
        $content.addClass(settings.spoilerVisibleClass);
        $this.addClass(settings.buttonActiveClass);
        return true;
      }

      // Toggle active classes for both container and button
      $content.toggleClass(settings.spoilerVisibleClass);
      $this.toggleClass(settings.buttonActiveClass);
      return true;
    }


    $(contentClass).each(function () {
      var $this = $(this);
      // The only CSS requirement is for the spoilered content
      // to have an overflow: hidden rule applied.
      $this.css("overflow", "hidden");
      var id = $this.attr("data-spoiler-link");

      // Set the height of the content to be spoilered
      spoilerHeights[id] = setHeight($this);

      // Now that we have the height, hide the content
      $this.css("height", "0");
    });


    $(this).on("click", function () {
      // Get the ID for the clicked spoiler button so only that one is triggered
      var $this    = $(this),
          spoiler  = $this.attr("data-spoiler-link"),
          $content = $(contentClass + "[data-spoiler-link=" + spoiler + "]");

      // Set the height
      showContent.height = spoilerHeights[spoiler];

      // Update the height if the content was changed
//      $content.on("jq-spoiler-change", function() {
//        showContent.height = setHeight($content, spoiler);
//        spoilerAction($this, $content, false);
//      });

      // Perform the show/hide actions
      spoilerAction($this, $content);
    });
    return this;
  };
}));
