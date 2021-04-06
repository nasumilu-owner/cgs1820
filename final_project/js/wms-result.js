$(document).ready(function() {
    var figure = $('#wms-image');
    $img = $(figure).find('img');
    var loadingImg = new Image();
    loadingImg.src = 'images/loading.gif';

    if($img) {
        //$img.css('width', '50px');
        $img.attr('src', loadingImg.src);


        var urlParams = new URLSearchParams(location.search);
        var wms = 'https://map.nasumilu.com/wms?service=WMS&request=getmap';
        wms += '&version=' + urlParams.get('wms[version]');
        wms += '&layers='+urlParams.getAll('wms[layers][]').join();
        var styles = [];
        urlParams.getAll('wms[layers][]').forEach(function(value, key) {
            var style_key = 'wms[styles]['+value+'][]';
            styles.push(urlParams.get(style_key));
        });
        wms += '&styles=' + styles.join();
        wms += '&crs=' + urlParams.get('wms[crs]');
        wms += '&width=' + urlParams.get('wms[width]');
        wms += '&height=' + urlParams.get('wms[height]');
        wms += '&transparent=' + urlParams.get('wms[transparent]');
        if(urlParams.has('wms[bgcolor]')) {
            wms += '&bgcolor=0x' + urlParams.get('wms[bgcolor]');
        }
        wms += '&format=' + urlParams.get('wms[format]');
        var bbox = [];
        ['minx', 'miny', 'maxx', 'maxy'].forEach(function(value) {
            bbox.push(urlParams.get('wms[bbox]['+value+']'));
        });
        wms += '&bbox=' + bbox.join();
    
        var caption = figure.find('figcaption');
        var wmsImg = new Image();
        wmsImg.onerror = function(evt) {
            console.log(evt);
            $img.attr('src', 'images/wms-placeholder-error.png');
            caption.html('An error has occured!')
        };
        wmsImg.onload = function() {
            $img.attr('src', wmsImg.src);
            caption.html(urlParams.get('wms[caption]'));
        };
        $img.css('width', '300px');
        wmsImg.src = wms;
        $('#wms-resource').attr('href',wmsImg.src);
    }
});