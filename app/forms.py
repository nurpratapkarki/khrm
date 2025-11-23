
from django import forms
from .models import JobApplication, EmployerInquiry, ContactMessage


class JobApplicationForm(forms.ModelForm):
    """Form for job applications"""
    class Meta:
        model = JobApplication
        exclude = ['job', 'status', 'notes', 'created_at', 'updated_at']
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
            'previous_experience': forms.Textarea(attrs={'rows': 4}),
            'skills': forms.Textarea(attrs={'rows': 3}),
        }


class EmployerInquiryForm(forms.ModelForm):
    """Form for employer manpower requests"""
    class Meta:
        model = EmployerInquiry
        exclude = ['status', 'notes', 'created_at', 'updated_at']
        widgets = {
            'expected_start_date': forms.DateInput(attrs={'type': 'date'}),
            'required_positions': forms.Textarea(attrs={'rows': 4}),
            'job_description': forms.Textarea(attrs={'rows': 5}),
        }


class ContactMessageForm(forms.ModelForm):
    """Form for contact messages"""
    class Meta:
        model = ContactMessage
        exclude = ['is_read', 'replied', 'notes', 'created_at']
        widgets = {
            'message': forms.Textarea(attrs={'rows': 5}),
        }
