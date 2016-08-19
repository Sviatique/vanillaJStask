"use strict"
window.onload = () => {

    const userLogin = window.location.search.slice(1);
    const content = document.getElementById('subscribers');
    content.innerHTML = '<div> Subscriptions of user '+userLogin+' </div>';
    loader.loadExtraData(userLogin+'/subscriptions')
    .then(data => {
        const allSubscribers = document.createElement('ul');

        while(data.length){
            const subscriber = data.shift();
            const subscriberElement = document.createElement('li');

            subscriberElement.innerHTML = subscriber.name;
            allSubscribers.appendChild(subscriberElement);

        }
        content.appendChild(allSubscribers);
    })
    .catch(error => console.log(error));

};