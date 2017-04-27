# Reddit Reader in React & TypeScript

This is a small sample that queries [Reddit.com](https://reddit.com) using jQuery, and displays the results using React.

## Setting up

To setup the project, simply run:

```shell
npm install -g webpack
npm install
```

## Running it

To run the project, simply run

```shell
webpack
```

and open up `index.html`.

You can also have webpack watch for changes as you edit the project:

```shell
webpack --watch
```

## Potential issues

This sample will not work if deployed on a server without updating the references of the `<script>` tags in `index.html`.
Additionally, some browsers will complain about trying to include local JavaScript even if not hosted on a web server.

To get around this, either make the referenced `.js` files available through the server you are hosting on, or use a CDN:

You can get more information on hosting with CDNs for the following: 

* [jQuery](https://code.jquery.com/)
* [React and ReactDOM](https://facebook.github.io/react/docs/tooling-integration.html#cdn-hosted-react)