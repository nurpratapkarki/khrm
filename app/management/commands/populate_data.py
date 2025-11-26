# app/management/commands/populate_data.py

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime, timedelta
import random
from app.models import *


class Command(BaseCommand):
    help = 'Populates the database with realistic sample data for KHRM'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting data population...'))
        
        # Clear existing data (optional - comment out if you want to keep existing data)
        self.stdout.write('Clearing existing data...')
        self.clear_data()
        
        # Create data
        self.stdout.write('Creating company info...')
        company_info = self.create_company_info()
        
        self.stdout.write('Creating offices...')
        offices = self.create_offices()
        
        self.stdout.write('Creating leadership...')
        leadership = self.create_leadership()
        
        self.stdout.write('Creating certifications...')
        certifications = self.create_certifications()
        
        self.stdout.write('Creating industries...')
        industries = self.create_industries()
        
        self.stdout.write('Creating clients...')
        clients = self.create_clients(industries)
        
        self.stdout.write('Creating testimonials...')
        testimonials = self.create_testimonials(clients)
        
        self.stdout.write('Creating job categories...')
        job_categories = self.create_job_categories(industries)
        
        self.stdout.write('Creating jobs...')
        jobs = self.create_jobs(industries, job_categories, clients)
        
        self.stdout.write('Creating job applications...')
        applications = self.create_job_applications(jobs)
        
        self.stdout.write('Creating employer inquiries...')
        inquiries = self.create_employer_inquiries(industries)
        
        self.stdout.write('Creating training courses...')
        courses = self.create_training_courses()
        
        self.stdout.write('Creating training facilities...')
        facilities = self.create_training_facilities()
        
        self.stdout.write('Creating media albums...')
        albums = self.create_media_albums()
        
        self.stdout.write('Creating news posts...')
        news = self.create_news_posts()
        
        self.stdout.write('Creating documents...')
        documents = self.create_documents()
        
        self.stdout.write('Creating FAQs...')
        faqs = self.create_faqs()
        
        self.stdout.write('Creating contact messages...')
        messages = self.create_contact_messages()
        
        self.stdout.write('Creating CSR projects...')
        csr = self.create_csr_projects()
        
        self.stdout.write(self.style.SUCCESS('✅ Data population completed successfully!'))
        self.print_summary()

    def clear_data(self):
        """Clear all existing data"""
        MediaPhoto.objects.all().delete()
        MediaAlbum.objects.all().delete()
        NewsPost.objects.all().delete()
        Document.objects.all().delete()
        FAQ.objects.all().delete()
        ContactMessage.objects.all().delete()
        CSRProject.objects.all().delete()
        JobApplication.objects.all().delete()
        Job.objects.all().delete()
        JobCategory.objects.all().delete()
        EmployerInquiry.objects.all().delete()
        Testimonial.objects.all().delete()
        Client.objects.all().delete()
        Industry.objects.all().delete()
        TrainingCourse.objects.all().delete()
        TrainingFacility.objects.all().delete()
        Certification.objects.all().delete()
        Leadership.objects.all().delete()
        Office.objects.all().delete()
        CompanyInfo.objects.all().delete()

    def create_company_info(self):
        company_info = CompanyInfo.objects.create(
            establishment_year=2003,
            license_number='GOV/NEPAL/2003/KHRM-001',
            total_deployments=25000,
            mission='To provide world-class manpower solutions and create employment opportunities for Nepalese workers globally.',
            vision='To be the most trusted international recruitment partner, recognized for excellence and ethical practices.',
            values='Integrity, Excellence, Transparency, Worker Welfare, Customer Satisfaction',
            about_text='KHRM (Kanchan Human Resource Management) has been a leading recruitment agency since 2003, specializing in manpower supply to the Middle East. With offices in Nepal, UAE, and Kuwait, we have successfully deployed over 25,000 workers across various industries.',
            hero_headline='Trusted International Recruitment Partner Since 2003',
            hero_subtext='Nepal • UAE • Kuwait'
        )
        return company_info

    def create_offices(self):
        offices = [
            Office.objects.create(
                name='KHRM Head Office',
                country='nepal',
                address='Putalisadak, Kathmandu',
                city='Kathmandu',
                phone='+977-1-4443210',
                email='info@khrm.com.np',
                whatsapp='+977-9851234567',
                latitude=27.7089603,
                longitude=85.3132735,
                is_headquarters=True,
                is_active=True,
                display_order=1
            ),
            Office.objects.create(
                name='KHRM UAE Branch',
                country='uae',
                address='Business Bay, Dubai',
                city='Dubai',
                phone='+971-4-1234567',
                email='dubai@khrm.com',
                whatsapp='+971-50-1234567',
                latitude=25.1871764,
                longitude=55.2676147,
                is_headquarters=False,
                is_active=True,
                display_order=2
            ),
            Office.objects.create(
                name='KHRM Kuwait Office',
                country='kuwait',
                address='Salmiya, Kuwait City',
                city='Kuwait City',
                phone='+965-2222-3333',
                email='kuwait@khrm.com',
                whatsapp='+965-9876-5432',
                latitude=29.3375859,
                longitude=48.0059262,
                is_headquarters=False,
                is_active=True,
                display_order=3
            ),
        ]
        return offices

    def create_leadership(self):
        leadership = [
            Leadership.objects.create(
                name='Ram Kumar Sharma',
                position='Managing Director',
                bio='With over 20 years of experience in international recruitment, Ram Kumar has led KHRM to become one of Nepal\'s most trusted manpower agencies.',
                email='ram.sharma@khrm.com.np',
                display_order=1,
                is_active=True
            ),
            Leadership.objects.create(
                name='Sita Devkota',
                position='Operations Director',
                bio='Sita oversees all recruitment operations and ensures smooth deployment processes for workers across all destinations.',
                email='sita.devkota@khrm.com.np',
                display_order=2,
                is_active=True
            ),
            Leadership.objects.create(
                name='Ahmed Al-Mansouri',
                position='UAE Branch Manager',
                bio='Ahmed manages our UAE operations and maintains strong relationships with clients across the Middle East.',
                email='ahmed@khrm.com',
                display_order=3,
                is_active=True
            ),
        ]
        return leadership

    def create_certifications(self):
        certifications = [
            Certification.objects.create(
                name='Government of Nepal License',
                issuing_authority='Ministry of Labour, Employment and Social Security',
                certificate_number='GOV-2003-001',
                issue_date=datetime(2003, 1, 15).date(),
                display_order=1
            ),
            Certification.objects.create(
                name='ISO 9001:2015 Certification',
                issuing_authority='International Organization for Standardization',
                certificate_number='ISO-9001-2020',
                issue_date=datetime(2020, 6, 1).date(),
                display_order=2
            ),
            Certification.objects.create(
                name='UAE Ministry Approval',
                issuing_authority='UAE Ministry of Human Resources',
                certificate_number='UAE-HR-2005-789',
                issue_date=datetime(2005, 3, 10).date(),
                display_order=3
            ),
        ]
        return certifications

    def create_industries(self):
        industries_data = [
            ('Construction', '🏗️', 'Building and infrastructure projects', True),
            ('Facility Management', '🏢', 'Property maintenance and management services', True),
            ('Hospitality', '🏨', 'Hotels, restaurants, and tourism services', True),
            ('Aviation', '✈️', 'Airport and airline support services', False),
            ('Security', '🛡️', 'Security guard and surveillance services', True),
            ('Logistics', '🚚', 'Warehousing and supply chain management', False),
            ('Retail', '🛒', 'Shopping malls and retail outlets', True),
            ('Engineering', '⚙️', 'Technical and engineering services', False),
            ('Healthcare', '🏥', 'Medical and healthcare support', False),
            ('Oil & Gas', '⛽', 'Petroleum industry support services', False),
        ]
        
        industries = []
        for idx, (name, icon, desc, featured) in enumerate(industries_data, 1):
            industry = Industry.objects.create(
                name=name,
                icon=icon,
                description=desc,
                overview=f'KHRM provides skilled professionals for the {name} industry with comprehensive screening and training.',
                is_featured=featured,
                display_order=idx
            )
            industries.append(industry)
        
        return industries

    def create_clients(self, industries):
        clients_data = [
            ('EMRILL Services LLC', 'UAE', True, 1),
            ('G4S Security Services', 'UAE', True, 2),
            ('Lulu Group International', 'UAE', True, 3),
            ('Tanzifco Cleaning Services', 'Kuwait', True, 4),
            ('Jumeirah Hotels & Resorts', 'UAE', False, 5),
            ('Al Mulla Group', 'Kuwait', False, 6),
            ('Carrefour Middle East', 'UAE', True, 7),
            ('Alghanim Industries', 'Kuwait', False, 8),
            ('Majid Al Futtaim', 'UAE', True, 9),
            ('Kuwait Airways', 'Kuwait', False, 10),
        ]
        
        clients = []
        for name, country, featured, order in clients_data:
            client = Client.objects.create(
                name=name,
                country=country,
                industry=random.choice(industries),
                is_featured=featured,
                display_order=order
            )
            clients.append(client)
        
        return clients

    def create_testimonials(self, clients):
        testimonials_data = [
            ('John Anderson', 'HR Manager', 'EMRILL Services LLC', 
             'KHRM has been our trusted partner for over 5 years. Their workers are well-trained and professional.', 5, True),
            ('Mohammed Al-Said', 'Operations Director', 'Tanzifco Cleaning Services',
             'Excellent service quality and timely deployment. Highly recommended for manpower requirements.', 5, True),
            ('Sarah Johnson', 'Facility Manager', 'Jumeirah Hotels',
             'The hospitality staff provided by KHRM are exceptional. Great attitude and work ethic.', 4, True),
            ('Abdullah Khan', 'Security Manager', 'G4S Security',
             'Professional and reliable workers. KHRM maintains high standards in recruitment.', 5, False),
            ('David Lee', 'Store Manager', 'Carrefour',
             'We have hired multiple batches from KHRM. Consistent quality and support.', 4, False),
        ]
        
        testimonials = []
        for person, position, company, text, rating, featured in testimonials_data:
            testimonial = Testimonial.objects.create(
                person_name=person,
                person_position=position,
                company_name=company,
                testimonial_text=text,
                rating=rating,
                is_featured=featured
            )
            testimonials.append(testimonial)
        
        return testimonials

    def create_job_categories(self, industries):
        categories_data = [
            ('Mason', 'skilled', industries[0]),
            ('Carpenter', 'skilled', industries[0]),
            ('Electrician', 'skilled', industries[0]),
            ('Plumber', 'skilled', industries[0]),
            ('Facility Supervisor', 'professional', industries[1]),
            ('Maintenance Technician', 'skilled', industries[1]),
            ('Housekeeping Staff', 'semi_skilled', industries[1]),
            ('Chef', 'skilled', industries[2]),
            ('Waiter/Waitress', 'semi_skilled', industries[2]),
            ('Room Attendant', 'semi_skilled', industries[2]),
            ('Security Guard', 'semi_skilled', industries[4]),
            ('Security Supervisor', 'professional', industries[4]),
            ('Sales Assistant', 'semi_skilled', industries[6]),
            ('Cashier', 'semi_skilled', industries[6]),
            ('Store Keeper', 'skilled', industries[5]),
            ('Forklift Operator', 'skilled', industries[5]),
        ]
        
        categories = []
        for name, skill, industry in categories_data:
            category = JobCategory.objects.create(
                name=name,
                skill_level=skill,
                industry=industry,
                description=f'Experienced {name} for {industry.name} sector'
            )
            categories.append(category)
        
        return categories

    def create_jobs(self, industries, categories, clients):
        jobs = []
        countries = ['UAE', 'Kuwait', 'Qatar', 'Saudi Arabia']
        
        for i in range(20):
            category = random.choice(categories)
            client = random.choice(clients)
            country = random.choice(countries)
            
            job = Job.objects.create(
                title=f'{category.name} - {country}',
                category=category,
                industry=category.industry,
                client=client if random.choice([True, False]) else None,
                country=country,
                location=f'{random.choice(["Dubai", "Abu Dhabi", "Sharjah"]) if country == "UAE" else "Kuwait City"}',
                description=f'We are looking for experienced {category.name} to join our team in {country}. This is an excellent opportunity for skilled professionals.',
                requirements=f'• Minimum 2 years experience\n• Relevant certifications\n• Good communication skills\n• Physical fitness',
                responsibilities=f'• Perform {category.name} duties\n• Follow safety protocols\n• Work as part of a team\n• Maintain quality standards',
                salary_range=f'${random.randint(400, 800)}-${random.randint(900, 1500)}/month',
                contract_duration=random.choice(['2 years', '3 years', '2-3 years']),
                vacancies=random.randint(5, 50),
                status='open',
                is_featured=random.choice([True, False, False]),  # 33% featured
                application_deadline=(timezone.now() + timedelta(days=random.randint(15, 60))).date()
            )
            jobs.append(job)
        
        return jobs

    def create_job_applications(self, jobs):
        applications = []
        first_names = ['Ram', 'Shyam', 'Hari', 'Krishna', 'Gopal', 'Bikash', 'Suresh', 'Rajesh', 'Dinesh', 'Prakash']
        last_names = ['Sharma', 'Thapa', 'Gurung', 'Tamang', 'Rai', 'Limbu', 'Magar', 'Shrestha', 'Karki', 'Adhikari']
        statuses = ['submitted', 'screening', 'interview', 'selected']
        
        for i in range(50):
            job = random.choice(jobs)
            application = JobApplication.objects.create(
                job=job,
                first_name=random.choice(first_names),
                last_name=random.choice(last_names),
                email=f'applicant{i}@example.com',
                phone=f'+977-98{random.randint(10000000, 99999999)}',
                date_of_birth=(datetime.now() - timedelta(days=random.randint(8000, 15000))).date(),
                nationality='Nepali',
                current_location='Kathmandu, Nepal',
                years_of_experience=random.randint(1, 10),
                previous_experience=f'Worked as {job.category.name} for {random.randint(2, 8)} years in various projects.',
                skills=f'{job.category.name}, Safety protocols, Team work',
                status=random.choice(statuses)
            )
            applications.append(application)
        
        return applications

    def create_employer_inquiries(self, industries):
        inquiries = []
        companies = ['ABC Construction LLC', 'XYZ Hospitality Group', 'Global Facilities Management', 
                     'Prime Security Services', 'Metro Retail Chain']
        statuses = ['new', 'processing', 'approved', 'completed']
        
        for i in range(15):
            inquiry = EmployerInquiry.objects.create(
                company_name=random.choice(companies),
                contact_person=f'Mr. {random.choice(["Ahmed", "Mohammed", "Khalid", "Abdullah"])}',
                email=f'hr{i}@company.com',
                phone=f'+971-{random.randint(10000000, 99999999)}',
                country=random.choice(['UAE', 'Kuwait', 'Qatar']),
                industry=random.choice(industries),
                required_positions='Electricians, Plumbers, Masons',
                number_of_workers=random.randint(10, 100),
                job_description='Looking for skilled workers for upcoming projects.',
                expected_start_date=(timezone.now() + timedelta(days=random.randint(30, 90))).date(),
                contract_duration='2 years',
                status=random.choice(statuses)
            )
            inquiries.append(inquiry)
        
        return inquiries

    def create_training_courses(self):
        courses_data = [
            ('English Language Training', 'language', '3 months', 'Basic to intermediate English communication skills'),
            ('Arabic Language Training', 'language', '2 months', 'Basic Arabic for workplace communication'),
            ('Housekeeping Skills', 'vocational', '1 month', 'Professional housekeeping and cleaning techniques'),
            ('Security Training', 'vocational', '2 weeks', 'Security guard training and protocols'),
            ('Food & Beverage Service', 'vocational', '1 month', 'Restaurant and hotel service training'),
            ('Electrical Works', 'technical', '2 months', 'Basic electrical installation and maintenance'),
            ('Plumbing Skills', 'technical', '1 month', 'Plumbing installation and repair'),
            ('AC Technician', 'technical', '6 weeks', 'Air conditioning maintenance and repair'),
            ('Welding Course', 'technical', '2 months', 'Arc and gas welding techniques'),
            ('Soft Skills Development', 'soft_skills', '2 weeks', 'Communication, teamwork, and workplace etiquette'),
        ]
        
        courses = []
        for idx, (name, type, duration, desc) in enumerate(courses_data, 1):
            course = TrainingCourse.objects.create(
                name=name,
                course_type=type,
                description=desc,
                duration=duration,
                syllabus=f'Week 1: Introduction\nWeek 2: Practical Training\nWeek 3: Assessment',
                certification_provided=True,
                is_active=True,
                display_order=idx
            )
            courses.append(course)
        
        return courses

    def create_training_facilities(self):
        facilities = [
            TrainingFacility.objects.create(
                name='Orientation Hall',
                description='Large hall for pre-departure orientation and group training sessions',
                capacity=100,
                display_order=1
            ),
            TrainingFacility.objects.create(
                name='Computer Lab',
                description='Equipped with computers for language and soft skills training',
                capacity=30,
                display_order=2
            ),
            TrainingFacility.objects.create(
                name='Technical Workshop',
                description='Workshop for electrical, plumbing, and welding practice',
                capacity=20,
                display_order=3
            ),
            TrainingFacility.objects.create(
                name='Housekeeping Training Room',
                description='Practical training area for housekeeping skills',
                capacity=25,
                display_order=4
            ),
        ]
        return facilities

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

    def create_news_posts(self):
        # Create a superuser for author if doesn't exist
        author, _ = User.objects.get_or_create(
            username='admin',
            defaults={'email': 'admin@khrm.com', 'is_staff': True, 'is_superuser': True}
        )
        
        news_data = [
            ('100 Workers Successfully Deployed to UAE', 'deployment', 
             'KHRM successfully deployed 100 construction workers to leading UAE companies this month.'),
            ('New Training Facility Opened', 'announcement',
             'We are pleased to announce the opening of our new state-of-the-art training facility.'),
            ('Partnership with Leading Hospitality Group', 'news',
             'KHRM signs MoU with major hotel chain for regular manpower supply.'),
            ('Pre-Departure Orientation Completed', 'event',
             'Successfully conducted pre-departure orientation for 50 workers heading to Kuwait.'),
            ('ISO Certification Renewed', 'announcement',
             'KHRM has successfully renewed its ISO 9001:2015 certification for another 3 years.'),
        ]
        
        news = []
        for title, type, summary in news_data:
            post = NewsPost.objects.create(
                title=title,
                post_type=type,
                summary=summary,
                content=f'{summary}\n\nFull details about {title}. This is a major milestone for KHRM and demonstrates our commitment to excellence in international recruitment.',
                author=author,
                is_published=True,
                is_featured=random.choice([True, False]),
                published_date=timezone.now() - timedelta(days=random.randint(1, 90))
            )
            news.append(post)
        
        return news

    def create_documents(self):
        documents_data = [
            ('Employer Demand Letter Format', 'demand_letter', 'Template for employer demand letter'),
            ('Worker Screening Form', 'candidate_form', 'Form for initial worker screening'),
            ('Power of Attorney Template', 'power_of_attorney', 'POA template for employers'),
            ('Medical Examination Checklist', 'medical_checklist', 'Required medical tests checklist'),
            ('Vacancy Specification Form', 'employer_form', 'Detailed job specification form'),
            ('Employment Contract Sample', 'policy', 'Sample employment contract'),
        ]
        
        documents = []
        for idx, (title, type, desc) in enumerate(documents_data, 1):
            doc = Document.objects.create(
                title=title,
                document_type=type,
                description=desc,
                file_size='250 KB',
                is_active=True,
                display_order=idx
            )
            documents.append(doc)
        
        return documents

    def create_faqs(self):
        faqs_data = [
            ('general', 'What services does KHRM provide?', 
             'KHRM provides international recruitment services, worker training, documentation support, and post-deployment assistance.'),
            ('job_seekers', 'How can I apply for jobs?', 
             'You can apply through our website, visit our office, or call us. We will screen your profile and match you with suitable opportunities.'),
            ('job_seekers', 'Is there any fee for workers?', 
             'All service fees are covered by employers as per Nepal government regulations. Workers only pay for their visa and tickets.'),
            ('employers', 'How long does the recruitment process take?', 
             'Typically 4-8 weeks from demand letter to deployment, depending on visa processing time.'),
            ('employers', 'Do you provide replacement workers?', 
             'Yes, we provide free replacement within the first 3 months if a worker is found unsuitable.'),
            ('training', 'What training do you provide?', 
             'We offer language training (English/Arabic), technical skills, housekeeping, security, and soft skills training.'),
            ('visa', 'What documents are required?', 
             'Passport, photos, educational certificates, experience letters, and medical reports are the main requirements.'),
        ]
        
        faqs = []
        for idx, (category, question, answer) in enumerate(faqs_data, 1):
            faq = FAQ.objects.create(
                category=category,
                question=question,
                answer=answer,
                display_order=idx,
                is_active=True
            )
            faqs.append(faq)
        
        return faqs

    def create_contact_messages(self):
        messages = []
        for i in range(10):
            message = ContactMessage.objects.create(
                name=f'Inquiry Person {i+1}',
                email=f'inquiry{i+1}@example.com',
                phone=f'+977-98{random.randint(10000000, 99999999)}',
                company=random.choice(['ABC Company', 'XYZ Corp', '', '']),
                inquiry_type=random.choice(['general', 'employer', 'job_seeker', 'training']),
                message=f'This is a sample inquiry message {i+1}. Please provide more information about your services.',
                is_read=random.choice([True, False]),
                replied=random.choice([True, False, False])
            )
            messages.append(message)
        
        return messages

    def create_csr_projects(self):
        projects = [
            CSRProject.objects.create(
                title='Scholarship Program for Underprivileged Students',
                description='Annual scholarship program providing education support to 50 students from rural Nepal.',
                impact_statement='Supported 500+ students since 2010, with 80% completing their education successfully.',
                date=datetime(2023, 6, 15).date(),
                location='Various districts of Nepal',
                is_active=True
            ),
            CSRProject.objects.create(
                title='Skill Development for Returnee Migrants',
                description='Free training program for returnee migrant workers to help them find employment in Nepal.',
                impact_statement='Trained 200+ returnee workers in various skills including agriculture, small business, and trades.',
                date=datetime(2023, 9, 1).date(),
                location='Kathmandu, Nepal',
                is_active=True
            ),
        ]
        return projects

    def print_summary(self):
        """Print summary of created data"""
        self.stdout.write(self.style.SUCCESS('\n📊 Data Summary:'))
        self.stdout.write(f'  • Company Info: {CompanyInfo.objects.count()}')
        self.stdout.write(f'  • Offices: {Office.objects.count()}')
        self.stdout.write(f'  • Leadership: {Leadership.objects.count()}')
        self.stdout.write(f'  • Certifications: {Certification.objects.count()}')
        self.stdout.write(f'  • Industries: {Industry.objects.count()}')
        self.stdout.write(f'  • Clients: {Client.objects.count()}')
        self.stdout.write(f'  • Testimonials: {Testimonial.objects.count()}')
        self.stdout.write(f'  • Job Categories: {JobCategory.objects.count()}')
        self.stdout.write(f'  • Jobs: {Job.objects.count()}')
        self.stdout.write(f'  • Applications: {JobApplication.objects.count()}')
        self.stdout.write(f'  • Employer Inquiries: {EmployerInquiry.objects.count()}')
        self.stdout.write(f'  • Training Courses: {TrainingCourse.objects.count()}')
        self.stdout.write(f'  • Training Facilities: {TrainingFacility.objects.count()}')
        self.stdout.write(f'  • Media Albums: {MediaAlbum.objects.count()}')
        self.stdout.write(f'  • Photos: {MediaPhoto.objects.count()}')
        self.stdout.write(f'  • News Posts: {NewsPost.objects.count()}')
        self.stdout.write(f'  • Documents: {Document.objects.count()}')
        self.stdout.write(f'  • FAQs: {FAQ.objects.count()}')
        self.stdout.write(f'  • Contact Messages: {ContactMessage.objects.count()}')
        self.stdout.write(f'  • CSR Projects: {CSRProject.objects.count()}')
        self.stdout.write(self.style.SUCCESS('\n✅ Database is ready for testing!'))