// $(document).on('submit', 'form', function (event) {
//     event.preventDefault(); // Prevent default form submission behavior

//     // Get the value of the field with id "name-2"
//     var fieldValue = $('#name-2').val();

//     // Create a data object to send to Zapier
//     var formData = {
//         "name-2": fieldValue
//     };

//     // Your Zapier Webhook URL
//     var zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/6943742/2myd810/';

//     // Send the form data to the Zapier webhook
//     fetch(zapierWebhookUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         mode: "no-cors",
//         body: JSON.stringify(formData),
//     })
//         .then(response => {
//             if (response.ok) {
//                 console.log('Form submitted and webhook triggered');
//                 // Optionally reload the page after 2 seconds
//                 setTimeout(function () {
//                     location.reload(true);
//                 }, 2000);
//             } else {
//                 console.error('Webhook failed');
//             }
//         })
//         .catch(error => {
//             console.error('Error triggering webhook:', error);
//         });
// });

// Webflow.push(function () {
//     $(document).on('submit', 'form', function () {
//         // Refresh page after 3000 milliseconds
//         setTimeout(function () { location.reload(true); }, 3000);
//     });
// });


$(document).on('submit', 'form', function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the value of the field with id "name-2"
    var fieldValue = $('#name-2').val();

    // Create a data object to send to Zapier
    var formData = {
        "name-2": fieldValue
    };

    // Your Zapier Webhook URL
    var zapierWebhookUrl = process.env.ZAP_WEBHOOK_URL; // Use .env file variable

    // Send the form data to the Zapier webhook
    fetch(zapierWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: "no-cors", // Remove this if you want to handle the response
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (response.ok) {
                console.log('Form submitted and webhook triggered');
            } else {
                console.error('Webhook failed');
            }
        })
        .catch(error => {
            console.error('Error triggering webhook:', error);
        })
        .finally(() => {
            // Reload the page after 3 seconds
            setTimeout(function () {
                location.reload(true);
            }, 3000);
        });
});

