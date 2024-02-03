from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .utils import analyze_sentiment, respond_to_sentiment
from .models import UserInput

@csrf_exempt
def analyze_sentiment_api(request):
    if request.method == 'POST':
        # Get the JSON data from the request body
        data = json.loads(request.body)

        # Extract the text from the JSON data
        text = data.get('text', '')

        # Perform sentiment analysis
        sentiment = analyze_sentiment(text)

        # Customize the response based on sentiment
        response_text = respond_to_sentiment(sentiment)

        full_res = sentiment + " " + response_text;

        # Save the user input to the database
        save_user_input(text, full_res)

        # Optionally, you can log or perform additional processing here

        # Return the result as JSON
        return JsonResponse({'result': sentiment, 'response_text': response_text})
    else:
        # Handle other HTTP methods if needed
        return JsonResponse({'error': 'Invalid request method'})


def save_user_input(text, response):
    # Create a UserInput instance
    user_input = UserInput(text=text, response=response)

    # Save the instance to the database
    user_input.save()