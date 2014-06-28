# [jQuery Spoiler](http://le717.github.io/jquery-spoiler/) #
> Minimal, lightweight jQuery spoiler plugin

## Features ##
**jQuery Spoiler** is a very minimal and lightweight jQuery-powered spoiler system. With quick setup, very small requirements, and user-controllable styling, jQuery Spoiler puts the developer in control.

## Installation ##
1. **Download**
  * From GitHub:
  Download either the uncompressed or minified version or the latest [release](https://github.com/le717/jquery-spoiler/releases) (recommended).

2. **Include**
  ```html
  <script src="jquery.spoiler.min.js"></script>
  ```
  Be sure to include jQuery `>=` 1.10.0 beforehand!

3. **Wrap and Activate**
  ```html
    <div class="spoiler">Insert content to be spoilered here.</div>
  ```
  ```js
    $(".spoiler").spoiler();
  ```

4. **Apply Your CSS**

  You will want to write applicable CSS to handle the collapsing/expansion of spoilered content and for the show/hide button active/inactive states. Aside from an `overflow: hidden;` CSS attribute applied to the spoilered content, which is automatically handed, no CSS is edited or even required by jQuery Spoiler. It is all left up to you. See the available options to learn what the default classes are.

  If you wish for the spoilered content to remain hidden in the case JavaScript has been disabled or is not available on a client device, add an `overflow: hidden;` attribute to the spoiler class in your CSS. Otherwise, the spoilered content will be visible.

## Options ##
Most all aspects of jQuery Spoiler can be optionally customized (see [Limitations](#limitations) below).

* **buttonClass**
  * Type: `string`
  * Default: `btn-spoiler`
  * Description: The class each show/hide button belongs to. Must have the same base as spoilered content class, and must follow the `btn-bar` format (see [Limitations](#limitations) below). This class contains a nested `div` element which controls the placement of `buttonName`.

* **buttonActiveClass**
  * Type: `string`
  * Default: `btn-spoiler-active`
  * Description: When spoilered content has been revealed, the button clicked is assigned to this class to indicate the spoiler has been activated. Unlike `buttonClass`, this name can be in any format.

* **buttonName**
  * Type: `string`
  * Default: `Spoiler`
  * Description: Label for each show/hide button.

* **buttonActiveName**
  * Type: `string`
  * Default: `Spoiler`
  * Description: If different than `buttonName`, specified text will be used as the button label for the currently visible content.

* **includePadding**
  * Type: `boolean`
  * Default: `true`
  * Description: Disables the `paddingValue` option.

* **paddingValue**
  * Type: `number`
  * Default: `6`
  * Description: Adds a specified amount of padding to the bottom of spoilered content. This prevents spoilered content from being cut off. Negative numbers can be used to decrease the container size (the value of [`Element.scrollHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element.scrollHeight)).

* **spoilerVisibleClass**
  * Type: `string`
  * Default: `spoiler-visible`
  * Description: When spoilered content has been revealed, the content now shown is assigned to this class to indicate the content is visible. This is the class any container and expansion/contraction styling would be a part of. Unlike `buttonClass`, this name can be in any format.

* **triggerEvents**
  * Type: `boolean`
  * Default: `false`
  * Description: When enabled, events are fired upon completion of spoilered content being shown and hidden. Listen to them using `jQuery.on()`.
  ```js
  // Content shown
  $(".spoiler").on("contentvisible", function(event) {
    // Perform action
  });

  // Content hidden
  $(".spoiler").on("contenthidden", function(event) {
    // Perform action
  });
  ```

## Limitations ##
* You are restricted to button class names (`buttonClass`) that follow the format `btn-bar`. Anything not in this format will cause the script to break.
* The base spoiler class and button class (`buttonClass`) must be the same. Having a spoiler class of `spoiler` but a button class of `hidden-stuff` will fail.
This is because the base spoiler class name is stripped from the button name (see above limitation).

## Issues ##
If you find a bug or have a suggestion for jQuery Spoiler, feel free to open an [issue](https://github.com/le717/jquery-spoiler/issues). Be sure to check if your particular issue has not already been reported or is part of the limitations as listed above first. Pull requests with bug fixes and/or new features are also welcome at any time. :smiley:

You are recommended to use jQuery 2.0 or greater when using jQuery Spoiler. jQuery Spoiler has been successfully tested in Mozilla Firefox, Google Chrome, and Internet Explorer 11. As jQuery 2.0 only supports Internet Explorer 9 or later, consider that to be the minimum supported version. While I am not opposed to patches to fix issues with older browsers, they may not be merged as freely as patches for modern browsers.

## License ##
Created 2014 [Triangle717](http://Triangle717.WordPress.com)

[MIT License](LICENSE)
