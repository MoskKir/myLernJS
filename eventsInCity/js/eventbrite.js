class EventBrite {
    // Constructor when instanciate
    constructor() {
        this.auth_token ='6P6R6ABTFEWJ53GICF7M';
        this.orderby ='date';
    }
    // Get the events from API
    async queryAPI(eventName, category) {
        const eventsResponse = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${this.orderby}&categories=${category}&token=${this.auth_token}`);
        console.log(eventsResponse);
        // Wait for response and return as json
        const events = await eventsResponse.json();
        return {
            events
        }
    }
    // Get categories from API
    async getCategoriesAPI() {
        // Query the API
        const categoriesResponse = await fetch (`https://www.eventbriteapi.com/v3/categories/?token=${this.auth_token}`);
        // Hold for the response and then return as json
        const categories = await categoriesResponse.json();
        console.log(categories);
        
        return {
            categories
        }
    } 
}
