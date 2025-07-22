// Analytics page JavaScript
class VisitorAnalytics {
    constructor() {
        this.visitors = JSON.parse(localStorage.getItem('visitors') || '[]');
        this.init();
    }

    init() {
        this.updateStats();
        this.renderWorldMap();
        this.renderCountryChart();
        this.renderTimelineChart();
        this.renderVisitorList();
    }

    updateStats() {
        const totalVisits = this.visitors.length;
        const uniqueCountries = new Set(this.visitors.map(v => v.country)).size;
        const uniqueCities = new Set(this.visitors.map(v => v.city)).size;
        
        // Today's visits
        const today = new Date().toDateString();
        const todayVisits = this.visitors.filter(v => 
            new Date(v.timestamp).toDateString() === today
        ).length;

        document.getElementById('total-visits').textContent = totalVisits.toLocaleString();
        document.getElementById('unique-countries').textContent = uniqueCountries;
        document.getElementById('unique-cities').textContent = uniqueCities;
        document.getElementById('today-visits').textContent = todayVisits;
    }

    renderWorldMap() {
        const countryData = this.getCountryData();
        
        const data = [{
            type: 'choropleth',
            locationmode: 'country names',
            locations: Object.keys(countryData),
            z: Object.values(countryData),
            colorscale: [
                [0, '#f0fdf4'],
                [0.2, '#dcfce7'],
                [0.4, '#bbf7d0'],
                [0.6, '#86efac'],
                [0.8, '#4ade80'],
                [1, '#059669']
            ],
            colorbar: {
                title: 'Visits'
            }
        }];

        const layout = {
            geo: {
                showframe: false,
                showcoastlines: true,
                projection: { type: 'natural earth' }
            },
            height: 400,
            margin: { t: 0, b: 0, l: 0, r: 0 }
        };

        Plotly.newPlot('world-map', data, layout, {responsive: true});
    }

    renderCountryChart() {
        const countryData = this.getCountryData();
        const sortedCountries = Object.entries(countryData)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10); // Top 10 countries

        const data = [{
            type: 'bar',
            x: sortedCountries.map(item => item[1]),
            y: sortedCountries.map(item => item[0]),
            orientation: 'h',
            marker: {
                color: '#059669',
                opacity: 0.8
            }
        }];

        const layout = {
            height: 400,
            margin: { t: 20, b: 40, l: 120, r: 40 },
            xaxis: { title: 'Number of Visits' },
            yaxis: { title: 'Country' }
        };

        Plotly.newPlot('country-chart', data, layout, {responsive: true});
    }

    renderTimelineChart() {
        // Group visits by date
        const dateData = {};
        this.visitors.forEach(visitor => {
            const date = new Date(visitor.timestamp).toDateString();
            dateData[date] = (dateData[date] || 0) + 1;
        });

        const sortedDates = Object.entries(dateData).sort((a, b) => 
            new Date(a[0]) - new Date(b[0])
        );

        const data = [{
            type: 'scatter',
            mode: 'lines+markers',
            x: sortedDates.map(item => item[0]),
            y: sortedDates.map(item => item[1]),
            line: {
                color: '#059669',
                width: 3
            },
            marker: {
                color: '#059669',
                size: 8
            }
        }];

        const layout = {
            height: 400,
            margin: { t: 20, b: 40, l: 40, r: 40 },
            xaxis: { title: 'Date' },
            yaxis: { title: 'Number of Visits' }
        };

        Plotly.newPlot('timeline-chart', data, layout, {responsive: true});
    }

    renderVisitorList() {
        const recentVisitors = this.visitors
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 20); // Show last 20 visitors

        const listContent = document.getElementById('visitor-list-content');
        
        if (recentVisitors.length === 0) {
            listContent.innerHTML = '<div class="visitor-item">No visitors yet</div>';
            return;
        }

        listContent.innerHTML = recentVisitors.map(visitor => `
            <div class="visitor-item">
                <div class="visitor-info">
                    <img src="https://flagcdn.com/24x18/${this.getCountryCode(visitor.country)}.png" 
                         alt="${visitor.country}" class="country-flag"
                         onerror="this.style.display='none'">
                    <span>${visitor.city || 'Unknown'}, ${visitor.country || 'Unknown'}</span>
                </div>
                <div class="visitor-time">
                    ${this.formatDate(visitor.timestamp)}
                </div>
            </div>
        `).join('');
    }

    getCountryData() {
        const countryData = {};
        this.visitors.forEach(visitor => {
            if (visitor.country) {
                countryData[visitor.country] = (countryData[visitor.country] || 0) + 1;
            }
        });
        return countryData;
    }

    getCountryCode(countryName) {
        // Simple mapping for common countries - you can expand this
        const countryMap = {
            'United States': 'us',
            'United Kingdom': 'gb',
            'Canada': 'ca',
            'Germany': 'de',
            'France': 'fr',
            'China': 'cn',
            'Japan': 'jp',
            'India': 'in',
            'Australia': 'au',
            'Brazil': 'br'
        };
        return countryMap[countryName] || 'xx';
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }

    // Method to generate demo data for testing
    generateDemoData() {
        const demoCountries = [
            { country: 'United States', city: 'New York' },
            { country: 'China', city: 'Beijing' },
            { country: 'Germany', city: 'Berlin' },
            { country: 'United Kingdom', city: 'London' },
            { country: 'Japan', city: 'Tokyo' },
            { country: 'France', city: 'Paris' },
            { country: 'Canada', city: 'Toronto' },
            { country: 'Australia', city: 'Sydney' },
            { country: 'India', city: 'Mumbai' },
            { country: 'Brazil', city: 'São Paulo' }
        ];

        const demoVisitors = [];
        for (let i = 0; i < 50; i++) {
            const randomCountry = demoCountries[Math.floor(Math.random() * demoCountries.length)];
            const randomDate = new Date();
            randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
            
            demoVisitors.push({
                country: randomCountry.country,
                city: randomCountry.city,
                timestamp: randomDate.toISOString(),
                ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
            });
        }

        localStorage.setItem('visitors', JSON.stringify(demoVisitors));
        this.visitors = demoVisitors;
        this.init();
    }
}

// Initialize analytics when page loads
document.addEventListener('DOMContentLoaded', () => {
    const analytics = new VisitorAnalytics();
    
    // Add a button to generate demo data for testing
    if (analytics.visitors.length === 0) {
        const demoButton = document.createElement('button');
        demoButton.textContent = 'Generate Demo Data';
        demoButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #059669;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
        `;
        demoButton.onclick = () => {
            analytics.generateDemoData();
            demoButton.remove();
        };
        document.body.appendChild(demoButton);
    }
});
