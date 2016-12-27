import json
from channels import Group
from django.core.serializers.json import DjangoJSONEncoder

from .serializers import MessageSerializer


def ws_connect(message):
    Group('chat').add(message.reply_channel)


def ws_receive(message):
    data = json.loads(message['text'])
    serialized_message = MessageSerializer(data=data)

    if serialized_message.is_valid():
        json_message = json.dumps(serialized_message.validated_data, cls=DjangoJSONEncoder)

        Group('chat').send({
            'text': json_message
        })


def ws_disconnect(message):
    Group('chat').discard(message.reply_channel)
