const EventEmitter = require('events');

class EventBus extends EventEmitter { }

const eventBus = new EventBus();

const EVENTS = {
    USER: {
        REGISTERED: 'user.registered',
        PASSWORD_RESET_REQUESTED: 'user.password_reset_requested',
        PASSWORD_CHANGED: 'user.password_changed'
    },
    SHOP: {
        ORDER_PLACED: 'shop.order_placed',
        ORDER_SHIPPED: 'shop.order_shipped',
        ORDER_DELIVERED: 'shop.order_delivered'
    },
    CORPORATE: {
        EMPLOYEE_ADDED: 'corporate.employee_added'
    }
};

module.exports = {
    eventBus,
    EVENTS
};
