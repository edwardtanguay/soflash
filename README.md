# Social Flashcards

The purpose of this website/app is to allow users to upload, test themselves on and share flashcards with each other.

It is also a showcase project for a typical opensource, fullstack MERN project featuring:

-   users capable of logging in via Google (e.g. with Kinde)
-   backend deployeed at Hetzner
-   frontend deployed at Vercel
-   cloud database at MongoDB Atlas
-   devop workflows (dev/main branches, release versions, GitHub Actions)

## status

-   this project is currently in early [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) stage (Nov 2024)
-   I use it on my computer and phone to learn from Spanish flashcards I create
-   for other users besides me, there is not yet an option to add flashcards, just test yourself with them
-   nor can you log in yet, but the guest user can take flashcards and earn points as if they are logged in

![grafik](https://github.com/user-attachments/assets/a8ad0f7c-57b5-45e9-9d5b-47dd19e84259)

## looking for contributors

-   if you are interested in getting experience in an opensource project, e.g. for your CV, portfolio, or just for the experience, please contact me

## live sites

-   development: https://soflash-dev.vercel.app
-   production: https://soflash.vercel.app

## tech stack

-   Vite
-   React
-   React Router 6.4 with createBrowserRouter
-   TypeScript
-   easy-peasy Redux
-   Sass
-   Tailwind
-   ESLint
-   Prettier
-   responsive

## setup

-   `npm i`
-   `npm run dev`
-   create **.env** file:

```
VITE_SITE_LOCATION = local
VITE_SITE_DEVMODE = false
```

## concepts

-   app items have three levels
    -   rawFlashcards
        -   external, untrusted, potentially invalid data
    -   cleanFlashcards
        -   validated and cleaned, e.g. with Zod
    -   generally have the same data structure as rawItems, but cleanItems can be trusted
    -   flashcards
    -   these are the frontend version of the item
    -   generally have extra fields for frontend interaction, e.g. isOpen, highlighted, etc.
-   data import
    -   Go script
    -   goes through list of data sources, copies them to /\_dataImportSource
    -   later: saves history files so every time it gets a new version, it copies the current to the history
    -   e.g. techlanglearn.flashcards.json
