/*
 * jQuery Spoiler
 * Created 2014 Triangle717
 * <http://Triangle717.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT/>
 */

(function($) {
  "use strict";
  $.fn.spoiler = function(options) {
    // Default options
    var settings = $.extend({
      buttonName         : "Spoiler",
      buttonClass        : "btn-spoiler",
      paddingValue       : 6,
      triggerEvents      : false,
      includePadding     : true,
      buttonActiveClass  : "btn-spoiler-active",
      spoilerVisibleClass: "spoiler-visible"
    }, options);

    // Variables for usage
    var btnID          = 0,
        spoilerID      = 0,
        buttonClass    = "." + settings.buttonClass,
        spoilerHeights = [];

    // Assign IDs to each spoiler
    $(this).each(function() {
      var $this = $(this);
      $this.attr("id", $this.attr("class") + "-" + spoilerID);
      spoilerID += 1;

      // The only CSS requirement for this to work for the spoilered content
      // to have an overflow: hidden rule applied.
      $this.css("overflow", "hidden");

      // Get the height of the content to be spoilered now,
      // as once we hide the text it cannot be restored.
      // Use the value of `scrollHeight`, which does not change
      // even if a height is applied through CSS.
      var contentHight = $this[0].scrollHeight;

      // Add padding to bottom of container only if enabled
      contentHight = (settings.includePadding ? $this[0].scrollHeight + settings.paddingValue
                      : $this[0].scrollHeight);
      spoilerHeights.push(contentHight + "px");
    });

    // Add the toggle button
    $(this).before("<div class='" + settings.buttonClass + "'><span>" +
                   settings.buttonName + "</span></div>");

    // Add matching IDs to each toggle button
    $(buttonClass).each(function() {
      $(this).attr("id", settings.buttonClass + "-" + btnID);
      btnID += 1;
    });

    // Now that we have the height, hide all content
    $(this).css("height", "0");

    $(buttonClass).on("click", function() {
      // Get the ID for the clicked spoiler button so only that one is triggered
      var spoilerID = "#" + $(this).attr("id").replace(/btn-/i, ""),
          spoilerNum = spoilerID.slice(spoilerID.length - 1),
          $this  = $(spoilerID); // Spoilered content

      // The container's collapsed/expanded height values
      var showContent = {"height": spoilerHeights[spoilerNum]},
          hideContent = {"height": "0"};

      // Check if content is visible or not
      var contentVisible = $this.hasClass(settings.spoilerVisibleClass);

      // Hide/show content
      if (contentVisible) {
        $this.css(hideContent);
      } else {
        $this.css(showContent);
      }

      // If enabled, trigger events upon show/hide
      if (settings.triggerEvents) {
        if (contentVisible) {
          $($this).trigger("contenthidden");
        } else {
          $($this).trigger("contentvisible");
        }
      }

      // Toggle between active classes for both button and container
      $this.toggleClass(settings.spoilerVisibleClass);
      $(this).toggleClass(settings.buttonActiveClass);
    });
    return this;
  };
})(jQuery);
