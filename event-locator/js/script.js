// Event Locator - Main JavaScript File

// Sample event data
const sampleEvents = [
    {
        id: 1,
        name: "Kigali Music Festival",
        date: "2024-08-15",
        time: "18:00",
        location: "Kigali Convention Centre",
        category: "music",
        description: "A spectacular music festival featuring local and international artists.",
        longDescription: "Join us for an unforgettable evening of music at the Kigali Music Festival. This annual event brings together the best local and international artists for a night of diverse musical performances. From traditional Rwandan music to contemporary pop, jazz, and world music, there's something for everyone. The festival features multiple stages, food vendors, and interactive experiences for all ages. Don't miss this celebration of music and culture in the heart of Kigali!",
        price: "Free",
        image: "🎵",
        organizer: "Kigali Cultural Events",
        email: "music@kigalievents.com",
        phone: "+250 123 456 789"
    },
    {
        id: 2,
        name: "Tech Innovation Summit",
        date: "2024-08-20",
        time: "09:00",
        location: "University of Rwanda",
        category: "technology",
        description: "Exploring the latest trends in technology and innovation.",
        longDescription: "The Tech Innovation Summit brings together entrepreneurs, developers, and tech enthusiasts to explore the future of technology in Rwanda and beyond. This full-day event features keynote speakers, panel discussions, workshops, and networking opportunities. Topics include artificial intelligence, blockchain, mobile development, and digital transformation. Whether you're a seasoned professional or just starting your tech journey, this summit offers valuable insights and connections.",
        price: "25,000 RWF",
        image: "💻",
        organizer: "Rwanda Tech Community",
        email: "summit@rwandatech.com",
        phone: "+250 987 654 321"
    },
    {
        id: 3,
        name: "Cultural Art Exhibition",
        date: "2024-08-25",
        time: "14:00",
        location: "Kigali Cultural Center",
        category: "art",
        description: "Showcasing traditional and contemporary Rwandan art.",
        longDescription: "Immerse yourself in the rich artistic heritage of Rwanda at this comprehensive art exhibition. The show features works from both established and emerging artists, covering traditional crafts, contemporary paintings, sculptures, and mixed media pieces. The exhibition explores themes of identity, history, and hope, providing visitors with a deep understanding of Rwandan culture through artistic expression. Guided tours are available, and several artists will be present to discuss their work.",
        price: "10,000 RWF",
        image: "🎨",
        organizer: "Kigali Arts Council",
        email: "art@kigaliarts.rw",
        phone: "+250 456 789 012"
    },
    {
        id: 4,
        name: "Food & Wine Festival",
        date: "2024-08-30",
        time: "12:00",
        location: "Nyamirambo Green Park",
        category: "food",
        description: "Taste delicious local and international cuisine.",
        longDescription: "Celebrate the diverse culinary landscape of Rwanda and beyond at our annual Food & Wine Festival. This outdoor event features over 30 food vendors offering everything from traditional Rwandan dishes to international cuisine. Local wineries and breweries will showcase their finest products, and cooking demonstrations by renowned chefs will happen throughout the day. Live music, family activities, and cultural performances create a festive atmosphere for all ages.",
        price: "15,000 RWF",
        image: "🍽️",
        organizer: "Kigali Food Network",
        email: "food@kigalifood.com",
        phone: "+250 789 012 345"
    },
    {
        id: 5,
        name: "Football Championship",
        date: "2024-09-05",
        time: "15:00",
        location: "Amahoro Stadium",
        category: "sports",
        description: "Exciting football matches between top teams.",
        longDescription: "Experience the thrill of competitive football at the annual championship featuring Rwanda's top teams. This tournament brings together skilled players from across the country in a series of exciting matches. The event promises high-energy gameplay, passionate fan support, and the crowning of this year's champions. Food and beverages will be available, and special seating areas are reserved for families. Come support your favorite team and enjoy a day of spectacular football!",
        price: "5,000 RWF",
        image: "⚽",
        organizer: "Rwanda Football Federation",
        email: "championship@rwandafootball.com",
        phone: "+250 012 345 678"
    },
    {
        id: 6,
        name: "Business Networking Event",
        date: "2024-09-10",
        time: "17:00",
        location: "Kigali Marriott Hotel",
        category: "business",
        description: "Connect with entrepreneurs and business leaders.",
        longDescription: "Join Rwanda's most influential business networking event, designed to connect entrepreneurs, business leaders, and professionals from various industries. This elegant evening event features structured networking sessions, keynote presentations on business trends, and opportunities to showcase your business or services. The event includes a welcome reception, dinner, and plenty of time for meaningful conversations. Whether you're looking to expand your network, find potential partners, or explore new opportunities, this is the perfect platform.",
        price: "20,000 RWF",
        image: "💼",
        organizer: "Rwanda Business Network",
        email: "networking@rwandabusiness.com",
        phone: "+250 345 678 901"
    }
];

// Utility Functions
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        city: params.get('city') || '',
        date: params.get('date') || '',
        category: params.get('category') || '',
        id: parseInt(params.get('id')) || null
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function findEventById(id) {
    return sampleEvents.find(event => event.id === id);
}

// Event Filtering Functions
function filterEvents(events, filters) {
    return events.filter(event => {
        // Filter by category
        if (filters.category && event.category !== filters.category) {
            return false;
        }
        
        // Filter by date (simplified - in real app, you'd handle date ranges properly)
        if (filters.date) {
            const eventDate = new Date(event.date);
            const today = new Date();
            
            switch(filters.date) {
                case 'today':
                    return eventDate.toDateString() === today.toDateString();
                case 'tomorrow':
                    const tomorrow = new Date(today);
                    tomorrow.setDate(today.getDate() + 1);
                    return eventDate.toDateString() === tomorrow.toDateString();
                case 'this-week':
                    const weekFromNow = new Date(today);
                    weekFromNow.setDate(today.getDate() + 7);
                    return eventDate >= today && eventDate <= weekFromNow;
                case 'this-month':
                    return eventDate.getMonth() === today.getMonth() && 
                           eventDate.getFullYear() === today.getFullYear();
            }
        }
        
        return true;
    });
}

// HOME PAGE FUNCTIONS
function initHomePage() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const city = document.getElementById('cityInput').value;
            const date = document.getElementById('dateFilter').value;
            const category = document.getElementById('categoryFilter').value;
            
            // Create URL parameters
            const params = new URLSearchParams();
            if (city) params.append('city', city);
            if (date) params.append('date', date);
            if (category) params.append('category', category);
            
            // Redirect to events page with parameters
            window.location.href = `events.html?${params.toString()}`;
        });
    }
}

// EVENTS LIST PAGE FUNCTIONS
function createEventCard(event) {
    const categoryColors = {
        music: 'bg-primary',
        sports: 'bg-success',
        food: 'bg-warning',
        technology: 'bg-info',
        art: 'bg-danger',
        business: 'bg-secondary'
    };

    return `
        <div class="col-md-6 col-lg-4">
            <div class="card event-card h-100 border-0 shadow-sm position-relative" onclick="viewEventDetails(${event.id})">
                <span class="badge ${categoryColors[event.category] || 'bg-secondary'} category-badge">
                    ${event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
                <div class="event-image">
                    ${event.image}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text text-muted mb-2">
                        <small>📅 ${formatDate(event.date)} at ${event.time}</small>
                    </p>
                    <p class="card-text text-muted mb-2">
                        <small>📍 ${event.location}</small>
                    </p>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-success">${event.price}</span>
                        <small class="text-muted">Click for details</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateSearchSummary(filters, eventCount) {
    const summaryEl = document.getElementById('searchSummary');
    if (!summaryEl) return;
    
    let summaryText = `Found ${eventCount} events`;
    
    if (filters.city) {
        summaryText += ` in ${filters.city}`;
    }
    
    if (filters.category) {
        summaryText += ` in ${filters.category}`;
    }
    
    if (filters.date) {
        const dateText = filters.date.replace('-', ' ');
        summaryText += ` for ${dateText}`;
    }
    
    summaryEl.innerHTML = `<p class="mb-0">${summaryText}</p>`;
}

function displayEvents() {
    const filters = getUrlParams();
    const filteredEvents = filterEvents(sampleEvents, filters);
    
    // Hide loading state
    const loadingState = document.getElementById('loadingState');
    if (loadingState) loadingState.style.display = 'none';
    
    // Update search summary
    updateSearchSummary(filters, filteredEvents.length);
    
    if (filteredEvents.length === 0) {
        const noEvents = document.getElementById('noEvents');
        if (noEvents) noEvents.style.display = 'block';
        return;
    }
    
    // Display events
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid) {
        eventsGrid.innerHTML = filteredEvents.map(createEventCard).join('');
        eventsGrid.style.display = 'block';
    }
}

function viewEventDetails(eventId) {
    window.location.href = `event-details.html?id=${eventId}`;
}

function initEventsPage() {
    // Load events when page loads
    setTimeout(displayEvents, 1000);
}

// EVENT DETAILS PAGE FUNCTIONS
function displayEventDetails() {
    const { id } = getUrlParams();
    const event = findEventById(id);
    
    // Hide loading state
    const loadingState = document.getElementById('loadingState');
    if (loadingState) loadingState.style.display = 'none';
    
    if (!event) {
        const errorState = document.getElementById('errorState');
        if (errorState) errorState.style.display = 'block';
        return;
    }
    
    // Category colors
    const categoryColors = {
        music: 'bg-primary',
        sports: 'bg-success',
        food: 'bg-warning',
        technology: 'bg-info',
        art: 'bg-danger',
        business: 'bg-secondary'
    };
    
    // Update page title
    document.title = `${event.name} - Event Locator`;
    
    // Populate event details
    const elements = {
        eventHeroIcon: event.image,
        eventCategory: event.category.charAt(0).toUpperCase() + event.category.slice(1),
        eventTitle: event.name,
        eventDescription: event.description,
        eventDateTime: `${formatDate(event.date)} at ${event.time}`,
        eventLocation: event.location,
        eventPrice: event.price,
        eventCategoryText: event.category.charAt(0).toUpperCase() + event.category.slice(1),
        eventLongDescription: event.longDescription
    };
    
    // Update DOM elements
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
    
    // Update category badge color
    const categoryBadge = document.getElementById('eventCategory');
    if (categoryBadge) {
        categoryBadge.className = `badge ${categoryColors[event.category] || 'bg-secondary'} mb-2`;
    }
    
    // Show event details
    const eventDetails = document.getElementById('eventDetails');
    if (eventDetails) eventDetails.style.display = 'block';
}

function bookEvent() {
    const { id } = getUrlParams();
    const event = findEventById(id);
    
    if (event) {
        alert(`🎉 Great choice! You're interested in booking "${event.name}". 
        
In a real application, this would redirect you to a booking page or payment system. 
        
For now, you can contact the organizer:
📧 ${event.email || 'info@eventlocator.com'}
📞 ${event.phone || '+250 123 456 789'}`);
    }
}

// Social sharing functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const { id } = getUrlParams();
    const event = findEventById(id);
    if (event) {
        const text = encodeURIComponent(`Check out this amazing event: ${event.name}!`);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
}

function shareOnWhatsApp() {
    const { id } = getUrlParams();
    const event = findEventById(id);
    if (event) {
        const text = encodeURIComponent(`Check out this amazing event: ${event.name}! ${window.location.href}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
}

function shareViaEmail() {
    const { id } = getUrlParams();
    const event = findEventById(id);
    if (event) {
        const subject = encodeURIComponent(`Check out this event: ${event.name}`);
        const body = encodeURIComponent(`Hi! I thought you might be interested in this event:

${event.name}
${event.description}

Date: ${formatDate(event.date)} at ${event.time}
Location: ${event.location}
Price: ${event.price}

More details: ${window.location.href}

Hope to see you there!`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
}

function initEventDetailsPage() {
    // Load event details when page loads
    setTimeout(displayEventDetails, 1000);
}

// Initialize appropriate page functions
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'events.html':
            initEventsPage();
            break;
        case 'event-details.html':
            initEventDetailsPage();
            break;
    }
});