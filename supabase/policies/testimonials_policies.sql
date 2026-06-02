-- Supabase RLS policies for testimonials

-- Allow anonymous website visitors to insert new testimonials only in pending status.
CREATE POLICY "Allow public insert pending testimonials" ON public.testimonials
FOR INSERT
WITH CHECK (
  auth.role() = 'anonymous'
  AND status = 'pending'
);

-- Allow authenticated admin users to select testimonials.
CREATE POLICY "Allow authenticated select testimonials" ON public.testimonials
FOR SELECT
USING (
  auth.role() = 'authenticated'
);

-- Allow authenticated admin users to update testimonials.
CREATE POLICY "Allow authenticated update testimonials" ON public.testimonials
FOR UPDATE
USING (
  auth.role() = 'authenticated'
);

-- Optional: allow authenticated users to delete if needed.
-- CREATE POLICY "Allow authenticated delete testimonials" ON public.testimonials
-- FOR DELETE
-- USING (
--   auth.role() = 'authenticated'
-- );
