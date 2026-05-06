document.addEventListener('DOMContentLoaded', function() {
    var visitors = JSON.parse(localStorage.getItem('visitors') || '[]');

    // Stats
    document.getElementById('total-visits').textContent = visitors.length;
    var today = new Date().toDateString();
    var todayCount = visitors.filter(function(v) {
        return new Date(v.timestamp).toDateString() === today;
    }).length;
    document.getElementById('today-visits').textContent = todayCount;

    // Visitor list
    var list = document.getElementById('visitor-list-content');
    var recent = visitors.sort(function(a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
    }).slice(0, 30);

    if (recent.length === 0) {
        list.innerHTML = '<div class="visitor-item"><span class="visitor-info">No visitors yet</span></div>';
        return;
    }

    list.innerHTML = recent.map(function(v) {
        var loc = (v.city || 'Unknown') + ', ' + (v.country || 'Unknown');
        var time = formatTime(v.timestamp);
        return '<div class="visitor-item">' +
            '<span class="visitor-info">' + loc + '</span>' +
            '<span class="visitor-time">' + time + '</span>' +
            '</div>';
    }).join('');
});

function formatTime(timestamp) {
    var diff = Date.now() - new Date(timestamp).getTime();
    var mins = Math.floor(diff / 60000);
    var hrs = Math.floor(diff / 3600000);
    var days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    if (hrs < 24) return hrs + 'h ago';
    if (days < 7) return days + 'd ago';
    return new Date(timestamp).toLocaleDateString();
}
