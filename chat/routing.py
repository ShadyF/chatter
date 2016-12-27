from channels import route

from . import consumers

websocket_routing = [
    # Called when WebSockets connect
    route("websocket.connect", consumers.ws_connect),

    # Called when WebSockets get sent a data frame
    route("websocket.receive", consumers.ws_receive),

    # Called when WebSockets disconnect
    route("websocket.disconnect", consumers.ws_disconnect),
]
