# reporting/pubsub_notifier.py
import json
from google.cloud import pubsub_v1

class PubSubNotifier:
    def __init__(self):
        self.publisher = pubsub_v1.PublisherClient()
        self.topic_path = self.publisher.topic_path(
            config.PROJECT_ID,
            config.TOPIC_NAME
        )
    
    def notify(self, vulnerability_data):
        data = json.dumps(vulnerability_data).encode('utf-8')
        future = self.publisher.publish(self.topic_path, data)
        return future.result()
