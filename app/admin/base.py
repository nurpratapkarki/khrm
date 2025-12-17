from django.contrib.admin import AdminSite
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import GroupAdmin

class KHRMAdminSite(AdminSite):
    site_header = "KHRM Admin"
    site_title = "KHRM Admin Portal"
    index_title = "Welcome to KHRM Administration"
    
    def get_app_list(self, request, app_label=None):
        """
        Organize models into logical functional groups.
        """
        app_list = super().get_app_list(request, app_label)
        
        # Organization models
        organization_models = [
            ("Company", "Company Profile", 1),
            ("Office", "Offices", 2),
            ("Branch", "Branches", 3),
            ("Leadership", "Leadership Team", 4),
            ("Certification", "Certifications", 5),
        ]
        
        # Recruitment models
        recruitment_models = [
            ("Job", "Job Postings", 1),
            ("JobApplication", "Applications", 2),
            ("EmployerInquiry", "Employer Requests", 3),
            ("JobCategory", "Job Categories", 4),
        ]
        
        # Japan Program models
        japan_program_models = [
            ("JapanLandingPage", "Landing Page Settings", 1),
            ("JapanProgram", "Training Programs", 2),
            ("JapanProgramType", "Program Types", 3),
            ("JapanTeamMember", "Team Members", 4),
            ("JapanBulletPoint", "Page Sections", 5),
        ]
        
        # Training models
        training_models = [
            ("TrainingCourse", "Courses", 1),
            ("TrainingFacility", "Facilities", 2),
        ]
        
        # Content & Media models
        content_media_models = [
            ("NewsPost", "News & Updates", 1),
            ("MediaAlbum", "Photo Albums", 2),
            ("CSRProject", "CSR Projects", 3),
            ("Document", "Documents", 4),
            ("Career", "Internal Careers", 5),
        ]
        
        # Partners models
        partners_models = [
            ("Industry", "Industries", 1),
            ("Client", "Clients", 2),
            ("Testimonial", "Testimonials", 3),
        ]
        
        # Site Configuration models
        site_config_models = [
            ("ContactMessage", "Inquiries", 1),
            ("FAQ", "FAQs", 2),
            ("FAQCategory", "FAQ Categories", 3),
            ("PrivacyPolicy", "Privacy Policy", 4),
            ("TermsOfService", "Terms of Service", 5),
        ]
        
        # System models (built-in)
        system_models = [
            ("User", "Users", 1),
            ("Group", "Groups", 2),
            ("AllowedEmail", "Google SSO Whitelist", 3),
        ]
        
        # Build model_map from categorized lists
        model_map = {}
        
        for model_name, label, order in organization_models:
            model_map[model_name] = {"group": "Organization", "label": label, "order": order}
        
        for model_name, label, order in recruitment_models:
            model_map[model_name] = {"group": "Recruitment", "label": label, "order": order}
        
        for model_name, label, order in japan_program_models:
            model_map[model_name] = {"group": "Japan Program", "label": label, "order": order}
        
        for model_name, label, order in training_models:
            model_map[model_name] = {"group": "Training", "label": label, "order": order}
        
        for model_name, label, order in content_media_models:
            model_map[model_name] = {"group": "Content & Media", "label": label, "order": order}
        
        for model_name, label, order in partners_models:
            model_map[model_name] = {"group": "Partners", "label": label, "order": order}
        
        for model_name, label, order in site_config_models:
            model_map[model_name] = {"group": "Site Configuration", "label": label, "order": order}
        
        for model_name, label, order in system_models:
            model_map[model_name] = {"group": "System", "label": label, "order": order}
        
        # Group models
        grouped_models = {}
        
        for app in app_list:
            for model in app["models"]:
                model_name = model["object_name"]
                
                # Check mapping
                if model_name in model_map:
                    config = model_map[model_name]
                    group = config["group"]
                    
                    if group not in grouped_models:
                        grouped_models[group] = {
                            "name": group,
                            "app_label": group.lower().replace(" ", "_").replace("&", "and"),
                            "models": []
                        }
                    
                    # Update model display
                    model["name"] = config["label"]
                    model["_order"] = config["order"]
                    grouped_models[group]["models"].append(model)
                else:
                    # Fallback for unmapped models
                    group = "Other"
                    if group not in grouped_models:
                        grouped_models[group] = {
                            "name": "Other",
                            "app_label": "other",
                            "models": []
                        }
                    model["_order"] = 99
                    grouped_models[group]["models"].append(model)
        
        # Sort models within groups
        for group in grouped_models.values():
            group["models"].sort(key=lambda x: x.get("_order", 999))
            
        # Define group order
        group_order = [
            "Organization",
            "Recruitment",
            "Japan Program",
            "Training",
            "Content & Media",
            "Partners",
            "Site Configuration",
            "System",
            "Other"
        ]
        
        # Return sorted groups
        return [grouped_models[g] for g in group_order if g in grouped_models]

# Instantiate the custom site
admin_site = KHRMAdminSite(name="khrm_admin")

# Register system models explicitly since we are replacing the default site
admin_site.register(User, UserAdmin)
admin_site.register(Group, GroupAdmin)
