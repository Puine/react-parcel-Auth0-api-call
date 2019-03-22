# react-parcel-Auth0-api-call

## Getting Started

You need an account on [Auth0](https://auth0.com).
From the [dashboard](https://manage.auth0.com), get the **domain** and **client ID** from the settings area and add the URL for your application to the **Allowed Callback URLs** and **Allowed Logout URLs** boxes. Also configure **Allowed Web Origins** to the default application URL `http://localhost:1234`.

In Auth0 dashboard, you need to create a new API.
You will also need to add in a new permission :

* Select the Permissions tab from the API section.
* In the name textbox, enter in `read:panneaux`.
* Add a description for this scope ex: `permission to read panneaux` and click the 'add' button.

## Set the Client ID, Domain, and API identifier
Rename the `src/Auth/auth0-variables.js.example` file to `src/Auth/auth0-variables.js` and provide the **client ID** and **domain** there.

## Set Up the `.env` File from `.env.example` in `/client/` AND in `/server/
