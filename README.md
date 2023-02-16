# 🥦 Healthy Hacks

A full stack web application for health-conscious individuals who want to find nearby restaurants and the healthiest options available on the menu.
## 🤔 Why I built this
Growing up I had alwayse eaten at fast food restaurants, but as I got older I started becoming aware about what I was putting in my body. This awareness about my eating habits and seeing others around me struggle with not knowing what to eat in order to lose weight led me to this idea for a web application. I wanted to make it easier for others to find the healthiest choices at nearby restuarants so whenever someone wants to eat out, then they have a lot of different healthy options that are easy to choose. Therefore I created Healthy Hacks!
 
## 🔗 Live Demo
Try the application live here: https://healthy-hacks.giancarlomassoni.com/

## 💻 Technologies Used

### Languages
* HTML5
* CSS3
* JavaScript (ES6)
* SQL
* React (Framework)
* JSX

### Packages
* Node.js
* Express.js
* Babel
* Webpack
* Argon2
* JSON Web Token
* Dotenv

### API's
* Google Maps API
* Nutrionix API

## 📖 Features
* User can enter address
* User can view restaurants near address
* User can view low calorie options from restaurant menu
* User can add favorite restaurants
* User can add favorite items from menu
* User can view profile of favorite items and favorite restaurants
* User can remove favorite restaurants and items from favorites
* User can create account
* User can login to an account
* User can logout of  account

## 📚 Stretch Features
* Users can add their own home meals
* Users can see calculate total energy expenditure

##👀 Preview
### User can view restaurants near address
![Kapture 2023-02-14 at 16 00 13](https://user-images.githubusercontent.com/71737839/218890744-cb491afe-db80-48e9-a78c-ee6af2570a70.gif)

### User can view low calorie options from restaurant menu
![Kapture 2023-02-14 at 16 02 05](https://user-images.githubusercontent.com/71737839/218890911-7203b9ab-8d04-485f-adf7-f94b1a8ae976.gif)

## 📓 Features in Development
* Users can add their own home meals

## 👨‍💻 Development

### Getting Started
1. Clone the repository
```terminal
git clone git@github.com:GiancarloMassoni/healthy-hacks.git
```
2. Install dependencies with Node Package Manager
```terminal
npm install
```
3. Create a local .env file from provided example file
```terminal
cp .env.example .env
```
4. Set the TOKEN_SECRET from 'changeMe' on your .env file
```terminal
TOKEN_SECRET=changeMe <--
```
5. Start PostgreSQL
```terminal
sudo service postgresql start
```
6. Create a database
```terminal
createdb name-of-database
```
7. Update the DATABASE_URL in your .env file. Switch 'changeMe' to the name-of-database created
```terminal
DATABASE_URL=postgres://dev:dev@localhost/changeMe?sslmode=disable
```
8. Start pgweb to view the database information
```terminal
pgweb --db=name-of-database
```
9. Initialize the database with schema.sql and import any starting data from data.sql
```terminal
npm run db:import
```
10. Start the project! Open a new terminal and run this script. Project can be viewed at http://localhost:3000 in your browser after running the command
```terminal
npm run dev
```
