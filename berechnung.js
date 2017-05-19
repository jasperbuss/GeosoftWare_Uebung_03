// Pfeiffer, Philipp: 421620
// Buß, Jasper: 430423
window.onload = function() {

    // Init
    var pointArray = new Array(0);
    var lineArray = new Array(0);
    var resultString = new Array(0);
    var distanceTotal = 0;


    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {


            splitInputInRows(reader.result);

            for (var i = 0; i < pointArray.length - 1; i += 2) { // running through the point-array
                lineArray.push(pointArray[i], pointArray[i + 1]); // and creating lines between the points
            }
            // in the lineArray, there are all line-Objects saved


            for (var i = 0; i < lineArray.length - 1; i++) {
                var dist = distance(lineArray[i], lineArray[i + 1]);
                distanceTotal += dist // the total distance is calculated from all line-length
                resultString.push("\n between the Point: " + (i + 1) + " and " + (i + 2) + " is the Distanze = " + dist + "km")
                if (i == lineArray.length - 2) {
                    resultString.push(" \n ========================================= \n The Distanze for this Polygon is " + distanceTotal + "km")
                }
            }


            fileDisplayArea.innerText = resultString;

            resultString = new Array(0);
            pointArray = new Array(0);
            lineArray = new Array(0);
            distanceTotal = 0;

        }

        reader.readAsText(file);
    });


    //This function split the Input-File in Rows
    function splitInputInRows(file) {
        var lines = file.split('\n');


        if (lines[0] == "") { // are the file empty?
           fileDisplayArea.innerText = "---> The File is empty!! <---";
            abort("The File is empty");
        } else if (lines.length == 1) { // are just one coordinate in the file?
            fileDisplayArea.innerText = "---> There are just one point-coordinate in the file!! <---";
            abort("There are just one point-coordinate in the file");

        }


        for (var i = 0; i < lines.length; i++) {
            if (!lines[i].startsWith("//")) { // ignore lines with "//"
                try {
                    var firstArray = lines[i].split(", "); // split the lines at each ", "
                    var secondArray = firstArray[1].split(" "); // split the line again
                } catch (error) {
                    "It´s a Error: " + error.message
                }
                pointArray.push([firstArray[0], secondArray[0]]); // saving the coordinates in an array
            }
        }
        if (pointArray.length == 0) { // are coordinates in the file?
            alert("there are none coordinates in the file!!"); // give a alert if there were none
        }

    }

    //Given code from Stackoverflow http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    function distance(point1, point2) {
        var lat1 = point1[0];
        var long1 = point1[1];
        var lat2 = point2[0];
        var long2 = point2[1];
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(long2 - long1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var dist = R * c; // Distance in km
        dist = Math.round(dist * 100) / 100
        return dist;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    // Breaks js
    function abort(massage)
{
   throw new Error("We'll break this off, because: " + massage);
}


}
