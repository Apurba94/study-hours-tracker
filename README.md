# Study Hours Tracker

See the minutes you practised in every app of the suite, by day, exam and skill, against a weekly goal.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE and TOEFL and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `Study Hours Tracker.exe` from the [latest release](https://github.com/Apurba94/study-hours-tracker/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/study-hours-tracker/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

Every app in the suite records the minutes you practise. This tracker brings them together: minutes per day for the last two weeks, totals by exam and by app, your streak, and progress toward a weekly goal you set.

Sections: Overview, By app, Progress, About.

## How to use it

1. Practise in any app of the suite; minutes are counted automatically.
2. Set a weekly goal in **Overview**. Five hours a week is a common starting point.
3. Look at **By app** to see where your time actually goes.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (23 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
