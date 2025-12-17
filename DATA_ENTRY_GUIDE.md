# KHRM Admin Portal - Comprehensive Data Entry Guide

This guide provides detailed instructions for managing all content on the KHRM website via the Admin Portal.

## 1. Getting Started
*   **Login**: Go to `/admin`, enter credentials, and log in.
*   **Dashboard**: The main screen lists all editable content groups (Organization, Recruitment, etc.).
*   **Actions**:
    *   **Add**: Click `+ Add` to create new items.
    *   **Edit**: Click the item name to change it.
    *   **Delete**: Red button at bottom-left of the edit page. (Caution: Irreversible!)
    *   **Save**: Bottom-right. "Save and continue editing" is useful for long forms.

---

## 2. Organization Group
*Manage company identity, structure, and key people.*

### Company Profile (Single Entry)
*   **Establishment Year / Deployment Stats**: Update specific numbers shown on the homepage.
*   **Mission / Vision / Values**: Text fields for core company philosophy.
*   **About Text**: The main description used on the About page.
*   **Images**:
    *   `Logo`: Main site logo.
    *   `Hero Images` (1-3): Large banners for the homepage sliders.
    *   `Mission/Vision Images`: Specific graphics for those sections.

### Branches & Offices
*   **Branches**: Represents a Country (e.g., Nepal, UAE).
    *   `Country`: Name of the country.
*   **Offices**: Specific locations within a Branch.
    *   `Branch`: Select the country this office belongs to.
    *   `Is Headquarter`: Check this for the main office.
    *   `Latitude / Longitude`: (Decimal) Used to place the pin on the contact map.
    *   `Social Media`: Enter full URLs (e.g., `https://facebook.com/...`) for Facebook/Whatsapp.

### Leadership Team
*   **Name / Position / Bio**: Basic details for board members.
*   **Photo**: Portrait image.
*   **Display Order**: Controls sorting (1 shows first).

### Certifications
*   **Issuing Authority**: Organization that gave the license.
*   **Certificate Number**: License ID.
*   **Certificate Image**: Scan of the document.

---

## 3. Recruitment Group
*Manage jobs, categories, and incoming applications.*

### Job Categories
*   **Name**: e.g., "Construction", "Hospitality".
*   **Skill Level**: Select from `Skilled`, `Semi-Skilled`, etc.
*   **Industry**: Link this category to a broader Industry (see Partners group).

### Job Postings
*   **Title**: Job role (e.g., "Mason", "Security Guard").
*   **Client**: (Optional) Link to a specific Client if you want to show who is hiring.
*   **Salary Range**: Free text (e.g., "1200 - 1500 AED").
*   **Status**: `Open` (accepting apps), `Closed`, or `Filled`.
*   **Is Featured**: Check to highlight this job on the home page.
*   **Application Deadline**: Date when applications close.
*   **Requirements / Responsibilities**: Use the text box to list bullet points.

### Job Applications (View Only)
*   **Resume**: Click to download the candidate's PDF/Word file.
*   **Status**: Change this to track progress (`Screening`, `Interview`, `Selected`, etc.).
*   **Notes**: Private internal comments about the candidate.

### Employer Requests (Inquiries)
*   **Status**: Track the lead from `New` -> `Quotation Sent` -> `Completed`.
*   **Demand Letter**: Downloadable file if the employer uploaded one.
*   **Positions/Workers**: Details on what the employer needs.

---

## 4. Japan Program Group
*Specialized content for the Japan Technical Intern Training Program (TITP) / SSW.*

### Japan Landing Page
*   **Intro / Commitment / Preparation / Trust / Vision**: These sections control the text blocks on the main Japan page.
*   **Images**: Specific images for each of these sections can be uploaded here.

### Japan Training Programs
*   **Program Type**: e.g., "SSW (Specified Skilled Worker)".
*   **Language Training**:
    *   `Training Duration`: e.g., "6 Months".
    *   `Target Level`: e.g., "N4 Level".
*   **Training Points**: Add specific bullet points for the curriculum involved in this program.

### Japan Team Members
*   **Role**: Instructors or coordinators specific to the Japan desk.

---

## 5. Training Group
*General training courses not specific to the Japan program.*

### Training Courses
*   **Course Type**: `Language`, `Vocational`, `Technical`, etc.
*   **Syllabus / Prerequisites**: Detailed text fields.
*   **Certification Provided**: Check if students get a cert at the end.

### Training Facilities
*   **Capacity**: How many students can it hold?
*   **Image**: Photo of the classroom or lab.

---

## 6. Content & Media Group
*Dynamic content for marketing and updates.*

### Internal Careers (Careers)
*   **For hiring YOUR own staff** (not for clients).
*   **Internal Details**: `Department`, `Employment Type`.
*   **Application Email**: Where should candidates send CVs for internal roles?

### Documents
*   **Document Type**: `Employer Form`, `Policy`, `Demand Letter Template`, etc.
*   **File**: The actual PDF/Doc to be downloaded by users.

### CSR Projects
*   **Impact Statement**: Short summary of the benefit (e.g., "Helped 50 families").
*   **Date / Location**: When and where the project happened.

### News & Updates
*   **Post Type**:
    *   `News`: General updates.
    *   `Deployment`: Success stories of deployed workers.
    *   `Announcement`: Official notices.
*   **Is Published**: **Important!** The post won't appear unless this is checked.

### Photo Albums (Media)
*   **Album Type**: `Events`, `Client Visits`, `Orientation`, etc.
*   **Photos**: To add photos, open an Album and add "Media Photos" inside it (or look for the inline photo adder).

---

## 7. Partners Group

### Industries
*   **Icon**: This requires a specific CSS class name (e.g., `flaticon-worker`) or an emoji. Ask developers for the list of available icon codes.
*   **Is Featured**: Shows this industry on the home page.

### Clients
*   **Website**: Link to the client's corporate site.
*   **Industry**: Group clients by their sector.

### Testimonials
*   **Rating**: 1 to 5 stars.
*   **Person Name / Company**: Who provided the feedback.

---

## 8. Site Configuration Group

### Inquiries (Contact Messages)
*   **Inquiry Type**: `General`, `Job Application`, `Employer`, etc.
*   **Action**: Mark as `Read` or `Replied` to clear them from your "to-do" list.

### FAQs
*   **Category**: Group questions by `Job Seekers`, `Employers`, `Visa`, etc.
*   **Display Order**: Questions with lower numbers appear first.

### Privacy Policy / Terms
*   **Content**: Legal text blocks. Usually rarely changed.

---

## 9. System (User Management & Security)
*   **Users**: Create logins for other staff.
*   **Permissions**:
    *   `Active`: Must be checked to log in.
    *   `Staff status`: Must be checked to access Admin.
    *   `Superuser`: Gives full access to everything.

### Google SSO Whitelist (Allowed Emails)
**Important**: If you are using "Sign in with Google", the user's email **must** be added here first.
1.  Go to **System** -> **Google SSO Whitelist**.
2.  Click **Add Allowed Email**.
3.  **Email Address**: Enter the full Gmail or Workspace email address (e.g., `john@company.com`).
4.  **Save**.
*Note*: This does not give Admin access. It only allows them to bypass the login screen if they are already an Admin. You still need to create a User account for them with the same email.

---
**Note**: All images should ideally be optimized (under 2MB) and in `JPEG` or `WEBP` format for fast loading.
