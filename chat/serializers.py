from rest_framework import serializers
from django.utils import timezone


class MessageSerializer(serializers.Serializer):
    handle = serializers.CharField(max_length=80, min_length=2, required=True)
    message = serializers.CharField(required=True)
    timestamp = serializers.TimeField(default=timezone.now)
