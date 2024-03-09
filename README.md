# VSHOP
## Front-end and Back-end Repository (React with Vite)

### Table of Contents

1. [Table of Contents](#table-of-contents)
2. [Description](#description)
3. [Setup](#setup)
    - [Scripts](#scripts)
    - [Environment variables](#environment-variables)
4. [File Structure](#file-structure)
5. [Used Technologies](#used-technologies)
6. [Client routes](#client-routes)
7. [License](#license)
8. [Contact](#contact)


 ## Description
"Discover Trendy Threads: Your go-to online store for trendy eyewear, stylish sneakers, and cozy hoodies. Shop effortlessly and elevate your wardrobe!"

## Setup

#### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine before getting started.

Follow the steps below to setup the application in your local development environment:

1. Install dependencies

```bash
npm install
```

2. Run the application

```bash
npm run dev
```

The application will open automatically on localhost (port 5173 if it's not in use already).

<br/>

To create a production build

```bash
npm run build
```

### Scripts

The following commands can be found in the [`package.json`](./package.json) file in the project root. To execute them, simply use the command the following way:

```
npm run <command>
```

| Command      | Description                                       |
| ------------ | --------------------------------------------------|
| `dev`        | Starts the Vite development server.               |
| `build`      | Builds an optimized version for production.       |
| `lint`       | Runs ESLint to check and fix the code.            |
| `preview`    | Launches a preview of the generated application.  |


### Environment variables

| Variable                             | Description                                   |
| ------------------------------------ | -------------------------------------------------------------------------------------|
| `VITE_FIREBASE_API_KEY`            | This key provides access to the Firebase API.                                          |
| `VITE_FIREBASE_AUTH_DOMAIN`        |This key indicates the authentication domain of your application.                       |
| `VITE_FIREBASE_PROJECT_ID`         |This key uniquely identifies your project in Firebase.                                  |
| `VITE_FIREBASE_STORAGE_BUCKET`     |This key specifies the Google Cloud storage bucket associated with your Firebase project|
| `VITE_FIREBASE_MESSAGING_SENDER_ID`| This key contains the sender ID for Firebase Cloud Messaging (FCM).                    |
| `VITE_FIREBASE_APP_ID`             | This key contains the app ID for your Firebase project.                                |

## File Structure

The file structure in the Jamlink front-end is organized as follows:

```plaintext
.
|-- .github/
|-- public/  
|-- src/
|-- assets/
|-- components/
|-- composable/
|-- config/
    |-- firebase.js/
|-- helpers/
|-- router/
|-- stores/
    |--auth.js
    |--coupon.js
    |--sales.js
    |--sneaker.js
    |--store.js
    |--sunglasses.js
    |--sweatshirt.js
|-- views/
|-- App.vue
|-- main.js
|-- .eslintrc.cjs
|-- .gitignore
|-- Dockerfile
|-- README.md
|-- index.html
|-- formkit.config.js
|-- postcss.config.js
|-- tailwind.config.js
|-- package-lock.json
|-- package.json
|-- vite.config.js

```

## Used Technologies

- **Front-end:**
  - [Vue](https://vuejs.org/) - JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/) - Fast development tool for JavaScript and TypeScript-based projects.
  - [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Markup language for web page structure.
  - [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Style sheet language for styling the user interface.
  - [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programming language for client-side logic.
  - [Tailwind](https://tailwindcss.com/) - CSS framework for fast and responsive web development.

- **Back-end:**
  - [Firebase](https://firebase.google.com/) - Firebase is a comprehensive platform developed by Google for building and managing web and mobile applications.
    - [Pinia](https://pinia.vuejs.org/) - Pinia is a state management pattern and library for Vue.js applications. It provides a simple and efficient way to manage the application's state, particularly for larger-scale applications where managing state can become complex.

- **Tools and Utilities:**
  - [GitHub Actions](https://github.com/features/actions) - For continuous integration and automatic deployment.

## Client routes

| Client routes                 |                                                  |           |
|-------------------------------|--------------------------------------------------|-----------|
|                               |                                                  |           |
|         URL                   |      Description                                 | Protected |
|/                              | Index page                                       |           |
|/Sneakers                      |  gallery all Sneakers                            |           |
|/Sunglasses                    | gallery all Sunglasses                           |           |
|/SweatShirt                    |gallery all SweatShirt                            |           |
|/info/SweatShirt/:id           | description to SweatShirt and will can buy       |           |
|/info/Sunglasses/:id           |description to Sunglasses and will can buy        |           |
|/info/Sneakers/:id             |description to Sneakers and will can buy          |           |
|/logIn/                        | Login page                                       |           |
|/admin/                        |will can create product edit  and deleted         |    x      |
|/admin/sales                   | see buys that they will does of all days         |    x      |
|/admin/products                | choose alls products of  a type or create        |    X      |
|/admin/all/sneakers            |choose a sneaker and will can edit and deleted    |    X      |
|/admin/edit/sneaker/:id        | edit a sneaker in concrete                       |    X      |
|/admin/all/sunglasses          |choose a sunglasses and will can edit and deleted |    X      |
|/admin/edit/sunglasses/:id     | edit a sneaker in concrete                       |    X      |
|/admin/all/sweatshirts         |choose a sweatshirts and will can edit and deleted|    X      |
|/admin/edit/sweatshirts/:id    | edit a sneaker in sweatshirts                    |    X      |
|/admin/new-product             | zone that will can choose a product that crerate |    x      |
|/admin/new-product/snikers     |formulary to create a sneaker                     |    X      |
|/admin/new-product/sunglasses  | formulary to create a sunglasses                 |    X      |
|/admin/new-product/sweatshirts | formulary to create a sweatshirts                |    X      |

## License

This project uses various technologies and resources, each with its respective licenses. Below is the license information for the main technologies and tools used in the front-end:

### Front-end

- **Vue**: [MIT License](https://opensource.org/licenses/MIT)
- **Vite**: [MIT License](https://opensource.org/licenses/MIT)
- **HTML**: [HTML License](https://opensource.org/licenses/MIT) (Note: HTML generally doesn't have a specific license)
- **CSS**: [MIT License](https://opensource.org/licenses/MIT)
- **JavaScript**: [MIT License](https://opensource.org/licenses/MIT)
- **Tailwind**: [MIT License](https://opensource.org/licenses/MIT)

### Back-end

- **Firebase**: [MIT License](https://opensource.org/licenses/MIT)
- **Pinia**:    [MIT License](https://opensource.org/licenses/MIT)

## API end Points


## API end Points

| Sneaker Store         |
| ---------------------- |
| useSneakerStore        |

| HTTP Method            | call                  | Description                 |
| ---------------------- | ----------------------| --------------------------- |
| GET                    | getAllProductSneakers | All Sneaker list           |
| POST                   | createProduct         | Add new Sneaker             |
| GET                    | updateProduct         | Matching ID Sneaker details |
| GET                    | filterPricesSneakers  | Filtered Sneaker           |


| sunglases Store        |
| ---------------------- |
| useSunglassesStore     |

| HTTP Method            | call                  | Description                 |
| ---------------------- | ----------------------| --------------------------- |
| GET                    | getAllProductSunglasses| All sunglases list           |
| POST                   | createProduct         | Add new sunglases             |
| GET                    | updateProduct         | Matching ID sunglases details |
| GET                    | filterPricesSunglasses| Filtered sunglases            |


| sweatshirt Store        |
| ---------------------- |
| useSweatStore     |

| HTTP Method            | call                  | Description                 |
| ---------------------- | ----------------------| --------------------------- |
| GET                    | getAllProductSweatshirt| All sweatshirt list           |
| POST                   | createProduct         | Add new sweatshirt             |
| GET                    | updateProduct         | Matching ID sweatshirt details |
| GET                    | filterPricesSweatshirt| Filtered sweatshirt            |



| component              |
| ---------------------- |
| ButtomDeleted          |

| HTTP Method            | call                  | Description                 |
| ---------------------- | ----------------------| --------------------------- |
| POST                    | deleted              | deleted a sweatshirt,a sunglases or a sneaker      |


| Auth                   |
| ---------------------- |
| useAuthStore           |

| HTTP Method            | call         | Description                 |
| ---------------------- | ------------ | --------------------------- |
| POST                   | login        | Login user                  |


### Tools and Utilities

- **GitHub Actions**: [GitHub Terms of Service](https://docs.github.com/en/github/site-policy/github-terms-of-service)


## Contact

Created by [Carlos Albendiz](https://github.com/illocarlos). 