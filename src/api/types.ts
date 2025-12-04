// ==================== types.ts ====================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: any;
  };
}

// ==================== COMPANY TYPES ====================

export interface Office {
  id: number;
  name: string;
  country: 'nepal' | 'uae' | 'kuwait';
  address: string;
  city: string;
  phone: string;
  email: string;
  whatsapp?: string;
  latitude?: string;
  longitude?: string;
  is_headquarters: boolean;
  office_image?: string;
  is_active: boolean;
  display_order: number;
}

export interface CompanyInfo {
  id: number;
  establishment_year: number;
  license_number: string;
  total_deployments: number;
  mission: string;
  vision: string;
  values: string;
  about_text: string;
  about_image?: string;
  logo?: string;
  mission_image?: string;
  vision_image?: string;
  values_image?: string;
  about_background_image?: string;
  hero_image?: string;
  hero_headline: string;
  hero_subtext: string;
}

export interface Leadership {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string;
  email?: string;
  linkedin?: string;
  display_order: number;
  is_active: boolean;
}

export interface Certification {
  id: number;
  name: string;
  issuing_authority: string;
  certificate_number?: string;
  issue_date?: string;
  expiry_date?: string;
  certificate_image: string;
  display_order: number;
}

// ==================== INDUSTRY & CLIENT TYPES ====================

export interface Industry {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  overview?: string;
  image?: string;
  display_order: number;
  is_featured: boolean;
  job_count?: number;
  client_count?: number;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
  website?: string;
  industry?: number;
  industry_name?: string;
  country: string;
  is_featured: boolean;
  display_order: number;
}

export interface Testimonial {
  id: number;
  client?: number;
  client_name?: string;
  person_name: string;
  person_position: string;
  person_photo?: string;
  company_name?: string;
  testimonial_text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  is_featured: boolean;
  created_at: string;
}

// ==================== JOB TYPES ====================

export interface JobCategory {
  id: number;
  name: string;
  skill_level: 'skilled' | 'semi_skilled' | 'professional' | 'unskilled';
  skill_level_display: string;
  industry: number;
  industry_name: string;
  description?: string;
}

export interface Job {
  id: number;
  title: string;
  slug: string;
  category: number | JobCategory;
  category_name?: string;
  industry: number | Industry;
  industry_name?: string;
  client?: number | Client;
  client_name?: string;
  country: string;
  location: string;
  description: string;
  requirements: string;
  responsibilities?: string;
  salary_range?: string;
  contract_duration?: string;
  vacancies: number;
  status: 'open' | 'closed' | 'filled' | 'on_hold';
  status_display?: string;
  is_featured: boolean;
  application_deadline?: string;
  application_count?: number;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id?: number;
  job: number;
  job_title?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  current_location: string;
  resume: File; 
  passport_copy?: File; // Optional
  photo?: File; // Optional
  years_of_experience: number;
  previous_experience?: string;
  skills?: string;
  status?: 'submitted' | 'screening' | 'interview' | 'medical' | 'selected' | 'rejected' | 'deployed';
  status_display?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EmployerInquiry {
  id?: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country: string;
  industry?: number;
  industry_name?: string;
  required_positions: string;
  number_of_workers: number;
  job_description?: string;
  expected_start_date?: string;
  contract_duration?: string;
  demand_letter?: File ;
  additional_documents?: File ;
  status?: 'new' | 'processing' | 'quotation_sent' | 'approved' | 'completed' | 'cancelled';
  status_display?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

// ==================== TRAINING TYPES ====================

export interface TrainingCourse {
  id: number;
  name: string;
  slug: string;
  course_type: 'language' | 'vocational' | 'technical' | 'soft_skills';
  course_type_display: string;
  description: string;
  duration: string;
  course_image?: string;
  syllabus?: string;
  prerequisites?: string;
  certification_provided: boolean;
  is_active: boolean;
  display_order: number;
}

export interface TrainingFacility {
  id: number;
  name: string;
  description: string;
  capacity: number;
  image: string;
  display_order: number;
}

// ==================== MEDIA TYPES ====================

export interface MediaPhoto {
  id: number;
  album: number;
  image: string;
  caption?: string;
  display_order: number;
  uploaded_at: string;
}

export interface MediaAlbum {
  id: number;
  title: string;
  slug: string;
  album_type: 'office' | 'training' | 'interviews' | 'orientation' | 'client_visits' | 'events';
  album_type_display: string;
  description?: string;
  cover_image: string;
  date: string;
  display_order: number;
  photo_count?: number;
  photos?: MediaPhoto[];
}

export interface NewsPost {
  id: number;
  title: string;
  slug: string;
  post_type: 'news' | 'deployment' | 'event' | 'announcement';
  post_type_display: string;
  featured_image: string;
  summary: string;
  content?: string;
  author_name?: string;
  is_published: boolean;
  is_featured: boolean;
  published_date?: string;
  created_at: string;
  updated_at?: string;
}

// ==================== DOCUMENT & CONTACT TYPES ====================

export interface PrivacyPolicy {
  id: number;
  title: string;
  slug: string;
  content: string;
  last_updated: string;
  is_active: boolean;
}

export interface TermsOfService {
  id: number;
  title: string;
  slug: string;
  content: string;
  last_updated: string;
  is_active: boolean;
}

export interface Document {
  id: number;
  title: string;
  document_type:
    | 'employer_form'
    | 'candidate_form'
    | 'demand_letter'
    | 'power_of_attorney'
    | 'medical_checklist'
    | 'policy'
    | 'other';
  document_type_display: string;
  description?: string;
  file: string;
  file_size?: string;
  download_count: number;
  is_active: boolean;
  display_order: number;
  uploaded_at: string;
}

export interface FAQ {
  id: number;
  category: 'general' | 'job_seekers' | 'employers' | 'training' | 'visa';
  category_display: string;
  question: string;
  answer: string;
  display_order: number;
  is_active: boolean;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  inquiry_type: 'general' | 'employer' | 'job_seeker' | 'training' | 'complaint';
  inquiry_type_display?: string;
  message: string;
  is_read?: boolean;
  replied?: boolean;
  notes?: string;
  created_at?: string;
}

export interface CSRProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  impact_statement: string;
  featured_image: string;
  date: string;
  location: string;
  is_active: boolean;
}

// ==================== Careers (Internal Hiring) ====================

export interface Career {
  id: number;
  title: string;
  slug: string;
  department?: string;
  location: string;
  employment_type?: string;
  summary?: string;
  responsibilities?: string;
  requirements?: string;
  application_email?: string;
  apply_url?: string;
  is_active: boolean;
  priority: number;
  posted_at: string;
  updated_at: string;
}

// ==================== Japan Landing Page ====================

export type JapanBulletSection = 'commitment' | 'preparation' | 'trust' | 'vision';

export interface JapanBulletPoint {
  id: number;
  section: JapanBulletSection;
  section_display: string;
  title?: string;
  description: string;
  order: number;
}

export interface JapanTeamMember {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  photo?: string;
  order: number;
}

export interface JapanLandingPage {
  id: number;
  intro_title: string;
  intro_description: string;
  commitment_title: string;
  commitment_intro?: string;
  preparation_title: string;
  preparation_intro?: string;
  trust_title: string;
  trust_intro?: string;
  vision_title: string;
  vision_intro?: string;
  commitment_image?: string;
  preparation_image?: string;
  trust_image?: string;
  vision_image?: string;
  bullet_points: JapanBulletPoint[];
  team_members: JapanTeamMember[];
}

// ==================== HOME PAGE DATA TYPE ====================

export interface HomePageData {
  company_info: CompanyInfo | null;
  featured_clients: Client[];
  industries: Industry[];
  testimonials: Testimonial[];
  featured_jobs: Job[];
  offices: Office[];
}

// ==================== FILTER TYPES ====================

export interface JobFilters {
  country?: string;
  industry?: number;
  category?: number;
  keyword?: string;
  status?: string;
  is_featured?: boolean;
  page?: number;
}

export interface IndustryFilters {
  is_featured?: boolean;
  search?: string;
}

export interface NewsFilters {
  post_type?: string;
  is_featured?: boolean;
  search?: string;
  page?: number;
}

export interface AlbumFilters {
  album_type?: string;
  page?: number;
}
