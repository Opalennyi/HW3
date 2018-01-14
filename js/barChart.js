/** Class implementing the bar chart view. */
class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor(worldMap, infoPanel, allData) {
        this.worldMap = worldMap;
        this.infoPanel = infoPanel;
        this.allData = allData;
        this.d = 0;
    }

    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */
    updateBarChart(selectedDimension) {

        let newData = this.allData.map(function (d) {
            return {
                'year': d.year, 'value': d[selectedDimension]
            };
        });

        var width = 500, height = 400, paddingLeft = 65;


        // ******* TODO: PART I *******


        // Create the x and y scales; make
        // sure to leave room for the axes

        var x = d3.scaleBand()
            .range([width, paddingLeft])
            .padding(0.1)
            .domain(newData.map(d => d.year));

        var y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(newData, d => d.value)]);

        // Create colorScale

        var color = d3.scaleLinear()
            .domain([d3.min(newData, d => d.value),
                d3.max(newData, d => d.value)])
            .range(['#4682B4', '#191970']);

        // Create the axes (hint: use #xAxis and #yAxis)

        this.d = 1000;

        d3.select('#xAxis')
            .style("fill", "none")
            .style("stroke", "black")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("y", 0)
                .attr("x", -43)
                .attr("dy", ".35em")
                .attr("transform", "rotate(270)")
                .style("text-anchor", "start");

        d3.select('#yAxis')
            .style("fill", "none")
            .style("stroke", "black")
            .attr("transform", "translate("+paddingLeft+",0)")
            .call(d3.axisLeft(y));

        // Create the bars (hint: use #bars)

        var appending = d3.select('#bars')
            .selectAll('rect')
            .data(newData);
        appending.exit().remove();

        appending = appending.enter()
            .append('rect')
            .merge(appending)
            .transition()
            .duration(this.d)
            .style("fill", function(d){
                return color(d.value);
            })
            .attr("y", function(d) {
                return y(d.value);
            })
            .attr("x", function(d) {
                return x(d.year);
            })
            .attr("height", function (d) {
                return height - y(d.value);
            })
            .attr("width", x.bandwidth());




        // ******* TODO: PART II *******

        // Implement how the bars respond to click events
        // Color the selected bar to indicate is has been selected.
        // Make sure only the selected bar has this new color.

        // Call the necessary update functions for when a user clicks on a bar.
        // Note: think about what you want to update when a different bar is selected.

        var ad = this.allData;
        var map = this.worldMap;
        var info = this.infoPanel;
        var worldcupData = {a:'sdds'};
        d3.select('#bars')
            .selectAll('rect')
            .on("click", function (d, i) {
                d3.select('#bars')
                    .selectAll('rect')
                    .style("fill", function(d){
                        return color(d.value);
                    });

                d3.select(this)
                    .style("fill", "red");

                worldcupData = ad.find(function (d) {
                    return d.year === ad[i].year;
                });
                map.updateMap(worldcupData);
                info.updateInfo(worldcupData);
            });

    }

    /**
     *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
     *
     *  There are 4 attributes that can be selected:
     *  goals, matches, attendance and teams.
     */
    /*chooseData() {
        // ******* TODO: PART I *******
        //Changed the selected data when a user selects a different
        // menu item from the drop down.

    }*/
}