document.getElementById('buchungsformular').addEventListener('submit', function(e) {
    e.preventDefault();

    // Daten sammeln
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var workflow = document.getElementById('workflow').value;

    // Daten an Airtable senden
    var data = {
        records: [
            {
                fields: {
                    Name: name,
                    Email: email,
                    Workflow: workflow
                }
            }
        ]
    };

    fetch('https://api.airtable.com/v0/YOUR_BASE_ID/Anfragen', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.ok) {
            alert('Vielen Dank für Ihre Anfrage! Wir werden uns bald bei Ihnen melden.');
            document.getElementById('buchungsformular').reset();
        } else {
            alert('Es gab ein Problem mit Ihrer Anfrage.');
        }
    })
    .catch(function(error) {
        console.error('Fehler:', error);
        alert('Es gab einen Fehler bei der Verarbeitung Ihrer Anfrage.');
    });
});
