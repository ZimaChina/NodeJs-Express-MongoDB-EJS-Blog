# NodeJs, Express, EJS & MongoDB Blog - CRUD

## A fully functional blog with an index page, post, contact and admin page. Heres the way you can deploy it on a localhost, up to you if you want to use Cyclic as I did, if so, install with npm the dependencies needed before every deploy, and push em into the remote. It seemed to work better.
## Lastly, you'll see that I kept some info, its part of my blog, feel free to change it in order to create your own space. cheers

## You need:
- NodeJs
- Database (MongoDB) Free Cluster

## Create .env file
Create a .env file to store your credentials. Example below:

```
MONGODB_URI=mongodb+srv://<username>:<password>@clusterName.xxxxxxx.mongodb.net/blog
JWT_SECRET=MySecretBlog
```

## Installation
To install and run this project - install dependencies using npm and then start your server:

```
$ npm install
$ npm run dev
```

## Design Files
The Blog layout is available in a Figma(.fig) file located under the "Design Files".

[View Live Figma Prototype](https://www.figma.com/proto/Vpc5J1ajnwDTT96q0IUFDJ/NodeJs-Blog?page-id=0%3A1&type=design&node-id=48-119&viewport=-194%2C377%2C0.17&scaling=min-zoom&starting-point-node-id=48%3A119)


