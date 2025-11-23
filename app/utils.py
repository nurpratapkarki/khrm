
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """Custom exception handler for better error responses"""
    response = exception_handler(exc, context)
    
    if response is not None:
        custom_response_data = {
            'success': False,
            'error': {
                'message': None,
                'details': None
            }
        }
        
        if isinstance(response.data, dict):
            custom_response_data['error']['message'] = response.data.get('detail', 'An error occurred')
            custom_response_data['error']['details'] = response.data
        else:
            custom_response_data['error']['message'] = str(response.data)
        
        response.data = custom_response_data
    
    return response
