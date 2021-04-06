$(document).ready(function() {
    
    $('#wms-format').change(function(evt) {
        var format = $(this).val();
        var $bgcolor = $('#wms-bgcolor');
        var $transparent = $('#wms-transparent');
        if(format === 'image/png' || format === 'image/gif' || format === 'image/svg') {
            $bgcolor.attr('disabled', 'disabled');
            $transparent.find('input:radio').each(function(index, ele) {
                $(ele).removeAttr('disabled');
            });
            $transparent.find('#wms-transparent-true').attr('checked', 'checked');
        } else {
            $bgcolor.removeAttr('disabled');
            $transparent.find('input:radio').each(function(index, ele) {
                var $ele = $(ele);
                $ele.attr('disabled', 'disabled');
                $ele.prop('checked', false);
            });
        }
    });

    $('#wms-transparent').find('input:radio').each(function(index, ele) {
        $(ele).on('click', function(evt) {
            $ele = $(this);
            $bgcolor = $('#wms-bgcolor');
            if($ele.val() === 'false') {
                $bgcolor.removeAttr('disabled');
            } else {
                $bgcolor.attr('disabled', 'disabled');
            }
        });
    });

    $('#wms-layers').find('input:checkbox').each(function(index, ele) {
        $(ele).change(function(evt) {
            $ele = $(this);
            $style = $('#'+$ele.data('style'));
            var enabled = $ele.prop('checked');
            if(enabled) {
                $style.show();
                $('#'+$style.data('default_style')).prop('checked', true);
            } else {
                $style.hide();
                $style.find('input:checked').prop('checked', false);
            }
        });
    });
});