# AI Web Development — Class Attendance Portal

A buildless single-page attendance application for Peace Awofesobi's AI Web Development class. Plain HTML, CSS and classic deferred JavaScript; no installation, framework, bundler or backend.

## Open and run

Double-click `index.html`, or serve this folder with:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765>. Internet access loads Plus Jakarta Sans, GSAP 3.12.5, ScrollTrigger 3.12.5 and Chart.js 4.4.7. If unavailable, system fonts, static content and text-based chart summaries keep core functionality usable. External resource failures can still appear in the browser network console offline.

## Use

- Select a session date and mark students individually, mark everyone present, or reset to Unmarked. Bulk changes offer Undo; resets and leaving unsaved changes require confirmation.
- Save session attendance to persist changes and include the session in analytics. Live overview/directory show the draft; analytics, history, summaries and exports use saved sessions.
- Search, filter and sort the directory. View Details shows saved individual history; Edit completes or corrects names. Add Student creates a persistent unique ID and an Unmarked draft record in the selected session.
- Export the selected saved session, date-filtered history or student summaries as UTF-8 CSV. Printable reports cover the selected saved session. Browser print controls provide Save as PDF where supported.
- The app stores records in this browser's localStorage. It provides no authentication, remote synchronization or shared database. Export regularly; clearing browser data removes saved attendance. File URLs and HTTP origins have separate storage, as do different browsers and ports. Use one consistent address for daily work.

## Data and assumptions

The initial session is **November 16, 2026**: nine students Present, zero Absent, 100% attendance. This is a captured-moment snapshot, not verification of full-session participation. Peace Awofesobi is the sole instructor and is excluded from student counts and rates.

Stored names are exactly the supplied list: Ibrahim Ahma..., NNENNA UKPAI, Eyiowuawi Tim..., Ara, Emmanuel Rnd, usman hassan, Gift Olungwe, Tomiwa Soyemi, Favour Akinlade. No photograph assets or screenshot file were supplied in this workspace; initials are used. The written participant list is authoritative. The two truncated names remain editable; their confirmed full names must be supplied by the instructor/student.

Attendance rate = `(Present + Late) / (Present + Late + Absent)`. Excused and Unmarked are excluded; no eligible records displays a dash. Present counts do not include Late, which appears separately. Saved Unmarked records count as recorded sessions, but do not affect the percentage. Only saved sessions contribute to analytics; no historical sessions are fabricated.

New session dates begin Unmarked for students enrolled on or before that date. New students join on the selected session date. Historical sessions are not rewritten when students are added. Editing a name updates the current name in historical displays/exports while preserving the student's ID. Student removal is intentionally outside scope.

`ai-class-attendance-v1` stores:

```text
Database {version:1, students:Student[], sessions:{[ISODate]:Session}}
Student  {id:string, name:string, joined:ISODate}
Session  {date:ISODate, records:{[studentId]:status}, savedAt:ISODateTime|null}
status   Present | Absent | Late | Excused | Unmarked
```

Validation rejects malformed dates, missing/duplicate student IDs, unknown record IDs, unsupported statuses and invalid names. Storage exceptions and corrupt JSON produce an explicit in-memory fallback. Existing unreadable storage is not overwritten. CSV cells quote delimiters/newlines and guard spreadsheet formula prefixes. Names are escaped before HTML rendering. Dialogs use native modal focus containment, Escape dismissal and focus restoration. Reduced-motion preferences remove movement.

## Files

```text
index.html
css/ tokens.css, base.css, components.css, sections.css, print.css
js/
  data/participants.js
  services/validation.js, storage.js, attendance.js, export.js
  store.js
  ui/modal.js, toast.js
  main.js
  animations.js
tests/data.test.cjs
README.md
```

The shared `Portal` namespace supports direct file opening without ES-module/CORS restrictions. `store.js` owns draft attendance, selected session, persistence and subscriptions; `main.js` renders the sections and delegates actions. CSS defines a shared token/component system and mobile layouts. Motion is isolated in `animations.js`; charts gracefully degrade to text summaries.

To integrate a real backend, replace the storage service with an authenticated asynchronous repository, keep the validated models, and make store mutations await the repository before announcing success. Add server-side authorization, validation, backup and concurrency handling. This frontend's Instructor display does not provide access control.

## Verification

Run data integrity/regression checks with `node tests/data.test.cjs`; syntax can be checked with `node --check` for each JS file. Data tests cover exact seed names, snapshot counts, new-session defaults, persistence, ID validation, corrupt/unavailable storage, enrollment rules, attendance rates and CSV safety.

Browser-based QA was attempted via local HTTP, but the computer-use safety layer stopped because it could not confidently determine Chrome's current URL. Therefore direct-file/browser-console checks, downloads/print UI, keyboard behavior and visual review at 320, 375, 390, 768, 1024, 1280, 1440 and 1920px are **not verified**. Responsive CSS is implemented for those ranges; these checks remain for a browser-enabled session.
