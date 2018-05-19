// Forma messages
(function ($) {
    'use strict';

    if (!$('.forma').length) {
        return;
    }

    $('body').append('<div id="messages"/>');

    const tpl = `
<div class="alert {{ type }} alert-dismissible fade show">
    <h4 class="alert-heading">{{ title }}</h4>
    <p>{{ desc }}</p>
    <hr>
    <p class="mb-0">As you can see it was very simple! 🤗</p>
    <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>
</div>`,
        location = new URL(window.location.href),
        messages = $('#messages'),
        success = 'success',
        failure = 'failure';
    let hashMap = {};

    function showMessage(id, value) {
        let node = $('#' + id),
            type, title, desc, message;
        switch (value) {
            case success:
                type = 'alert-success';
                title = '"' + node.attr('title') + '" form processed successfully!';
                desc = 'Aww yeah, you did the right thing!';
                break;
            case failure:
                type = 'alert-danger';
                title = '"' + node.attr('title') + '" form processed unsuccessfully';
                desc = 'Oops! But this also happens 😉';
                break;
            default:
                console.log('unknown value "' + value + '"');
                return;
        }
        message = $(tpl
            .replace('{{ type }}', type)
            .replace('{{ title }}', title)
            .replace('{{ desc }}', desc));
        messages.append(message);
        setTimeout(function () { message.alert('close'); }, 4000 + 1000 * Math.random());
    }

    function showMessages() {
        for (let id in hashMap) {
            if (hashMap.hasOwnProperty(id)) { showMessage(id, hashMap[id]); }
        }
        hashMap = {}
    }

    $('.forma').each(function (i, node) {
        let value = location.searchParams.get(node.id);
        if (value) { hashMap[node.id] = value }
    });
    showMessages();
}(window.jQuery));
