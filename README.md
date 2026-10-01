# Autoankauf Hamburg by A&E Automobile

Production website, 34 German pages. Registered business: A&E Automobile; proprietor: Eihab Hasan.

Static files are in public/, mail functions in api/. Vercel preset Other, output public, no build command, Node 22, Frankfurt function region.

Private environment variables: RESEND_API_KEY and TURNSTILE_SECRET_KEY as Secrets. MAIL_FROM as sender configuration; SITE_ORIGIN must equal the exact public website origin. Configure separate Preview and Production values. Never put secrets in GitHub.

Vehicle enquiry sending is enabled. The owner verified receipt of mail with photos on the staging deployment. Repeat a genuine request after the production domain changes. Google reviews currently use dated, locally stored excerpts; Google API approval and credentials are still pending.

The location map is a locally stored image supplied by the owner. It appears immediately. Google Maps opens only when the visitor clicks the map or the directions link. No map consent storage or embedded Google iframe is used. Legal pages include the confirmed business identity and VAT ID; the ordinary tax number is not public.

Commercial use requires an appropriate Vercel plan. Keep the previous production project for rollback when moving the domain.

Unused old logos, the earlier schematic map and inactive Google reviews integration have been removed from this deployment. Current reviews are static dated excerpts. Vehicle-data attribution and license notices are retained.

Customer gallery currently contains seven photographs (1.jpg through 7.jpg). If adding photographs, update the gallery count in public/js/main.js as well.
