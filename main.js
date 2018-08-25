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
