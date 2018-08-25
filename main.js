/*
MIT License

Copyright (c) 2018 Antwaun Tune

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

window.onload = function() {
    var Button = document.getElementById("clickButton");
    var pingText = document.getElementById("pingText");
    var avgText = document.getElementById("avgPing");
    var pings = [];
    var p = new Ping();

    function ping(SERVER) {
        p.ping("http://" + SERVER, function(err, data) {
            ping = data;
            var totalPings = 0;
            pingText.textContent = ping + " ms";
            pings.push(ping);
            for (var i = 0; i < pings.length; i++) {
                totalPings += pings[i];
            }
            var avgPing = Math.round(totalPings / pings.length);
            avgText.textContent = "Average Ping: " + avgPing;
            if (err) {}
        });
        google.charts.load('current', {
            packages: ['corechart', 'line']
        });
        google.charts.setOnLoadCallback(drawBackgroundColor);

        function drawBackgroundColor() {
            var data = new google.visualization.DataTable();
            data.addColumn('number');
            data.addColumn('number');
            for (var i = 0; i < pings.length; i++) {
                data.addRows([
                    [pings[i], new Date().getSeconds()]
                ]);
            }


            var options = {
                hAxis: {
                    title: 'Ping'
                },
                vAxis: {
                    title: 'Seconds'
                },
                backgroundColor: '#f1f8e9'
            };

            var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    }

    function NAstartPinging() {
        clearInterval(interval);
        var interval = setInterval(function() {
            ping("104.160.131.3")
        }, 1);
    }

    Button.addEventListener('click', NAstartPinging, false)
}
