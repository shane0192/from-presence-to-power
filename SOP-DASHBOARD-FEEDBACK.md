# SOP Runner — fix list from the Lisa + Shane call

**Source:** Fireflies "Lisa + Shane", 17 Aug 2026 (50 min) — [transcript](https://app.fireflies.ai/view/01M08MEDHHEMR8GXHAPXJV2GYP)
**Compiled:** 17 Aug 2026
**App:** Vercel `sop-runner` → dashboard.paperboystudios.co · DB: Supabase `Client Onboarding (Paperboy)` (`vkgxzdwiibxvtkvegppy`)

Timestamps in parentheses link back to the moment in the recording.

---

## 1. Fixed

### ✅ Notion resource links opened the wrong page (14:15–16:00)

Lisa clicked Phil Rosen's "Onboarding Questionnaire Response" and landed on **Tyler Morris**. Shane assumed the resource rows were pointing at the wrong records.

**They weren't.** The stored page IDs are correct — I fetched Phil's ID (`39170e88…50b7`) directly from Notion and it returns *"Onboarding Questionnaire Response — Phil Rosen, openingbelldailynews.com"*. The bug was the **URL format**.

| | |
|---|---|
| Stored | `https://app.notion.com/<32-hex-id>` |
| Notion's canonical | `https://app.notion.com/p/<32-hex-id>` |

Without the `/p/` segment Notion can't resolve the path, so it drops you on your last-viewed page — which for Lisa happened to be Tyler Morris. It looks like scrambled data but is the same broken link every time.

The giveaway: 4 clients (Phil, Tyler, Nathan, Sam) already had the working `/p/Name-<id>` form while the other 10 had the bare form — two different writers, one of them dropping the segment.

**Applied:** inserted `/p/` into 87 URLs — 77 in `client_resources`, 10 in `clients.notion_url`. The one non-Notion link (Phil's Opening Bell Dashboard, a Vercel URL) was left untouched. Verified after the write.

**Rollback**, if ever needed:

```sql
update public.client_resources
set url = regexp_replace(url, '^https://app\.notion\.com/p/([0-9a-f]{32})', 'https://app.notion.com/\1')
where url ~ '^https://app\.notion\.com/p/[0-9a-f]{32}';

update public.clients
set notion_url = regexp_replace(notion_url, '^https://app\.notion\.com/p/([0-9a-f]{32})', 'https://app.notion.com/\1')
where notion_url ~ '^https://app\.notion\.com/p/[0-9a-f]{32}$';
```

> Worth checking whatever wrote these rows (the Notion migration script) so new resources land with `/p/` too — otherwise this comes back on the next import.

---

## 2. Diagnosed — needs your dates before I touch it

### ⚠️ The phantom "47 days late" tasks (07:23–08:00, 16:34–18:22)

Root cause found, and it isn't per-task bad data.

Due dates are computed as **anchor date + offset**. When a `client_plan` row has no matching row in `client_sop_anchors`, the app falls back to the client's **kickoff date** — so every offset-0 task in that SOP renders as *(today − kickoff)* days overdue. The numbers match exactly what you saw on screen:

| Client | Kickoff | Phantom overdue | SOPs missing an anchor |
|---|---|---|---|
| Phil Rosen | 2026-07-01 | **47 days** ✓ *(matches screen)* | shane-month-check-in, referral-reward-program, getting-paid-partner-network, slv-analysis, launch-optimize-creator-network |
| Nathan Barry | 2026-07-29 | **19 days** ✓ *(you read "18")* | shane-month-check-in, referral-reward-program, slv-analysis, execute-audit-discovery-period |
| Sam Woods | 2026-07-14 | 34 days | lead-magnet-stage-1, slv-analysis, shane-month-check-in, getting-paid-partner-network, referral-reward-program |
| Tyler Morris | 2026-05-08 | 101 days | slv-analysis, referral-reward-program, shane-month-check-in |
| 8 recurring-only clients | 2026-02-02 | **196 days** | ongoing, shane-month-check-in |

That last row is the big one: Austin Scholar, Bernard David, Charles Duhigg, Jeremy London, Exec Edge, Fitt Insider, Katelyn Jetelina, Matt King, Rashad Robinson and Tatum Hutton all share a kickoff of `2026-02-02` — a placeholder from the migration, not a real date — so they generate a wall of 196-day-overdue noise.

**Why I stopped here:** fixing it means writing real anchor dates, and inventing schedule dates in a live team system is your call, not mine. Two paths:

1. **Data** — give me the real anchor dates and I'll insert them (you mentioned doing exactly this on tomorrow's call).
2. **Code** — make the fallback safer: if an SOP has no anchor, treat it as unscheduled rather than anchoring to kickoff. That kills the whole class of phantom-overdue at once and is probably worth doing regardless.

Your live edit on the call already proved the mechanism — setting Phil's Sparkloop anchor to 31 Aug cleared the 47-day flag, and it's still saved (`waiting_on_client`, updated by Lisa at 20:19).

### ⚠️ Sam Woods shows up in Lisa's client list (10:04–10:27)

Not a filter bug. `clients.owner` is **null** for Sam Woods and Nathan Barry; all 12 others are `Lisa`. With no owner set they fall through any "my clients" filter.

Tell me who owns each and it's a one-line update — but the sidebar filter itself (below) still needs building.

### ⚠️ Exec Edge lead magnet sits in the wrong stage (11:18–12:26)

Exec Edge only has `ongoing` and `shane-month-check-in` in `client_plan` — no lead-magnet SOP at all, which is why it can't show as an active project. Per the call the real state is: concept done → content drafted → **waiting on client approval** → then design + build delivery.

You said you'd add this manually. I can insert the plan row and anchor if you give me the target dates.

---

## 3. Code fixes — agreed on the call

**I could not apply these.** `sop-runner` isn't on GitHub and isn't in this container — the Vercel project has no git integration, so the source only exists on your machine. Everything below is ready to hand to a session that has the code.

| # | Item | Notes | Time |
|---|---|---|---|
| 1 | **Done button on cards** (23:02–24:50) | Biggest UX complaint. Today you open the task and change a status dropdown. Lisa wants a checkmark on the card that greys/strikes it and moves it to Done. | 23:53 |
| 2 | **Duplicate card bug** (27:19–27:42) | Same task rendered twice in "Waiting on client". You called it "systematic". | |
| 3 | **Board view: one card per subtask** (24:51–25:33, 27:04) | "Three different cards for the same thing." Consolidate subtasks under the parent card — list view already reads cleanly. | |
| 4 | **Timeline doesn't show completed parents as checked** (19:35–20:16) | Parent is done but timeline reads subtask state, so finished onboarding looks open. | |
| 5 | **Filter client sidebar to assigned clients** (10:13–10:27) | Also applies to "Where each client stands" on the dashboard (05:02). Depends on owners being set — see §2. | |
| 6 | **Hide recurring tasks by default for Lisa, keep the monthly report** (05:38–06:24, 28:07) | She has Tue/Fri updates memorised; they're pure clutter. Monthly report she explicitly wants to keep. The nav toggle already exists — this is about the default. | |
| 7 | **Remove the "Recurring rhythm" panel** (09:10–09:33) | Both agreed. | |
| 8 | **Hide "Who's carrying what" for non-admins** (09:40–09:45) | "Only relevant for me, probably." | |
| 9 | **Copy-password button** (38:13–38:18) | Password on the client page can't be selected or copied. | |
| 10 | **Add skills + resources to search** (31:08–31:32) | Searching "audit" returns SOPs and docs but not the matching skill. | |
| 11 | **Skill install instructions + clearer download links** (32:44–34:46) | Instructions exist buried in a task body; put them on the skill page and make the download obvious. | |
| 12 | **Wire the scorecard link** (35:18–35:26) | "I don't think I set that up yet." | |

---

## 4. Pending — decide before building

These came up but never landed on an answer.

| Item | The open question |
|---|---|
| **"Actionable now" window** (21:32–22:56) | Lisa expects a task due 25 Aug to be actionable on the 17th; you agreed, but never set the rule. Is *unblocked* enough, or unblocked **and** within N days? Pick N. |
| **"I can't edit it"** (16:43) | Turned out to be editable once she drilled into the task — discoverability, not a bug. Worth inline date editing from the board, or leave it? |
| **Dashboard layout / clutter** (05:18–05:23) | You offered to move the task list above the charts. Lisa never answered. |
| **Are the two charts useful?** (04:08–04:12, 04:57) | Due-soon chart and open-work-by-client. You asked twice; no verdict. Ask directly before investing in them. |
| **Notion → Google Drive migration** (14:38–14:52) | "You'll figure that out." Big call — where do resources actually live? The `/p/` fix above buys time either way. |
| **Drop the Notion hot-link from client pages** (12:52–13:01) | "Probably get rid of eventually" — blocked on the migration decision. |
| **Simplify SOP descriptions** (25:48–27:00) | Lisa: "too much reading… really dumbed down." Onboarding SOP is good; Sparkloop needs a full rewrite, lead-magnet is still clunky. Content work, needs a pass per SOP. |
| **"Wire it into the funnel" assignee** (26:22–26:29) | Currently Lisa; you said that's wrong and *maybe* Tam. Confirm before I change it. |
| **Skills that write to Notion** (32:20–32:43) | They work for you because you own the Notion. Lisa may have to copy-paste. Unresolved — "until I figure out a better solution". |
| **AI chat widget** (35:12–36:57) | Throws `Cannot read properties`. Not a fix — it's unbuilt. Scope it separately. |

---

## 5. Creator Network Referral Tracker

Separate app (`referral-dashboard`), tracked here so it isn't lost.

- **Scrape daily** (39:43–40:39) — runs every few days, so "last 90 days" was really 18 May–12 Aug on the call.
- **Sticky date-range header** (47:37–47:41) — your own suggestion; the window is invisible while scrolling.
- **"All time" toggle looks like a no-op** (47:21–47:35) — "probably didn't change it." Needs confirming, may be a real bug.
- **Trim what's reported** (44:04–44:20) — you only want agency-referred leads + their financial value, not full sent/received partnership data.
- **Lisa to verify agency-partner tagging** (45:39–46:21) — her action, not a code change. Lewis Howes confirmed correct on the call.

Worth noting Lisa's current process, since it's what the tracker has to beat: she screenshots Kit, drops it into a ChatGPT project, and diffs against the prior week's report. Nothing is stored anywhere but Slack.

---

## Summary

- **1 fixed** — 87 Notion URLs repaired and verified.
- **3 diagnosed**, root cause identified, waiting on your dates/decisions.
- **12 code fixes** specced and agreed — blocked only on source access.
- **10 pending** decisions.
- **5 referral-tracker** items.
