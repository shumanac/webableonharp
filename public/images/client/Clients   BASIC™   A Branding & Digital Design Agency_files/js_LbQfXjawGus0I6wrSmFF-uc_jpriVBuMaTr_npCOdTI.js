/*
 * Behavior for the automatic file upload
 */

(function ($) {
  Drupal.behaviors.autoUpload = {
    attach: function(context, settings) {
      $('.form-item input.form-submit[value=Upload]', context).hide();
      $('.form-item input.form-file', context).change(function() {
        $parent = $(this).closest('.form-item');

        //setTimeout to allow for validation
        //would prefer an event, but there isn't one
        setTimeout(function() {
          if(!$('.error', $parent).length) {
            $('input.form-submit[value=Upload]', $parent).mousedown();
          }
        }, 100);
      });
    }
  };
})(jQuery);
;
(function ($) {
  Drupal.behaviors.contextBreakpoint = {
    width: null,
    height: null,

    breakpointsCookie: 'context_breakpoints',
    activeBreakpoints: null,

    saveResolutionCookie: false,
    resolutionCookie: 'context_breakpoint_resolution',

    reloadActive: false,

    // settings
    settings: null,
    contexts: null,

    // Whether user is on an admin page.
    isAdminPage: null,

    arrayDiff: function(a1, a2) {
      return $(a1).not(a2).get().concat($(a2).not(a1).get());
    },

    preInit: function() {
      if (!('context_breakpoint' in Drupal.settings)) {
        return;
      }

      var config = Drupal.settings.context_breakpoint;

      // Set settings that we need later on.
      this.settings = config.settings;
      this.contexts = config.contexts;
      this.isAdminPage = config.is_admin;

      this.breakpointsInUrl = this.settings.breakpoints_in_url;
      this.autoReload = this.isReloadEnabled();

      var cookieFlag = this.checkForCookie();
      var flagUrl  = this.checkForUrlDiscrepancy();

      if (flagUrl) {
        window.location.href = flagUrl;
      }
      else if (cookieFlag) {
        this.doReload();
      }
    },

    checkForCookie: function() {
      if ($.cookie(this.breakpointsCookie) === null) {
        this.saveCookie(this.checkBreakpoints());
        return true;
      }

      return false;
    },

    checkForUrlDiscrepancy: function() {
      if (this.breakpointsInUrl && this.autoReload) {
        var href = window.location.href;

        var currentCookie = $.cookie(this.breakpointsCookie);

        var pattern = new RegExp('context\-breakpoints\=([^\&\?]+)');
        var result = pattern.exec(href);

        var newUrl = null;

        if (result === null) {
          if (currentCookie === '') {
            // do nothing, since no context is set anyway
          }
          else {
            var newUrl = href + (href.search(/\?/) === -1 ? '?' : '&') + 'context-breakpoints=' + currentCookie;
          }
        }
        else {
          if (result[1] !== currentCookie) {
            if (currentCookie === '') {
              // Strip out the whole parameter, since we do not need it
              newUrl = href.replace('&context-breakpoints=' + result[1], '');
              newUrl = newUrl.replace('?context-breakpoints=' + result[1], '');
            }
            else {
              newUrl = href.replace(result[1], currentCookie);
            }
          }
        }

        return newUrl;
      }

      return false;
    },

    attach: function (context, settings) {
      if (!this.contexts) {
        // Nothing to do if no contexts available.
        return;
      }

      // Do not do anything if reload is already triggered
      // to prevent messing with the cookie again.
      if (this.checkForCookieReload) {
        return;
      }

      var that = this;

      // Update cookies on each resize.
      $(window).resize(function() {
        that.onResize();
      });

      // Check if cookie with resolution should also be saved.
      this.saveResolutionCookie = this.settings.save_resolution;
      if (!this.saveResolutionCookie) {
        // Otherwise, delete if it exists.
        $.cookie(this.resolutionCookie, '', {'expires': new Date(0)});
      }

      // Retrieve active breakpoints from cookie.
      this.activeBreakpoints = this.getCookieBreakpoints();

      // Do a first manual cookie update to catch the current state.
      this.onResize();
    },

    // Set the cookie with screen and browser width + height.
    // Then check if we need to reload.
    onResize: function() {
      // Compute currently active breakpoints.
      var newActiveBreakpoints = this.checkBreakpoints();

      // If required, update resolution cookie.
      if (this.saveResolutionCookie) {
        $window = $(window);
        var value = $window.width() + 'x' + $window.height()
           + '|' + screen.width + 'x' + screen.height;

        $.cookie(this.resolutionCookie, value);
      }

      // Check if any breakpoint has become active or inactive
      var diff = this.arrayDiff(this.activeBreakpoints, newActiveBreakpoints);

      if (diff.length) {
        // Update the cookie.
        this.saveCookie(newActiveBreakpoints);
        this.activeBreakpoints = newActiveBreakpoints;

        // If url auto-change is enabled, we have to do it now.
        var newUrl = this.checkForUrlDiscrepancy();
        if (newUrl) {
          window.location.href = newUrl;
        }
        else {
          // Check if we have to reload.
          for (var key in diff) {
            if (this.isReloadEnabled(diff[key])) {
              this.doReload();
              break;
            }
          }
        }
      }
    },

    isReloadEnabled: function(context) {
      // On admin pages, do not reload.
      if (this.isAdminPage && this.settings.admin_disable_reload) {
        return false;
      }
      // Check for specific context.
      else if (context) {
        return this.contexts[context].autoreload;
      }
      // Check if any context has reload enabled.
      else {
        var contexts = this.contexts;

        for (var key in contexts) {
          if (contexts[key].autoreload) {
            return true;
          }
        }

        return false;
      }
    },

    saveCookie: function(activeBreakpoints) {
      var points = activeBreakpoints.length ? activeBreakpoints.join(',') : 'none';
      $.cookie(this.breakpointsCookie, points);
    },

    getCookieBreakpoints: function() {
      var value = $.cookie(this.breakpointsCookie);
      if (value === 'none') {
        value = null;
      }

      var breakpoints = value ? value.split(',') : [];

      return breakpoints;
    },

    checkBreakpoints: function(curWidth, curHeight) {
      var contexts = this.contexts;
      var $window = $(window);

      var activeBreakpoints = [];

      for (var contextName in contexts) {
        var context = contexts[contextName];

        isActive = true;

        for (var key in context.breakpoints) {

          for (var cmd in context.breakpoints[key]) {
            var value = context.breakpoints[key][cmd];

            // If the result changes, the condition has changed, so we need
            // to reload.
            var deviceCheck = cmd.search('device') !== -1;

            var width = height = null;
            if (deviceCheck) {
              width = screen.width;
              height = screen.height;
            }
            else {
              width = $window.width();
              height = $window.height();
            }

            var flag = this.checkCondition(cmd, width, height, value);

            if (!flag) {
              isActive = false;
              break;
            }
          }

        }

        if (isActive) {
          activeBreakpoints.push(contextName);
        }
      }

      return activeBreakpoints;
    },

    doReload: function() {
      window.location.reload(true);

      // FF prevents reload in onRsize event, so we need to do it
      // in a timeout. See issue #1859058
      if ('mozilla' in $.browser)  {
        setTimeout(function() {
          window.location.reload(true);
        }, 10);
      }
      return;
    },

    checkCondition: function(condition, width, height, value) {
      var flag = null;

      switch (condition) {
        case 'width':
        case 'device-width':
          flag = width === value;
          break;

        case 'min-width':
        case 'min-device-width':
          flag = width >= value;
          break;

        case 'max-width':
        case 'max-device-width':
          flag = width <= value;
          break;

        case 'height':
        case 'device-height':
          flag = height === value;
          break;

        case 'min-height':
        case 'min-device-height':
          flag = height >= value;
          break;

        case 'max-height':
        case 'max-device-height':
          flag = height <= value;
          break;

        case 'aspect-ratio':
        case 'device-aspect-ratio':
          flag = width / height === value;
          break;

        case 'min-aspect-ratio':
        case 'min-device-aspect-ratio':
          flag = width / height >= value;
          break;

        case 'max-aspect-ratio':
        case 'max-device-aspect-ratio':
          flag = width / height <= value;
          break;

        default:
          break;
      }

      return flag;
    }
  };
})(jQuery);
;
(function ($) {

 /**
   * UI Improvements for the Content Editing Form
   */
 Drupal.behaviors.panopolyAdmin = {
   attach: function (context, settings) {
     var width = $('#node-edit #edit-title').width() - $('#node-edit .form-item-path-alias label').width() - $('#node-edit .form-item-path-alias .field-prefix').width() - 10;
     $('#node-edit .form-item-path-alias input').css('width', width);

     if ($('#node-edit .form-item-body-und-0-value label').html() == 'Body <span class="form-required" title="This field is required.">*</span>') {
       $('#node-edit .form-item-body-und-0-value label').html('');
       $('#node-edit .form-item-body-und-0-value label').css('text-align', 'right');
     }

     if ($('#node-edit .form-item-field-featured-image-und-0-alt label')) {
       $('#node-edit .form-item-field-featured-image-und-0-alt label').html('Alt Text');
     }
   }
 }

 /**
   * Automatically Upload Files/Images Attached
   */
 Drupal.behaviors.panopolyAutoUpload = {
    attach: function (context, settings) {
      $('#node-edit input#edit-field-featured-image-und-0-upload').next('input[type="submit"]').hide();
      $('form', context).delegate('#node-edit input#edit-field-featured-image-und-0-upload', 'change', function() {  
        $(this).next('input[type="submit"]').mousedown();
      }); 
    }
  };

  /**
   * Automatically fill in a menu link title, if possible.
   *
   * NOTE: This behavior is a copy and paste from the Core Menu module's menu.js
   * script. It has been adapted to update proper targeting. This brings back
   * the core functionality.
   */
  Drupal.behaviors.panopolyLinkAutomaticTitle = {
    attach: function (context) {
      $('.pane-node-form-menu', context).each(function () {
        // Try to find menu settings widget elements as well as a 'title' field in
        // the form, but play nicely with user permissions and form alterations.
        var $checkbox = $('.form-item-menu-enabled input', this);
        var $link_title = $('.form-item-menu-link-title input', context);
        var $title = $(this).closest('form').find('.form-item-title input');
        // Bail out if we do not have all required fields.
        if (!($checkbox.length && $link_title.length && $title.length)) {
          return;
        }
        // If there is a link title already, mark it as overridden. The user expects
        // that toggling the checkbox twice will take over the node's title.
        if ($checkbox.is(':checked') && $link_title.val().length) {
          $link_title.data('menuLinkAutomaticTitleOveridden', true);
        }
        // Whenever the value is changed manually, disable this behavior.
        $link_title.keyup(function () {
          $link_title.data('menuLinkAutomaticTitleOveridden', true);
        });
        // Global trigger on checkbox (do not fill-in a value when disabled).
        $checkbox.change(function () {
          if ($checkbox.is(':checked')) {
            if (!$link_title.data('menuLinkAutomaticTitleOveridden')) {
              $link_title.val($title.val());
            }
          }
          else {
            $link_title.val('');
            $link_title.removeData('menuLinkAutomaticTitleOveridden');
          }
          $checkbox.closest('fieldset.vertical-tabs-pane').trigger('summaryUpdated');
          $checkbox.trigger('formUpdated');
        });
        // Take over any title change.
        $title.keyup(function () {
          if (!$link_title.data('menuLinkAutomaticTitleOveridden') && $checkbox.is(':checked')) {
            $link_title.val($title.val());
            $link_title.val($title.val()).trigger('formUpdated');
          }
        });
      });
    }
  };

})(jQuery);
;
(function ($) {

 Drupal.behaviors.panopolyMagic = {
   attach: function (context, settings) {

     /**
      * Title Hax for Panopoly
      *
      * Replaces the markup of a node title pane with
      * the h1.title page element
      */
     if ($.trim($('.pane-node-title .pane-content').html()) == $.trim($('h1.title').html())) {
       $('.pane-node-title .pane-content').html('');
       $('h1.title').hide().clone().prependTo('.pane-node-title .pane-content');
       $('.pane-node-title h1.title').show();
     }

   }
 }

})(jQuery);

(function ($) {

  /**
   * Improves the Auto Submit Experience for CTools Modals
   */
  Drupal.behaviors.panopolyMagicAutosubmit = {
    attach: function (context, settings) {
      // Replaces click with mousedown for submit so both normal and ajax work.
      $('.ctools-auto-submit-click', context)
      // Exclude the 'Style' type form because then you have to press the
      // "Next" button multiple times.
      // @todo: Should we include the places this works rather than excluding?
      .filter(function () { return $(this).closest('form').attr('id').indexOf('panels-edit-style-type-form') !== 0; })
      .click(function(event) {
        if ($(this).hasClass('ajax-processed')) {
          event.stopImmediatePropagation();
          $(this).trigger('mousedown');
          return false;
        }
      });

      // 'this' references the form element
      function triggerSubmit (e) {
        var $this = $(this), preview_widget = $('.widget-preview', context);
        if (!preview_widget.hasClass('panopoly-magic-loading')) {
          preview_widget.addClass('panopoly-magic-loading');
          $this.find('.ctools-auto-submit-click').click();
        }
      }

      // e.keyCode: key
      var discardKeyCode = [
        16, // shift
        17, // ctrl
        18, // alt
        20, // caps lock
        33, // page up
        34, // page down
        35, // end
        36, // home
        37, // left arrow
        38, // up arrow
        39, // right arrow
        40, // down arrow
         9, // tab
        13, // enter
        27  // esc
      ];

      // Special handling for link field widgets. This ensures content which is ahah'd in still properly autosubmits.
      $('.field-widget-link-field input:text', context).addClass('panopoly-textfield-autosubmit').addClass('ctools-auto-submit-exclude');

      // Handle text fields and textareas.
      var timer;
      $('.panopoly-textfield-autosubmit, .panopoly-textarea-autosubmit', context)
      .once('ctools-auto-submit')
      .bind('keyup blur', function (e) {
        var $element;
        $element = $('.widget-preview .pane-title', context);

        clearTimeout(timer);

        // Filter out discarded keys.
        if (e.type !== 'blur' && $.inArray(e.keyCode, discardKeyCode) > 0) {
          return;
        }

        // Special handling for title elements.
        if ($element.length && $(e.target).parent('.form-item-title,.form-item-widget-title').length) {

          // If all text was removed, remove the existing title markup from the dom.
          if (!$(e.target).val().length) {
            $('.widget-preview .pane-title', context).remove();
          }
          // Insert as link title text if the title is a link.
          else if ($('a', $element).length) {
            $('a', $element).html($(e.target).val());
          }
          // Otherwise just insert the form value as-is.
          else {
            $element.html($(e.target).val());
          }
        } 
        // Automatically submit the field on blur. This won't happen if title markup is already present.
        else if (e.type == 'blur') {
          triggerSubmit.call(e.target.form)
        }
        // If all else fails, just trigger a timer to submit the form a second after the last activity.
        else {
          timer = setTimeout(function () { triggerSubmit.call(e.target.form); }, 1000);
        }
      });
  
      // Handle autocomplete fields.
      $('.panopoly-autocomplete-autosubmit', context)
      .once('ctools-auto-submit')
      .bind('keyup blur', function (e) {
        // Detect when a value is selected via TAB or ENTER.
        if (e.type === 'blur' || e.keyCode === 13) {
          // We defer the submit call so that it happens after autocomplete has
          // had a chance to fill the input with the selected value.
          setTimeout(function () {
            triggerSubmit.call(e.target.form);
          }, 0);
        }
      });

      // Prevent ctools auto-submit from firing when changing text formats.
      $(':input.filter-list').addClass('ctools-auto-submit-exclude');

    }
  }
})(jQuery);
;
(function ($) {

 Drupal.behaviors.PanelsAccordionStyle = {
   attach: function (context, settings) {
     for ( region_id in Drupal.settings.accordion ) {
    		var accordion = Drupal.settings.accordion[region_id] ;
		    jQuery('#'+region_id).accordion(accordion.options);
  	 }
   }
  }

})(jQuery);
;
/**
 * @file
 * JavaScript integrations between the Caption Filter module and particular
 * WYSIWYG editors. This file also implements Insert module hooks to respond
 * to the insertion of content into a WYSIWYG or textarea.
 */
(function ($) {

$(document).bind('insertIntoActiveEditor', function(event, options) {
  if (options['fields']['title'] && Drupal.settings.captionFilter.widgets[options['widgetType']]) {
    options['content'] = '[caption caption="' + options['fields']['title'].replace(/"/g, '\\"') + '"]' + options['content'] + '[/caption]';
  }
});

Drupal.captionFilter = Drupal.captionFilter || {};

Drupal.captionFilter.toHTML = function(co, editor) {
  return co.replace(/(?:<p>)?\[caption([^\]]*)\]([\s\S]+?)\[\/caption\](?:<\/p>)?[\s\u00a0]*/g, function(a,b,c){
    var id, cls, w, tempClass;

    b = b.replace(/\\'|\\&#39;|\\&#039;/g, '&#39;').replace(/\\"|\\&quot;/g, '&quot;');
    c = c.replace(/\\&#39;|\\&#039;/g, '&#39;').replace(/\\&quot;/g, '&quot;');
    id = b.match(/id=['"]([^'"]+)/i);
    cls = b.match(/align=['"]([^'"]+)/i);
    ct = b.match(/caption=['"]([^'"]+)/i);
    w = c.match(/width=['"]([0-9]+)/);

    id = ( id && id[1] ) ? id[1] : '';
    cls = ( cls && cls[1] ) ? 'caption-' + cls[1] : '';
    ct = ( ct && ct[1] ) ? ct[1].replace(/\\\\"/,'"') : '';
    w = ( w && w[1] ) ? parseInt(w[1])+'px' : 'auto';

    if (editor == 'tinymce')
      tempClass = (cls == 'caption-center') ? 'mceTemp mceIEcenter' : 'mceTemp';
    else if (editor == 'ckeditor')
      tempClass = (cls == 'caption-center') ? 'mceTemp mceIEcenter' : 'mceTemp';
    else
      tempClass = '';

    if (ct) {
      return '<div class="caption ' + cls + ' ' + tempClass + ' draggable"><div class="caption-width-container" style="width: ' + w + '"><div class="caption-inner">' + c + '<p class="caption-text">' + ct + '</p></div></div></div>';
    }
    else {
      return '<div class="caption ' + cls + ' ' + tempClass + ' draggable"><div class="caption-width-container" style="width: ' + w + '"><div class="caption-inner">' + c + '</div></div></div>';
    }
  });
};

Drupal.captionFilter.toTag = function(co) {
  return co.replace(/(<div class="caption [^"]*">)\s*<div[^>]+>\s*<div[^>]+>(.+?)<\/div>\s*<\/div>\s*<\/div>\s*/gi, function(match, captionWrapper, contents) {
    var align;
    align = captionWrapper.match(/class=.*?caption-(left|center|right)/i);
    align = (align && align[1]) ? align[1] : '';
    caption = contents.match(/\<p class=\"caption-text\"\>(.*)\<\/p\>/);
    caption_html = (caption && caption[0]) ? caption[0] : '';
    caption = (caption && caption[1]) ? caption[1].replace(/"/g, '\\"') : '';
    contents = contents.replace(caption_html, '');

    return '[caption' + (caption ? (' caption="' + caption + '"') : '') + (align ? (' align="' + align + '"') : '') + ']' + contents + '[/caption]';
  });
};

})(jQuery);
;
