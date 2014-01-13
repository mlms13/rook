define(['jquery', 'bootstrap'], function ($) {
    // set up a notification area that we'll add our notifications to
    var $area = $('<div class="notification-area" />').appendTo($('body')),
        notifications = []; //  a list of all past notifications

    function createNotification(type, title, message) {
        var $notification = $('<div class="alert alert-' + type + ' alert-dismissable fade" />')
                            .append($('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'));

        // empty the notification area before adding new alerts
        $area.empty();

        // only append a title if we were given a title
        if (title) {
            $notification.append($('<strong>' + title + '</strong>'));
        }

        // add the message, then display it
        $notification
            .append($('<span>' + message + '</span>'))
            .appendTo($area)
            .addClass('in');

        // store this notification
        notifications.push({
            type: type,
            title: title,
            message: message
        });
    }

    return {
        message: function (data) {
            data.type = data.type || 'info'; // default to "info" if no "type" is provided
            createNotification(data.type, data.title, data.message);
        },
        info: function (data) {
            createNotification('info', data.title, data.message);
        },
        success: function (data) {
            createNotification('success', data.title, data.message);
        },
        warning: function (data) {
            createNotification('warning', data.title, data.message);
        },
        danger: function (data) {
            createNotification('danger', data.title, data.message);
        }
    };
});