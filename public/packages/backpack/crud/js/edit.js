/*
*
* Backpack Crud / Edit
*
*/

jQuery(function($){

    'use strict';

    const hiddenPublished = $('input[type=hidden][name=published]');
    const checkboxPublished = $(hiddenPublished).siblings('input[type=checkbox]');

    $(checkboxPublished).on('change', function() {
        $(".col-sm-12.published-warning").remove();

        if ($(this).prop('checked')) {
            $(this)
                .parent()
                .parent()
                .parent()
                .append('<div class="col-sm-12 published-warning"><div class="alert alert-danger alert-dismissible"> \
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> \
                    <h4><i class="icon fa fa-ban"></i> This action is permanent.</h4> \
                After clicking "Save", Job Posters cannot be unpublished. \
            </div ></div>');
        }
    });
});
