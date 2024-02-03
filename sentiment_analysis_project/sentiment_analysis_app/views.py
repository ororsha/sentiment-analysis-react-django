from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .utils import analyze_sentiment


@csrf_exempt
def analyze_sentiment_api(request):
    if request.method == 'POST':
        # Get the JSON data from the request body
        data = json.loads(request.body)

        # Extract the text from the JSON data
        text = data.get('text', '')

        # Perform sentiment analysis
        sentiment = analyze_sentiment(text)

        # Return the result as JSON
        return JsonResponse({'result': sentiment})
    else:
        # Handle other HTTP methods if needed
        return JsonResponse({'error': 'Invalid request method'})
