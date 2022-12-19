import fetch from 'node-fetch';
fetch("https://oxe360-ooc-ibit-150.odoo.com/jsonrpcs/", {
    method: 'post',
    body: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
            "service": "object",
            "method": "execute",
            "args": [
                "oxe360-ooc-ibit-150-prd-15-0-6009101sss",
                6,
                "c6414bc3d4263ee30a5da550500a750f3b93b24essss",
                "hr.employee",
                "search_read",
                [],
                []
            ]
        }
    }),
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(async (response) => {
        if (response.status) {
            const data = await response.json();
            const colaboradores = data.result;
            colaboradores.forEach(colaborador => {
                const fechaNacimiento = new Date(colaborador.birthday);
                // const hoy = new Date();
                // if (hoy < fechaNacimiento) {

                // }
                if (colaborador.birthday) {
                    handleEnviarWhatsapp(colaborador.name, colaborador.birthday)
                }
            });
            console.error(data)
        }
        console.log(response.status)
    })
    .catch(function (err) {
        console.log("Unable to fetch -", err);
    });

// import fetch from 'node-fetch';

const handleEnviarWhatsapp = (nombres, fechaNacimiento) => {

    fetch("https://graph.facebook.com/v13.0/100866399557449/messages", {
        method: 'post',
        body: JSON.stringify({
            "messaging_product": "whatsapp",
            "to": "51992769004",
            "type": "template",
            "template": {
                "name": "notificacion",
                "language": {
                    "code": "es"
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": nombres
                            },
                            {
                                "type": "text",
                                "text": fechaNacimiento
                            }
                        ]
                    }
                ]
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer EAAL0ah0RFQsBADXYOECvCSKbZBIboCWUKrZBVb9UYA9yfnuhuoLKrZBZBbLDjg0Kwt0zdrTnIYrR2SZBxwUvRuoIaXGZBWtqVbXPQiCawr4qUnPvPcL3VmBoZCho67qZCeIBQZBYTCbDjCZA3Yd5LwAWoh30sdEZC9ms0q5ek2yWlzngUL2rHwaX4VGZBeaS3F3ZBJgvx1DfHapqWKQZDZD'
        }
    })
        .then(async (response) => {
            if (response.status) {
                const data = await response.json();
                console.error(data)
            }
            console.log(response.status)
        })
        .catch(function (err) {
            console.log("Unable to fetch -", err);
        });
}