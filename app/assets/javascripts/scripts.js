$(document).ready(function(){
    var socket = io.connect("http://localhost:8000", {force_connection: true});
    $('form').submit(function(){
        $.post($(this).attr('action'),$(this).serialize(),function(res){},"json");
        socket.emit('voting');
        return false;
    });
    socket.on('new_votes',function(data){
        console.log(data.message);
        $.get('/all',  function(res){
            var php_vote = res[0].php;
            var js_vote = res[0].javascript;
            var ruby_vote = res[0].ruby;
            var chart = $('#container').highcharts();
            chart.series[0].data[0].update(php_vote);
            chart.series[0].data[1].update(js_vote);
            chart.series[0].data[2].update(ruby_vote);
        });
    });
    $.get('/all',  function(res){
        var php_vote = res[0].php;
        var js_vote = res[0].javascript;
        var ruby_vote = res[0].ruby;
        //generate chart with voting data
        $(function () {
            $('#container').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Realtime Voting Results'
                },
                tooltip: {
                    pointFormat: '{series.data.name}: {point.percentage:.1f}%'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'PHP',
                        y: php_vote
                    }, {
                        name: 'Javascript',
                        y: js_vote
                    }, {
                        name: 'Ruby',
                        y: ruby_vote
                    }]
                }]
            });
        });
    });
});
