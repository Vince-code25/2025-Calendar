class Calendar {
    constructor() {
        this.currentDate = new Date(2025, 0, 1); // Start with January 2025
        this.monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        this.holidays = {
            '2025-01-01': 'New Year\'s Day',
            '2025-01-20': 'Martin Luther King Jr. Day',
            '2025-02-14': 'Valentine\'s Day',
            '2025-02-17': 'Presidents\' Day',
            '2025-03-17': 'St. Patrick\'s Day',
            '2025-04-13': 'Easter Sunday',
            '2025-05-26': 'Memorial Day',
            '2025-06-19': 'Juneteenth',
            '2025-07-04': 'Independence Day',
            '2025-09-01': 'Labor Day',
            '2025-10-31': 'Halloween',
            '2025-11-27': 'Thanksgiving Day',
            '2025-12-25': 'Christmas Day',
            '2025-12-31': 'New Year\'s Eve'
        };

        this.events = {
            '2025-04-22': 'Earth Day',
            '2025-05-11': 'Mother\'s Day',
            '2025-06-15': 'Father\'s Day',
            '2025-11-11': 'Veterans Day',
            '2025-12-21': 'Winter Solstice'
        };
        
        this.setupEventListeners();
        this.renderCalendar();
        this.updateNavigationButtons();
    }

    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
    }

    formatDate(year, month, day) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    updateNavigationButtons() {
        const prevButton = document.getElementById('prevMonth');
        const nextButton = document.getElementById('nextMonth');
        
        // Disable previous button if we're in January 2025
        prevButton.disabled = this.currentDate.getFullYear() === 2025 && this.currentDate.getMonth() === 0;
        
        // Disable next button if we're in December 2025
        nextButton.disabled = this.currentDate.getFullYear() === 2025 && this.currentDate.getMonth() === 11;
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Update header
        document.getElementById('monthYear').textContent = `${this.monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        let calendarBody = document.getElementById('calendarBody');
        calendarBody.innerHTML = '';

        let date = 1;
        let html = '';

        // Create calendar rows
        for (let i = 0; i < 6; i++) {
            html += '<tr>';
            
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < startingDay) {
                    // Add days from previous month
                    const prevMonthLastDay = new Date(year, month, 0).getDate();
                    const day = prevMonthLastDay - (startingDay - j - 1);
                    html += `<td class="other-month">${day}</td>`;
                } else if (date > totalDays) {
                    // Add days from next month
                    html += `<td class="other-month">${date - totalDays}</td>`;
                    date++;
                } else {
                    // Add days from current month
                    const today = new Date();
                    const isToday = date === today.getDate() && 
                                  month === today.getMonth() && 
                                  year === today.getFullYear();
                    
                    const dateString = this.formatDate(year, month, date);
                    const holiday = this.holidays[dateString];
                    const event = this.events[dateString];
                    
                    let classes = [];
                    if (isToday) classes.push('today');
                    if (holiday) classes.push('holiday');
                    if (event) classes.push('event');
                    
                    html += `<td class="${classes.join(' ')}">
                        ${date}
                        ${holiday ? `<span class="holiday-name">${holiday}</span>` : ''}
                        ${event ? `<span class="event-name">${event}</span>` : ''}
                    </td>`;
                    date++;
                }
            }
            
            html += '</tr>';
            
            if (date > totalDays && i < 5) break;
        }

        calendarBody.innerHTML = html;
        this.updateNavigationButtons();
    }

    previousMonth() {
        if (this.currentDate.getFullYear() === 2025 && this.currentDate.getMonth() === 0) return;
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        if (this.currentDate.getFullYear() === 2025 && this.currentDate.getMonth() === 11) return;
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }
}

// Initialize calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});