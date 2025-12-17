from django.contrib import messages
from django.contrib.auth import get_user_model
from app.models.sso import AllowedEmail

User = get_user_model()

def custom_pre_validate_check(google_user_info, request):
    """
    Called before user is validated. Returns True if valid, False otherwise.
    """
    email = google_user_info.get("email")
    if not email:
        return False

    # Check against whitelist
    if AllowedEmail.objects.filter(email__iexact=email).exists():
        return True
    
    # Add custom error message
    messages.warning(request, f"Not Authorized: The email '{email}' is not permitted to access this system.")
    return False

def custom_pre_login_check(user, request, **kwargs):
    """
    Called before logging in the user.
    """
    # Ensure the user has the necessary permissions to access the admin
    if not user.is_staff or not user.is_superuser:
        user.is_staff = True
        user.is_superuser = True
        user.save()

def custom_pre_create_check(user_info, request, **kwargs):
    """
    Called before creating the user.
    """
    email = user_info.get("email")
    
    # Return default fields to ensure creation doesn't fail on missing last_name
    # Also grant staff/superuser status so they can access the admin panel
    return {
        "first_name": user_info.get("given_name", ""),
        "last_name": user_info.get("family_name", ""),
        "username": email,
        "is_staff": True,
        "is_superuser": True,
    }
