function property_type_city(duration) {

    var svg_width = $('#f3_svg').width();
    // $('#f3_svg').height(svg_width * 0.57);
    var svg_height = $('#f3_svg').height();

    // // Get page X,Y position of the container
    // var ctn_top = $("#f3_fg_container").offset().top;
    // var ctn_left = $("#f3_fg_container").offset().left;

    //Width and height
    // var margin = { top: svg_height * 0.24, right: svg_width * 0.15, bottom: svg_height * 0.07, left: svg_width * 0.17 };

    var rScale = d3.scaleLinear();

    var rColScale = d3.scaleOrdinal()
        .range(["SlateBlue", "CornflowerBlue", "LightSteelBlue"]);
    var stColScale = d3.scaleOrdinal()
        .range(["DarkSlateBlue", "RoyalBlue", "#9094ce"]);

    // var x1 = margin["left"],
    //     x2 = margin["left"] + (svg_width - margin["left"] * 2) / 2,
    //     x3 = margin["left"] + (svg_width - margin["left"] * 2) / 3,
    //     x4 = margin["left"] + (svg_width - margin["left"] * 2) / 3 * 2,
    //     x5 = svg_width - margin["right"],
    //     y1 = margin["top"],
    //     y2 = (margin["top"] + svg_height - margin["bottom"]) / 1.9,
    //     y3 = svg_height - margin["bottom"]
    //     ;

    var center = d3.forceCenter().x(svg_width / 2 - svg_width / 16).y(svg_height / 2);

    d3.select("#f3_svg").append("g").attr("class", "f3_g f3_property");
    d3.select("#f3_svg").append("g").attr("class", "f3_g f3_city_property");

    function data_viz_all(durations, pnt_evnt) {
        d3.csv(property_type_csv, function (data) {
            rScale.range([0, svg_width / 5.3]);
            var maxCntSqrt = Math.sqrt(d3.max(data, function (d) { return parseInt(d.count); }));
            rScale.domain([0, maxCntSqrt]);

            var force = d3.forceSimulation()
                .force("center", center)
                .alpha(0.3)
                .alphaDecay(0.02)
                .force("y", d3.forceY(svg_height / 2).strength(0.08))
                .force("x", d3.forceX(d => rScale(Math.sqrt(d.count)) + svg_width / 16).strength(0.08))
                .force("collision", d3.forceCollide(d => rScale(Math.sqrt(d.count)) + 1))
                .nodes(data)
                .on("tick", updateNetwork)
                ;

            var tooltip = d3.select("#f3_tooltip");
            var property = d3.select(".f3_property");

            create_circles(data, property, force, durations, pnt_evnt, "all");

            function updateNetwork() {
                property.selectAll(".f3_circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);

                property.selectAll(".f3_circle-text")
                    .attr("x", d => d.x)
                    .attr("y", d => d.y);
            }
        });
    };

    function on_off_nav(switchTo) {
        d3.select("#viz-navigation_f3")
            .style("pointer-events", switchTo);
    }

    function change_to_viz_all(durations, pnt_evnt) {

        // Temporarily unenable mouse-event on navigation button to avoid viz mulfunction
        if (durations["short"] != 0 && pnt_evnt == "auto") {
            on_off_nav("none")
            d3.selectAll(".f3_circle")
                .style("pointer-events", "none");
            d3.timeout(function () {
                on_off_nav("auto");
                d3.selectAll(".f3_circle")
                    .style("pointer-events", "auto");
            }, durations["middle"]);
        };

        d3.select("#f3_nav-all")
            .transition()
            .duration(durations["middle"])
            .attr("class", "selected");
        d3.select("#f3_nav-city")
            .transition()
            .duration(durations["middle"])
            .attr("class", "");
        d3.selectAll(".f3_circle")
            .transition()
            .duration(durations["middle"])
            .style("opacity", "0")
            .attr("stroke-width", 0)
            .remove();
        d3.selectAll(".f3_city_names")
            .transition()
            .duration(durations["short"])
            .remove();
        d3.selectAll(".f3_circle-text")
            .transition()
            .duration(durations["short"])
            .remove();
        data_viz_all(durations, pnt_evnt);
    };

    function data_viz_city(durations, pnt_evnt) {

        d3.csv(property_type_city_csv, function (data) {
            rScale.range([0, svg_width / 16]);
            var maxCntSqrt = Math.sqrt(d3.max(data, function (d) { return parseInt(d.count); }));
            rScale.domain([0, maxCntSqrt]);

            var center = d3.forceCenter().x(svg_width / 2 - svg_width / 16).y(svg_height * 0.6);

            var tooltip = d3.select("#f3_tooltip");
            var property = d3.select(".f3_city_property");

            var force_city = d3.forceSimulation()
                .nodes(data)
                .force("collision", d3.forceCollide(d => rScale(Math.sqrt(d.count)) + 1.5).strength(.7))
                .force("xAxis", d3.forceX(function (d) { return xyScale[d.city][0]; }).strength(0.5))
                .force("yAxis", d3.forceY(function (d) { return xyScale[d.city][1]; }).strength(0.5))
                .force("center", center)
                .alpha(0.2)
                .alphaDecay(0.03)
                // .velocityDecay(0.5)
                .on("tick", updateNetwork)
                ;

            create_circles(data, property, force_city, durations, pnt_evnt, "city");

            function updateNetwork() {

                property.selectAll(".f3_circle")
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);

                property.selectAll(".f3_circle-text")
                    .attr("x", d => d.x)
                    .attr("y", d => d.y);
            }

        });

    };

    function mouse_on(this_elem, x, y) {

        d3.select(this_elem)
            .transition()
            .duration(250)
            .attr("stroke", "FireBrick")
            .attr("stroke-width", svg_width > 500 ? 4 : 2)
            .style("fill", "OrangeRed");

        d3.select("#f3_tooltip")
            .style("left", x + "px")
            .style("top", y + "px")
            .select("#value")
            .html(this_elem.__data__.property_type + ": " + d3.format(",")(this_elem.__data__.count))
            ;
        d3.select("#f3_tooltip").classed("hidden", false);
    };

    function mouse_off(this_elem) {

        d3.select(this_elem)
            .transition()
            .duration(250)
            .style("fill", (d, i) => rColScale(d.property_type))
            .attr("stroke", (d, i) => stColScale(d.property_type))
            .attr("stroke-width", svg_width > 500 ? 1.5 : 1)
            ;

        d3.select("#f3_tooltip").classed("hidden", true);

    };

    function create_circles(data, property, force, durations, pnt_evnt, d_type) {

        var circle = property.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) { return d_type == "all" ? "f3_circle" : "f3_circle f3_crcl_" + d.city.replace(/\s/g, '') })
            .attr("id", function (d) { return "f3_crcl_" + d.property_type.replace(/\s/g, '') })
            .style("pointer-events", pnt_evnt)
            .style("fill", (d, i) => rColScale(d.property_type))
            .attr("stroke", (d, i) => stColScale(d.property_type))

            .on("mousemove", function (d) {
            })
    }
} 
