// Forma messages
(function ($) {
    'use strict';

    // Array.isArray    IE >= 9
    // Object.assign    not IE
    // const            IE >= 11

    if (!$('.forma').length || !window.location.hash) {
        return;
    }

    let hashMap = {};
    try {
        const feedback = window.JSON.parse(window.atob(window.location.hash.replace('\#', '')));
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

    const tpl = `
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
                desc = 'Aww yeah, you did the right thing!';
                break;
            case failure:
                type = 'alert-danger';
                title = '"' + feedback.title + '" form processed unsuccessfully';
                desc = 'Oops! But this also happens 😉';
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
        setTimeout(function () { message.alert('close'); }, 4000 + 1000 * Math.random());
    }

    function showMessages() {
        for (let id in hashMap) {
            if (hashMap.hasOwnProperty(id)) { showMessage(id, hashMap[id]); }
        }
        hashMap = {}
    }

    showMessages();
}(window.jQuery));
