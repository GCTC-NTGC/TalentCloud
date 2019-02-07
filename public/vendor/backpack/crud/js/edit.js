/*
*
* Backpack Crud / Edit
*
*/

jQuery(function($){

    'use strict';

    $('input[type=checkbox][name=published]').on('change', function() {
        $(".alert.alert-danger.alert-dismissible").remove();

        if ($(this).prop('checked')) {
            $(this)
                .parent()
                .parent()
                .append('<div class="alert alert-danger alert-dismissible"> \
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> \
                    <h4><i class="icon fa fa-ban"></i> This action is permanent.</h4> \
                After clicking "Save", Job Posters cannot be unpublished. \
            </div >');
        }
    });
});
