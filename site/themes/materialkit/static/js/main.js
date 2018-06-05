// Forma messages
(function ($) {
    'use strict';

    // Array.isArray    IE >= 9
    // Object.assign    not IE

    if (!$('.forma').length || !window.location.hash) {
        return;
    }

    let hashMap = {};
    try {
        var feedback = window.JSON.parse(window.atob(window.location.hash.replace('\#', '')));
        if (Array.isArray(feedback)) {
            for (let i = 0, length = feedback.length; i < length; i++) {
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
        let type, title, desc, message;
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
        for (let id in hashMap) {
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
        like: 'liked',
        liked: 'like',
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
        var $to = $(this);
        if (!mirror.hasOwnProperty($to.data('state'))) {
            return;
        }
        var $from = $likes.children('[data-state="' + mirror[$to.data('state')] + '"]');
        if (!$from.length) {
            return;
        }
        $to.html($from.html()).data('state', $from.data('state'));
        cookies.setItem(this.id, $from.data('state'));
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
