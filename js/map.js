/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor() {
        this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    }

    /**
     * Function that clears the map
     */
    clearMap() {

        // ******* TODO: PART V*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes on and off here.

        var map = d3.select('#map');
        map.selectAll('.countries')
            .attr('class', 'countries');
        map.selectAll('.host')
            .attr('class', 'countries');
        map.selectAll('.team')
            .attr('class', 'countries');

    }

    /**
     * Update Map with info for a specific FIFA World Cup
     * @param wordcupData the data for one specific world cup
     */
    updateMap(worldcupData) {

        //Clear any previous selections;
        this.clearMap();

        // ******* TODO: PART V *******

        var proj = this.projection;
        var path = d3.geoPath().projection(this.projection);

        // Add a marker for the winner and runner up to the map.

        // Hint: remember we have a conveniently labeled class called .winner
        // as well as a .silver. These have styling attributes for the two
        // markers.

        worldcupData.teams_iso.forEach(function (team, i, arr) {
            d3.select('#'+ team)
                .attr('class', 'team');
        });

        // Select the host country and change it's color accordingly.

        d3.select('#'+ worldcupData.host_country_code)
            .attr('class', 'host');

        // Iterate through all participating teams and change their color as well.

        // We strongly suggest using CSS classes to style the selected countries.


        d3.select('#points').select('.gold')
            .attr("r", "8")
            .attr("transform", "translate(" + proj([worldcupData.win_pos[0], worldcupData.win_pos[1]]) + ")");

        d3.select('#points').select('.silver')  
            .attr("r", "8")
            .attr("transform", "translate(" + proj([worldcupData.ru_pos[0], worldcupData.ru_pos[1]]) + ")");

        // Add a marker for gold/silver medalists
    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(world) {

        //(note that projection is a class member
        // updateMap() will need it to add the winner/runner_up markers.)

        // ******* TODO: PART IV *******

        var map = d3.select('#map');

        // Draw the background (country outlines; hint: use #map)
        // Make sure and add gridlines to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's .id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

        var path = d3.geoPath().projection(this.projection);
        var countries = topojson.feature(world, world.objects.countries).features;

        map.selectAll('.countries')
            .data(countries)
            .enter()
            .append('path')
            .attr('id', function (d) { return d.id;})
            .attr('class', 'countries')
            .attr('d', path);

        map.append('path')
            .datum(d3.geoGraticule())
            .attr('class', 'grat')
            .attr('d', path);

        d3.select('#points').append('circle').attr('class', 'gold');
        d3.select('#points').append('circle').attr('class', 'silver');

    }


}
