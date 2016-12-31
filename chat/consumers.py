import json
from channels import Group
from django.core.serializers.json import DjangoJSONEncoder

from .serializers import IDSerializer, MessageSerializer


def ws_connect(message):
    id_response = IDSerializer(data={'socketid': message.reply_channel.name})

    if id_response.is_valid():
        message.reply_channel.send({
            "text": json.dumps(id_response.validated_data)
        })

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
