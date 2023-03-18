import {SENDINBLUE_API_KEY, SENDINBLUE_LIST_ID} from "$env/static/private";
import * as SibApiV3Sdk from '@sendinblue/client';

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    let response;
    const {email, name} = await request.json();
    // Connect to Sendinblue SDK API
    const apiInstance = new SibApiV3Sdk.ContactsApi();
    const createContact = new SibApiV3Sdk.CreateContact();
    apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, SENDINBLUE_API_KEY);

    createContact.email = email;
    createContact.listIds = [parseInt(SENDINBLUE_LIST_ID)];
    createContact.updateEnabled = true;
    createContact.attributes = {
        "PRENOM": name
    };

    await apiInstance.createContact(createContact).then(function(data) {
        response = {
            message: data,
            status: 200
        }
    }, function(error) {
        response = {
            message: error,
            status: 500
        }
    });

    return new Response(response.message, { status: response.status})
}
