// Polyfills
(function () {
    'use strict';

    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
    if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function(target, firstSource) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }
                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }
                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
                return to;
            }
        });
    }
});

// Forma messages
(function ($) {
    'use strict';

    if (!$('.forma').length || !window.location.hash) {
        return;
    }

    var hashMap = {};
    try {
        var feedback = window.JSON.parse(window.atob(window.location.hash.replace('\#', '')));
        if (Array.isArray(feedback)) {
            for (var i = 0, length = feedback.length; i < length; i++) {
                hashMap[feedback[i].id] = Object.assign({presented: false, title: ''}, feedback[i]);
            }
        } else {
            hashMap[feedback.id] = Object.assign({presented: false, title: ''}, feedback);;
        }
    } catch (err) {
        return;
    }
    $('body').append('<div id="messages"/>');
    $('.forma').each(function (i, node) {
        if (hashMap.hasOwnProperty(node.id)) {
            hashMap[node.id].presented = true;
            hashMap[node.id].title = node.title;
        }
    });

    var tpl = `
<div class="alert {{ type }} alert-dismissible fade show">
    <h4 class="alert-heading">{{ title }}</h4>
    <p>{{ desc }}</p>
    <hr>
    <p class="mb-0">As you can see it was very simple! 🤗</p>
    <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>
</div>`,
        messages = $('#messages'),
        success = 'success',
        failure = 'failure';

    function showMessage(id, feedback) {
        var type, title, desc, message;
        switch (feedback.result) {
            case success:
                type = 'alert-success';
                title = '"' + feedback.title + '" form processed successfully!';
                desc = 'Forma works!';
                break;
            case failure:
                type = 'alert-danger';
                title = '"' + feedback.title + '" form processed unsuccessfully';
                desc = 'But Forma works!';
                break;
            default:
                console.log('unknown feedback "' + feedback.result + '"');
                return;
        }
        message = $(tpl
            .replace('{{ type }}', type)
            .replace('{{ title }}', title)
            .replace('{{ desc }}', desc));
        messages.append(message);
        setTimeout(function () { message.alert('close'); window.location.hash = ''; }, 4000 + 1000 * Math.random());
    }

    function showMessages() {
        for (var id in hashMap) {
            if (hashMap.hasOwnProperty(id)) { showMessage(id, hashMap[id]); }
        }
        hashMap = {}
    }

    showMessages();
}(window.jQuery));

// Simple vote
(function ($) {
    'use strict';

    var $votes = $('.vote'),
        $likes = $('#likes');

    if (!$votes.length || !$likes.length) {
        return;
    }

    var mirror = {
        like: 'unlike',
        unlike: 'like',
    };

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
    var cookies = {
        getItem: function (sKey) {
            if (!sKey) { return null; }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) { return false; }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };

    function swap() {
        var $from = $(this);
        if (!mirror.hasOwnProperty($from.data('state'))) {
            return;
        }
        var $to = $likes.children('[data-state="' + mirror[$from.data('state')] + '"]');
        if (!$to.length) {
            return;
        }
        $from.html($to.html()).data('state', $to.data('state'));
        cookies.setItem(this.id, $to.data('state'));
    }

    $votes.removeClass('d-none').click(function () {
        swap.apply(this);
    }).each(function () {
        if (cookies.hasItem(this.id)) {
            if (cookies.getItem(this.id) !== $(this).data('state')) {
                swap.apply(this);
            }
        }
    });
}(window.jQuery));

// Scroll spy
(function ($){
    'use strict';

    var $menu = $('#navigation');

    if (!$menu.length) {
        return;
    }

    $('body').scrollspy({target: $menu});
}(window.jQuery));
