from django.db import models
from django.utils.translation import gettext_lazy as _

class AllowedEmail(models.Model):
    email = models.EmailField(_("Email Address"), unique=True, help_text=_("The email address allowed to login via Google SSO."))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Allowed Email")
        verbose_name_plural = _("Allowed Emails")
        ordering = ["-created_at"]

    def __str__(self):
        return self.email
