/**
 * Created by mafessel on 19/04/2017.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
    id: Number,
    nom: String,
    type: [String],
    ambiance: String,
    service: String,
    description: String,
    note: [Number],
    ouvert: Boolean,
    horaires: {
        lundi: [{from: Number, to: Number}],
        mardi: [{from: Number, to: Number}],
        mercredi: [{from: Number, to: Number}],
        jeudi: [{from: Number, to: Number}],
        vendredi: [{from: Number, to: Number}],
        samedi: [{from: Number, to: Number}],
        dimanche: [{from: Number, to: Number}]

    }
})

var Restaurants = mongoose.model('Restaurants', restaurantSchema);

module.exports = Restaurants