/**
 * Created by mafessel on 19/04/2017.
 */
let Restaurants = require('../models/restaurant');
let bodyParser = require('body-parser');

let jourDeLaSemaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    /*
     Donne tout les restaurants.

     */
    app.get('/restaurants', function (req, res) {
        Restaurants.find({}, function (err, restaurants) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(restaurants);
        });
    });

    /*
     Donne tout les restaurants ouverts à l'heure actuelle
     */
    app.get('/restaurants/ouvert', function (req, res) {

        let d = new Date();
        let weekday = d.getDay();
        let jour = jourDeLaSemaine[weekday - 1];
        let hour = d.getHours();
        let journ1 = "horaires." + jour + ".to";
        let journ2 = "horaires." + jour + ".from";


        let query1 = {};
        let query2 = {};
        query1[journ1] = {$gte: hour};
        query2[journ2] = {$lte: hour};

        let results = {};
        let and = "$and";
        results [and] = [query1, query2];

        Restaurants.find(results, function (err, restaurants) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(restaurants);
        });//.
    });

    /*
     Donne la liste des restaurant correspondant à la recheche
     @params: nom

     exemple : /restaurants/searchNom?nom=cochon
     */
    app.get('/restaurants/searchNom', function (req, res) {

        let nom = req.query.nom;

        Restaurants.find({'nom': new RegExp(nom, 'i')}, {sort: {nom: 1}}, function (err, restaurants) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(restaurants);
        });
    });


    /*
     Donne le restaurant correspondant à l'id donné
     @params: id (obligatoire)
     */
    app.get('/restaurant/:id', function (req, res) {
        Restaurants.find({
            _id: req.params.id
        }, function (err, restaurant) {
            if (err) throw err;
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(restaurant);

        });
    });


    /*
     Donne la liste des restaurant correspondant à la recherche
     @params: ambiance (optionnal)
     @params: service (optionnal)
     @params: description (optionnal)
     @params: nom (optionnal)
     @params: ouvert (optionnal)
     exemple : /restaurants/recherche?service=Parking&ambiance=familiale
     */
    app.get('/restaurants/recherche', function (req, res) {

        let ambiance = req.query.ambiance;
        let service = req.query.service;
        let description = req.query.description;
        let nom = req.query.nom;
        let ouvert = req.query.ouvert;

        let requeteMongo = {};

        if (typeof ambiance !== 'undefined') {
            requeteMongo.ambiance = ambiance;
        }
        if (typeof service !== 'undefined') {
            requeteMongo.service = service;
        }
        if (typeof description !== 'undefined') {
            requeteMongo.description = description;
        }
        if (typeof nom !== 'undefined') {
            requeteMongo.nom = nom;
        }
        if (typeof ouvert !== 'undefined') {
            requeteMongo.ouvert = ouvert;
        }

        Restaurants.find(requeteMongo

            , function (err, restaurant) {
                if (err) throw err;
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.send(restaurant);

            });
    });


}