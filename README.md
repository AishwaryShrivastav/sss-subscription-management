# Sanathana Sarathi Hindi - Subscription Management System

A production-ready Next.js application for managing magazine subscriptions with Supabase backend and Netlify deployment.

## Features

- **Subscriber Management**: Full CRUD operations for managing subscribers
- **Search & Filter**: Search subscribers by name, ID, mobile, and status
- **Avery 3424 Label Generation**: Generate PDF labels for monthly mailings
- **Authentication**: Secure login system with Supabase Auth
- **Subscription Tracking**: Track subscription start/end dates, renewals, and history

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **PDF Generation**: @react-pdf/renderer
- **Deployment**: Netlify

## Prerequisites

- Node.js 20+ 
- npm or yarn
- Supabase account
- Netlify account

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration file:
   ```bash
   # Copy contents of supabase/migrations/001_initial_schema.sql
   # Paste and run in Supabase SQL Editor
   ```
3. Get your Supabase credentials:
   - Project URL
   - Anon Key
   - Service Role Key (optional, for admin operations)

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Create Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Create a new user with email/password
3. Use these credentials to log in to the application

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Netlify

### Option 1: Deploy via Git (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy!

### Option 2: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Project Structure

```
SSS/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/            # API routes
│   │   ├── login/          # Login page
│   │   └── webapp/         # Protected web app pages
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── subscribers/   # Subscriber-related components
│   ├── lib/               # Utility libraries
│   │   ├── supabase/      # Supabase clients
│   │   ├── db/            # Database queries
│   │   └── pdf/           # PDF generation
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── supabase/
│   └── migrations/        # Database migrations
└── public/                # Static assets
```

## Database Schema

### Subscribers Table

- `id` (UUID, Primary Key)
- `first_name`, `last_name` (Required)
- `subscriber_id` (Optional, Unique)
- `mobile` (Required)
- `email` (Optional)
- `address`, `city`, `district`, `state`, `pincode` (Required)
- `number_of_copies` (Integer, Default: 1)
- `subscription_start_date`, `subscription_end_date` (Required)
- `status` (active | expired | inactive)
- `bulk` (Boolean)
- `samiti` (Optional)
- `delivery_method` (registered | unregistered)
- `payment_method` (Optional)
- `created_at`, `updated_at`, `created_by`

### Subscription History Table

- `id` (UUID, Primary Key)
- `subscriber_id` (Foreign Key)
- `renewal_date`, `previous_end_date`, `new_end_date`
- `amount_paid`, `payment_method`
- `created_at`

## Usage

### Adding a Subscriber

1. Navigate to "Add Subscriber" in the sidebar
2. Fill in all required fields
3. Click "Add Subscriber"

### Searching Subscribers

1. Go to "Search" page
2. Use filters to search by name, ID, mobile, or status
3. Click on a subscriber to view details
4. Use pagination to navigate through results

### Generating Labels

1. Navigate to "Print Labels"
2. Click "Generate Labels PDF"
3. Download and print on Avery 3424 label sheets
4. Ensure print settings are at 100% scale

### Editing/Deleting Subscribers

1. Search for the subscriber
2. Click "View" to see details
3. Click "Edit Subscriber" to modify
4. Or use "Delete" button in the search results

## Avery 3424 Label Specifications

- **Sheet Size**: 8.5" × 11" (US Letter)
- **Labels per Sheet**: 21 (3 columns × 7 rows)
- **Label Size**: 1" × 2-5/8" (2.625")
- **Top Margin**: 0.5"
- **Left Margin**: 0.1875" (3/16")
- **Horizontal Gap**: 0.125" (1/8")

## Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for all `/webapp/*` routes
- Input validation and sanitization
- Environment variables for sensitive data

## Troubleshooting

### Build Errors

- Ensure all environment variables are set
- Check Supabase connection credentials
- Verify Node.js version is 20+

### PDF Generation Issues

- Ensure @react-pdf/renderer is installed
- Check that active subscribers exist in database
- Verify label dimensions match Avery 3424 specifications

### Authentication Issues

- Verify Supabase Auth is enabled
- Check RLS policies are correctly configured
- Ensure user exists in Supabase Auth

## License

ISC

## Support

For issues or questions, please contact the development team.
