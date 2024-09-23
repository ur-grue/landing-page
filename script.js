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
            'Authorization': 'pataLQThLzkfWDqqk.6f4f75caa52f80c0cc22589c5fe35de68f55a91478867fd7a4a710b578b1a957',
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
