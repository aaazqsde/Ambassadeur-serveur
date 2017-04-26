/**
 * Created by mafessel on 19/04/2017.
 */
var Restaurants = require('../models/restaurant');

module.exports = function (app) {

    app.get('/restart', function (req, res) {

        var starterRestaurants = [
            {
                nom: "Ouvert tout le temps",
                type: ["Brasserie"],
                ambiance: "Conviviale",
                service: "Terrasse",
                description: "C'est trop de la balle ça mère !",
                note: [5, 5, 4],
                ouvert: false,
                horaires: {
                    lundi: [{from: 8, to: 20}],
                    mardi: [{from: 8, to: 20}],
                    mercredi: [{from: 8, to: 20}],
                    jeudi: [{from: 8, to: 20}],
                    vendredi: [{from: 8, to: 20}],
                    samedi: [{from: 8, to: 20}],
                    dimanche: [{from: 8, to: 20}]

                }
            },
            {
                nom: "Fermé tout le temps",
                type: ["Brasserie", "Pizzeria"],
                ambiance: "Familiale",
                service: "Parking",
                description: "Le classique",
                note: [3, 5, 4],
                ouvert: true,
                horaires: {
                    lundi: [],
                    mardi: [],
                    mercredi: [],
                    jeudi: [],
                    vendredi: [],
                    samedi: [],
                    dimanche: []

                }
            }

        ];
        Restaurants.create(starterRestaurants, function (err, results) {

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(results);
        });
    });
}