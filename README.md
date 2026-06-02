# Sanskar Shrestha Portfolio

A curated portfolio website showcasing luxury travel design, bespoke journey planning, and client success stories.

## About

This site highlights the premium services and experience of Sanskar Shrestha, including:

- Personalized luxury travel planning
- Exceptional destination experiences
- Client testimonials and curated story highlights
- Contact details for inquiries and bookings

## Features

- Clean, responsive portfolio design
- Showcase of services and testimonials
- Easy contact and inquiry flow
- Supabase-backed testimonial administration

## Technology Stack

- React + TypeScript
- Vite
- Supabase for backend and auth
- CSS for responsive styling

## Local Setup

1. Install dependencies:
   `npm install`
2. Start development server:
   `npm run dev`
3. Open the local URL shown in the terminal, typically `http://localhost:5173`

## Production Build

- `npm run build`
- `npm run preview`

## Project Structure

- `src/` — main application source files
- `src/components/` — reusable UI components
- `src/pages/` — page views and routes
- `src/contexts/` — app context providers
- `supabase/` — backend functions and database policies

## Deployment

This portfolio can be deployed to Vercel, Netlify, or any static hosting provider. The build output is generated in `dist/`.

### Vercel Deployment

- Choose the `main` branch and connect the repository to Vercel.
- Set the build command to `npm run build`.
- Set the publish directory to `dist`.
- Add the following Vercel environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

The project includes `vercel.json` to ensure Vercel serves the app as a single-page application and correctly handles client-side routing.

## Notes

This repository is a professional portfolio website. The README is tailored to present the site as a polished luxury travel portfolio.
