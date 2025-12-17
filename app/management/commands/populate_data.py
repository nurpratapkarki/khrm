import random
from datetime import timedelta

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils import timezone

from app.models import *


class Command(BaseCommand):
    help = "Populates the database with realistic sample data for KHRM"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS("Starting data population..."))

        # Create data

        # self.stdout.write("Creating industries...")
        # industries = self.create_industries()

        # self.stdout.write("Creating clients...")
        # clients = self.create_clients(industries)

        # self.stdout.write("Creating job categories...")
        # job_categories = self.create_job_categories(industries)

        # self.stdout.write("Creating jobs...")
        # jobs = self.create_jobs(industries, job_categories, clients)

        # self.stdout.write("Create Training content.......")
        # courses = self.create_training_courses()

        # self.stdout.write("Creating training facilities...")
        # facilities = self.create_training_facilities()

        self.stdout.write("Creating documents...")
        documents = self.create_documents()

        self.stdout.write("News...")
        news = self.create_news_posts()

        self.stdout.write("Media Albums...")
        albums = self.create_media_albums()

        self.stdout.write(
            self.style.SUCCESS("✅ Data population completed successfully!")
        )
        self.print_summary()

    def create_media_albums(self):
        albums_data = [
            ('Office Premises - 2024', 'office', 'Our modern office facilities in Kathmandu'),
            ('Training Sessions - January 2024', 'training', 'Recent batch undergoing pre-departure training'),
            ('Client Visit - EMRILL', 'client_visits', 'EMRILL management visiting our office'),
            ('Interview Day - Construction Workers', 'interviews', 'Interview conducted for UAE construction project'),
            ('Pre-departure Orientation', 'orientation', 'Workers orientation before deployment'),
            ('Annual Event 2023', 'events', 'Company annual gathering and award ceremony'),
        ]
        
        albums = []
        for title, type, desc in albums_data:
            album = MediaAlbum.objects.create(
                title=title,
                album_type=type,
                description=desc,
                date=(timezone.now() - timedelta(days=random.randint(1, 365))).date()
            )
            albums.append(album)
            
            # Create 5 photos per album
            for i in range(5):
                MediaPhoto.objects.create(
                    album=album,
                    caption=f'Photo {i+1} from {title}',
                    display_order=i+1
                )
        
        return albums


    def create_industries(self):
        industries_data = [
            ("Construction", "🏗️", "Building and infrastructure projects", True),
            (
                "Facility Management",
                "🏢",
                "Property maintenance and management services",
                True,
            ),
            ("Hospitality", "🏨", "Hotels, restaurants, and tourism services", True),
            ("Aviation", "✈️", "Airport and airline support services", False),
            ("Security", "🛡️", "Security guard and surveillance services", True),
            ("Logistics", "🚚", "Warehousing and supply chain management", False),
            ("Retail", "🛒", "Shopping malls and retail outlets", True),
            ("Engineering", "⚙️", "Technical and engineering services", False),
            ("Healthcare", "🏥", "Medical and healthcare support", False),
            ("Oil & Gas", "⛽", "Petroleum industry support services", False),
        ]

        industries = []
        for idx, (name, icon, desc, featured) in enumerate(industries_data, 1):
            industry, created = Industry.objects.get_or_create(
                name=name,
                defaults={
                    "icon": icon,
                    "description": desc,
                    "overview": f"KHRM provides skilled professionals for the {name} industry with comprehensive screening and training.",
                    "is_featured": featured,
                    "display_order": idx,
                }
            )
            if not created:
                # Update existing industry
                industry.icon = icon
                industry.description = desc
                industry.overview = f"KHRM provides skilled professionals for the {name} industry with comprehensive screening and training."
                industry.is_featured = featured
                industry.display_order = idx
                industry.save()
            industries.append(industry)

        return industries

    def create_clients(self, industries):
        clients_data = [
            ("EMRILL Services LLC", "UAE", True, 1),
            ("G4S Security Services", "UAE", True, 2),
            ("Lulu Group International", "UAE", True, 3),
            ("Tanzifco Cleaning Services", "Kuwait", True, 4),
            ("Jumeirah Hotels & Resorts", "UAE", False, 5),
            ("Al Mulla Group", "Kuwait", False, 6),
            ("Carrefour Middle East", "UAE", True, 7),
            ("Alghanim Industries", "Kuwait", False, 8),
            ("Majid Al Futtaim", "UAE", True, 9),
            ("Kuwait Airways", "Kuwait", False, 10),
        ]

        clients = []
        for name, country, featured, order in clients_data:
            client, created = Client.objects.get_or_create(
                name=name,
                defaults={
                    "country": country,
                    "industry": random.choice(industries),
                    "is_featured": featured,
                    "display_order": order,
                }
            )
            if not created:
                client.country = country
                client.industry = random.choice(industries)
                client.is_featured = featured
                client.display_order = order
                client.save()
            clients.append(client)

        return clients

    def create_job_categories(self, industries):
        categories_data = [
            ("Mason", "skilled", industries[0]),
            ("Carpenter", "skilled", industries[0]),
            ("Electrician", "skilled", industries[0]),
            ("Plumber", "skilled", industries[0]),
            ("Facility Supervisor", "professional", industries[1]),
            ("Maintenance Technician", "skilled", industries[1]),
            ("Housekeeping Staff", "semi_skilled", industries[1]),
            ("Chef", "skilled", industries[2]),
            ("Waiter/Waitress", "semi_skilled", industries[2]),
            ("Room Attendant", "semi_skilled", industries[2]),
            ("Security Guard", "semi_skilled", industries[4]),
            ("Security Supervisor", "professional", industries[4]),
            ("Sales Assistant", "semi_skilled", industries[6]),
            ("Cashier", "semi_skilled", industries[6]),
            ("Store Keeper", "skilled", industries[5]),
            ("Forklift Operator", "skilled", industries[5]),
        ]

        categories = []
        for name, skill, industry in categories_data:
            category, created = JobCategory.objects.get_or_create(
                name=name,
                defaults={
                    "skill_level": skill,
                    "industry": industry,
                    "description": f"Experienced {name} for {industry.name} sector",
                }
            )
            if not created:
                category.skill_level = skill
                category.industry = industry
                category.description = f"Experienced {name} for {industry.name} sector"
                category.save()
            categories.append(category)

        return categories

    def create_jobs(self, industries, categories, clients):
        jobs = []
        countries = ["UAE", "Kuwait", "Qatar", "Saudi Arabia"]

        for i in range(20):
            category = random.choice(categories)
            client = random.choice(clients)
            country = random.choice(countries)

            job = Job.objects.create(
                title=f"{category.name} - {country}",
                category=category,
                industry=category.industry,
                client=client if random.choice([True, False]) else None,
                country=country,
                location=f"{random.choice(['Dubai', 'Abu Dhabi', 'Sharjah']) if country == 'UAE' else 'Kuwait City'}",
                description=f"We are looking for experienced {category.name} to join our team in {country}. This is an excellent opportunity for skilled professionals.",
                requirements="• Minimum 2 years experience\n• Relevant certifications\n• Good communication skills\n• Physical fitness",
                responsibilities=f"• Perform {category.name} duties\n• Follow safety protocols\n• Work as part of a team\n• Maintain quality standards",
                salary_range=f"${random.randint(400, 800)}-${random.randint(900, 1500)}/month",
                contract_duration=random.choice(["2 years", "3 years", "2-3 years"]),
                vacancies=random.randint(5, 50),
                status="open",
                is_featured=random.choice([True, False, False]),  # 33% featured
                application_deadline=(
                    timezone.now() + timedelta(days=random.randint(15, 60))
                ).date(),
            )
            jobs.append(job)

        return jobs

    def create_training_facilities(self):
        facilities_data = [
            ("Orientation Hall", "Large hall for pre-departure orientation and group training sessions", 100, 1),
            ("Computer Lab", "Equipped with computers for language and soft skills training", 30, 2),
            ("Technical Workshop", "Workshop for electrical, plumbing, and welding practice", 20, 3),
            ("Housekeeping Training Room", "Practical training area for housekeeping skills", 25, 4),
        ]
        
        facilities = []
        for name, desc, capacity, order in facilities_data:
            facility, created = TrainingFacility.objects.get_or_create(
                name=name,
                defaults={
                    "description": desc,
                    "capacity": capacity,
                    "display_order": order,
                }
            )
            if not created:
                facility.description = desc
                facility.capacity = capacity
                facility.display_order = order
                facility.save()
            facilities.append(facility)
        
        return facilities

    def create_training_courses(self):
        courses_data = [
            (
                "English Language Training",
                "language",
                "3 months",
                "Basic to intermediate English communication skills",
            ),
            (
                "Arabic Language Training",
                "language",
                "2 months",
                "Basic Arabic for workplace communication",
            ),
            (
                "Housekeeping Skills",
                "vocational",
                "1 month",
                "Professional housekeeping and cleaning techniques",
            ),
            (
                "Security Training",
                "vocational",
                "2 weeks",
                "Security guard training and protocols",
            ),
            (
                "Food & Beverage Service",
                "vocational",
                "1 month",
                "Restaurant and hotel service training",
            ),
            (
                "Electrical Works",
                "technical",
                "2 months",
                "Basic electrical installation and maintenance",
            ),
            (
                "Plumbing Skills",
                "technical",
                "1 month",
                "Plumbing installation and repair",
            ),
            (
                "AC Technician",
                "technical",
                "6 weeks",
                "Air conditioning maintenance and repair",
            ),
            (
                "Welding Course",
                "technical",
                "2 months",
                "Arc and gas welding techniques",
            ),
            (
                "Soft Skills Development",
                "soft_skills",
                "2 weeks",
                "Communication, teamwork, and workplace etiquette",
            ),
        ]

        courses = []
        for idx, (name, type, duration, desc) in enumerate(courses_data, 1):
            course, created = TrainingCourse.objects.get_or_create(
                name=name,
                defaults={
                    "course_type": type,
                    "description": desc,
                    "duration": duration,
                    "syllabus": "Week 1: Introduction\nWeek 2: Practical Training\nWeek 3: Assessment",
                    "certification_provided": True,
                    "is_active": True,
                    "display_order": idx,
                }
            )
            if not created:
                course.course_type = type
                course.description = desc
                course.duration = duration
                course.syllabus = "Week 1: Introduction\nWeek 2: Practical Training\nWeek 3: Assessment"
                course.certification_provided = True
                course.is_active = True
                course.display_order = idx
                course.save()
            courses.append(course)

        return courses

    def create_media_albums(self):
        albums_data = [
            (
                "Office Premises - 2024",
                "office",
                "Our modern office facilities in Kathmandu",
            ),
            (
                "Training Sessions - January 2024",
                "training",
                "Recent batch undergoing pre-departure training",
            ),
            (
                "Client Visit - EMRILL",
                "client_visits",
                "EMRILL management visiting our office",
            ),
            (
                "Interview Day - Construction Workers",
                "interviews",
                "Interview conducted for UAE construction project",
            ),
            (
                "Pre-departure Orientation",
                "orientation",
                "Workers orientation before deployment",
            ),
            (
                "Annual Event 2023",
                "events",
                "Company annual gathering and award ceremony",
            ),
        ]

        albums = []
        for title, type, desc in albums_data:
            album = MediaAlbum.objects.create(
                title=title,
                album_type=type,
                description=desc,
                date=(timezone.now() - timedelta(days=random.randint(1, 365))).date(),
            )
            albums.append(album)

            # Create 5 photos per album
            for i in range(5):
                MediaPhoto.objects.create(
                    album=album,
                    caption=f"Photo {i + 1} from {title}",
                    display_order=i + 1,
                )

        return albums

    def create_news_posts(self):
        # Create a superuser for author if doesn't exist
        author, _ = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@khrm.com",
                "is_staff": True,
                "is_superuser": True,
            },
        )

        news_data = [
            (
                "100 Workers Successfully Deployed to UAE",
                "deployment",
                "KHRM successfully deployed 100 construction workers to leading UAE companies this month.",
            ),
            (
                "New Training Facility Opened",
                "announcement",
                "We are pleased to announce the opening of our new state-of-the-art training facility.",
            ),
            (
                "Partnership with Leading Hospitality Group",
                "news",
                "KHRM signs MoU with major hotel chain for regular manpower supply.",
            ),
            (
                "Pre-Departure Orientation Completed",
                "event",
                "Successfully conducted pre-departure orientation for 50 workers heading to Kuwait.",
            ),
            (
                "ISO Certification Renewed",
                "announcement",
                "KHRM has successfully renewed its ISO 9001:2015 certification for another 3 years.",
            ),
        ]

        news = []
        for title, type, summary in news_data:
            post = NewsPost.objects.create(
                title=title,
                post_type=type,
                summary=summary,
                content=f"{summary}\n\nFull details about {title}. This is a major milestone for KHRM and demonstrates our commitment to excellence in international recruitment.",
                author=author,
                is_published=True,
                is_featured=random.choice([True, False]),
                published_date=timezone.now() - timedelta(days=random.randint(1, 90)),
            )
            news.append(post)

        return news

    def create_jobs(self, industries, categories, clients):
        jobs = []
        countries = ["UAE", "Kuwait", "Qatar", "Saudi Arabia"]

        for i in range(20):
            category = random.choice(categories)
            client = random.choice(clients)
            country = random.choice(countries)

            job = Job.objects.create(
                title=f"{category.name} - {country}",
                category=category,
                industry=category.industry,
                client=client if random.choice([True, False]) else None,
                country=country,
                location=f"{random.choice(['Dubai', 'Abu Dhabi', 'Sharjah']) if country == 'UAE' else 'Kuwait City'}",
                description=f"We are looking for experienced {category.name} to join our team in {country}. This is an excellent opportunity for skilled professionals.",
                requirements="• Minimum 2 years experience\n• Relevant certifications\n• Good communication skills\n• Physical fitness",
                responsibilities=f"• Perform {category.name} duties\n• Follow safety protocols\n• Work as part of a team\n• Maintain quality standards",
                salary_range=f"${random.randint(400, 800)}-${random.randint(900, 1500)}/month",
                contract_duration=random.choice(["2 years", "3 years", "2-3 years"]),
                vacancies=random.randint(5, 50),
                status="open",
                is_featured=random.choice([True, False, False]),  # 33% featured
                application_deadline=(
                    timezone.now() + timedelta(days=random.randint(15, 60))
                ).date(),
            )
            jobs.append(job)

        return jobs

    def create_documents(self):
        documents_data = [
            (
                "Employer Demand Letter Format",
                "demand_letter",
                "Template for employer demand letter",
            ),
            (
                "Worker Screening Form",
                "candidate_form",
                "Form for initial worker screening",
            ),
            (
                "Power of Attorney Template",
                "power_of_attorney",
                "POA template for employers",
            ),
            (
                "Medical Examination Checklist",
                "medical_checklist",
                "Required medical tests checklist",
            ),
            (
                "Vacancy Specification Form",
                "employer_form",
                "Detailed job specification form",
            ),
            ("Employment Contract Sample", "policy", "Sample employment contract"),
        ]

        documents = []
        for idx, (title, type, desc) in enumerate(documents_data, 1):
            doc = Document.objects.create(
                title=title,
                document_type=type,
                description=desc,
                file_size="250 KB",
                is_active=True,
                display_order=idx,
            )
            documents.append(doc)

        return documents

    def print_summary(self):
        """Print summary of created data"""
        self.stdout.write(self.style.SUCCESS("\n📊 Data Summary:"))
        self.stdout.write(f"  • Industries: {Industry.objects.count()}")
        self.stdout.write(f"  • Clients: {Client.objects.count()}")
        self.stdout.write(f"  • Job Categories: {JobCategory.objects.count()}")
        self.stdout.write(f"  • Jobs: {Job.objects.count()}")
        self.stdout.write(f"  • Training Courses: {TrainingCourse.objects.count()}")
        self.stdout.write(
            f"  • Training Facilities: {TrainingFacility.objects.count()}"
        )
        self.stdout.write(f"  • Media Albums: {MediaAlbum.objects.count()}")
        self.stdout.write(f"  • Photos: {MediaPhoto.objects.count()}")
        self.stdout.write(f"  • News Posts: {NewsPost.objects.count()}")
        self.stdout.write(f"  • Documents: {Document.objects.count()}")
        self.stdout.write(f"  • Careers: {Career.objects.count()}")
        self.stdout.write(self.style.SUCCESS("\n✅ Database is ready for testing!"))
