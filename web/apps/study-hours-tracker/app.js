/* Study Hours Tracker: minutes practised in every app of the suite, by day, exam and app, against a weekly goal. */
(function () {
  'use strict';
  const KEY = 'study-hours-tracker.goal';
  // Minutes per day for the last n days, ending today, including days with no practice.
  const perDay = (practice, today, n) => SK.range(n).map((i) => { const d = SK.addDays(today, i - n + 1); return { day: d, minutes: SK.round(SK.sum(practice.filter((p) => p.day === d).map((p) => p.minutes)), 0) }; });
  const thisWeek = (practice, today) => SK.sum(perDay(practice, today, 7).map((d) => d.minutes));
  const App = {
    about: 'Every app in the suite records the minutes you practise. This tracker brings them together: minutes per day for the last two weeks, totals by exam and by app, your streak, and progress toward a weekly goal you set.',
    how: ['Practise in any app of the suite; minutes are counted automatically.', 'Set a weekly goal in **Overview**. Five hours a week is a common starting point.', 'Look at **By app** to see where your time actually goes.'],
    tabs: [
      { id: 'overview', label: 'Overview', render(el) {
        const pr = SK.store.get('suite.practice', []), goal = SK.store.get(KEY, 300), d = SK.dayKey();
        const week = thisWeek(pr, d);
        el.appendChild(SK.card('This week', SK.stats([['Minutes in the last 7 days', SK.round(week, 0)], ['Weekly goal', goal], ['Day streak', SK.streak(pr.map((p) => p.day))], ['All time, hours', SK.round(SK.sum(pr.map((p) => p.minutes)) / 60, 1)]]), SK.bar((100 * week) / goal),
          SK.h('div', { style: { marginTop: '10px' } }, SK.select([[120, '2 hours a week'], [300, '5 hours'], [480, '8 hours'], [720, '12 hours'], [1200, '20 hours']], goal, (v) => { SK.store.set(KEY, Number(v)); SK.show('overview'); }, 'Weekly goal'))));
        el.appendChild(SK.card('Last 14 days', SK.chart.bars(perDay(pr, d, 14).map((x) => ({ label: x.day.slice(5), value: x.minutes })), { label: 'Minutes per day' })));
      } },
      { id: 'apps', label: 'By app', render(el) {
        const pr = SK.store.get('suite.practice', []);
        const by = {}, ex = {};
        pr.forEach((p) => { by[p.app] = (by[p.app] || 0) + p.minutes; ex[p.exam] = (ex[p.exam] || 0) + p.minutes; });
        el.appendChild(SK.card('By exam', SK.stats(Object.entries(ex).map(([k, v]) => [k === 'BOTH' ? 'Both tests' : k, SK.round(v, 0) + ' min']))));
        el.appendChild(SK.card('By app', Object.keys(by).length ? SK.table(['App', 'Minutes'], Object.entries(by).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, SK.round(v, 0)])) : SK.h('p', { class: 'sk-muted', text: 'No practice recorded yet.' })));
      } },
    ],
    perDay, thisWeek,
    checks: { 'minutes are summed per day including empty days': (data, assert) => {
      const pr = [{ day: '2026-11-05', minutes: 10 }, { day: '2026-11-05', minutes: 5 }, { day: '2026-11-03', minutes: 20 }, { day: '2026-10-20', minutes: 99 }];
      assert.deepEqual(perDay(pr, '2026-11-05', 3).map((x) => x.minutes), [20, 0, 15]);
      assert.equal(thisWeek(pr, '2026-11-05'), 35);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
