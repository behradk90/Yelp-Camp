const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60bf5305d3577747844c1f7c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam facere modi eos aliquid hic blanditiis nulla molestias corrupti architecto debitis eaque, reprehenderit sint culpa! Dolores ullam tenetur eaque iusto nemo.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dt8ay95hw/image/upload/v1623850378/YelpCamp/aemmsk5k8rpmgdbhtm2w.jpg',
                    filename: 'YelpCamp/qj2jim1eltd1gqosoedl'
                },
                {
                    url: 'https://res.cloudinary.com/dt8ay95hw/image/upload/v1623850378/YelpCamp/cqfcfoaasaoolqqlpi0s.jpg',
                    filename: 'YelpCamp/c4o1kpccoqy6txs8i9xs'
                }

            ]
        })
        await camp.save()
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})