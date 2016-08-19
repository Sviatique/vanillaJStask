'use strict'
window.onload = () => {
    const userLogin = window.location.search.slice(1);
    const content = $('#subscribers');
    content.text(`Subscriptions of user ${userLogin}`);
    loader.loadExtraData(userLogin+'/subscriptions')
    .then(data => {
        const allSubscribers = $('<ul></ul>');

        data.map(subscriber => {
            const subscriberElement = $('<li></li>');

            subscriberElement.text(subscriber.name);
            allSubscribers.append(subscriberElement);
        });
        content.append(allSubscribers);
    })
    .catch(error => console.log(error));

};