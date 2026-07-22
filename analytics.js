/* Visitor analytics dashboard
 * Reads global counters from counterapi.dev (read-only, no increments here).
 * - main: total visits
 * - d-YYYY-MM-DD: per-day visits
 */
(function () {
    const NS = 'yixiao-homepage';
    const API = `https://api.counterapi.dev/v1/${NS}`;

    function dateKey(d) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `d-${y}-${m}-${day}`;
    }

    function lastNDays(n) {
        const days = [];
        for (let i = n - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d);
        }
        return days;
    }

    function fetchCount(name) {
        return fetch(`${API}/${name}/`)
            .then(r => (r.ok ? r.json() : { count: 0 }))
            .then(data => (typeof data.count === 'number' ? data.count : 0))
            .catch(() => null);
    }

    function setStat(id, value) {
        const el = document.getElementById(id);
        if (value == null) return;
        el.textContent = value.toLocaleString();
        el.classList.remove('loading');
    }

    function renderChart(days, counts) {
        const chart = document.getElementById('chart');
        const max = Math.max(...counts, 1);
        const todayKey = dateKey(new Date());

        chart.innerHTML = days.map((d, i) => {
            const count = counts[i] == null ? 0 : counts[i];
            const pct = Math.max((count / max) * 100, 2);
            const label = `${d.getMonth() + 1}/${d.getDate()}`;
            const isToday = dateKey(d) === todayKey;
            return `
                <div class="chart-col${isToday ? ' today' : ''}">
                    <span class="chart-value">${count}</span>
                    <div class="chart-bar" style="height: ${pct}%"></div>
                    <span class="chart-date">${label}</span>
                </div>
            `;
        }).join('');
    }

    document.addEventListener('DOMContentLoaded', function () {
        const days = lastNDays(7);

        Promise.all([
            fetchCount('main'),
            ...days.map(d => fetchCount(dateKey(d)))
        ]).then(([total, ...dayCounts]) => {
            if (total == null && dayCounts.every(c => c == null)) {
                document.getElementById('analytics-error').style.display = 'block';
                return;
            }
            setStat('total-visits', total);
            setStat('today-visits', dayCounts[dayCounts.length - 1]);
            const week = dayCounts.reduce((sum, c) => sum + (c || 0), 0);
            setStat('week-visits', week);
            renderChart(days, dayCounts);
        });
    });
})();
