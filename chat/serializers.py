from rest_framework import serializers
from django.utils import timezone


class IDSerializer(serializers.Serializer):
    socketid = serializers.CharField(max_length=40, required=True)
    type = serializers.CharField(default='id', read_only=True)


class MessageSerializer(IDSerializer):
    type = serializers.CharField(default='message', read_only=True)
    handle = serializers.CharField(max_length=80, min_length=2, required=True)
    message = serializers.CharField(required=True)
    timestamp = serializers.TimeField(default=timezone.now)
