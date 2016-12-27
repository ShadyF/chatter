from channels import Group


def ws_connect(message):
    Group('chat').add(message.reply_channel)


def ws_receive(message):
    Group('chat').send({
        'text': message['text']
    })


def ws_disconnect(message):
    Group('chat').discard(message.reply_channel)
