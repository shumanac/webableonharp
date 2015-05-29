// Contents of functions.js
;(function($) {
  'use strict';
  var $body = $('html, body'),
      content = $('#main').smoothState({
        // Runs when a link has been activated
          prefetch: true,
            pageCacheSize: 4,
        onStart: {
          duration: 250, // Duration of our animation
          render: function (url, $container) {
            // toggleAnimationClass() is a public method
            // for restarting css animations with a class
           // content.toggleAnimationClass('is-exiting');
            $page.addClass('is-exiting');

        // Restart your animation
        smoothState.restartCSSAnimations();
            // Scroll user to the top
            $body.animate({
              scrollTop: 0
            });
          }
        },
//         onProgress : {
//     duration: 0, // Duration of the animations, if any.
//     render: function (url, $container) {
//        // var $loader=$('.loader');
//        // $loader.Class
//         $body.css('cursor', 'wait');
//         $body.find('a').css('cursor', 'wait');
//     }
// },
        onEnd: {
      duration: 0,
      render: function (url, $container, $content) {
        // Remove your CSS animation reversing class
        $page.removeClass('is-exiting');

        // Inject the new content
        $container.html($content);
      }
    }
      }).data('smoothState');
      //.data('smoothState') makes public methods available
})(jQuery);

var smoothState = $page.smoothState({
    onStart: {
      duration: 250,
      render: function (url, $container) {
        // Add your CSS animation reversing class
        $page.addClass('is-exiting');

        // Restart your animation
        smoothState.restartCSSAnimations();

        // anything else
      }
    },
    onEnd: {
      duration: 0,
      render: function (url, $container, $content) {
        // Remove your CSS animation reversing class
        $page.removeClass('is-exiting');

        // Inject the new content
        $container.html($content);
      }
    }
  }).data('smoothState');