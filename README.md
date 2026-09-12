# Sadaf Ali — Professional Portfolio CMS v2

A polished portfolio with a private browser-based CMS. You can edit the entire visible portfolio without touching code.

## Public site
`/`

## Private editor
`/admin.html`

## Editable from Admin
- Profile name, role, availability, hero text, email, LinkedIn, GitHub, resume link
- About summary and mini stats
- Skills and skill groups
- Work experience (add/remove/edit)
- Projects (add/edit/delete)
- Education (add/remove/edit)
- Contact heading, message and button
- Footer text

## One-time setup
1. Create a free Supabase project.
2. Run `schema.sql` in Supabase SQL Editor. If you already ran the previous v1 schema, run this updated schema again; it safely keeps the existing projects table and adds the site_content table.
3. In Supabase Authentication, create your Email/Password admin user.
4. Put your Supabase Project URL and publishable/anon key into `config.js`.
5. Add `resume.pdf` or set a different resume URL in Admin.
6. Push the folder to GitHub and deploy it to Vercel.

## Security
Use only the Supabase publishable/anon key in browser code. Never use a service_role/secret key. RLS is enabled for both tables.
