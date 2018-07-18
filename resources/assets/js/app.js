// =============================================================================

    // Utilities JavaScript (jQuery)

// =============================================================================

(function($) {

    // Add isValid()

        $.fn.isValid = function(){
            return this[0].checkValidity()
        }

    $(document).ready(function() {

        // Form Handlers =======================================================

            // Required Fields

                $("input:required, textarea:required").each(function(e) {
                    $(this).parent().addClass("required");
                    $(this).parent().find("label").append("<span class='form__required'><i class='fa fa-asterisk' aria-label='Asterisk'></i></span>");
                });

            // Label Handers ===================================================

                $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusin(function(e) {
                    $(this).parent().addClass("active");
                });

                $("[class*='form__input-wrapper'] input, [class*='form__input-wrapper'] textarea").focusout(function(e) {

                    // Check for existing value.

                        if ($(this).val() == "") {
                            $(this).parent().removeClass("active");
                        }

                    // Check Validity

                        if ($(this).isValid() == true) {

                            if ($(this).val() == "" || $(this).attr("type") == "password") {
                                $(this).parent().removeClass("valid");
                                $(this).parent().removeClass("invalid");
                            }
                            else {
                                $(this).parent().addClass("valid");
                                $(this).parent().removeClass("invalid");
                            }

                        }
                        else {

                            if ($(this).attr("type") == "password") {
                                return false;
                            }
                            else {
                                $(this).parent().addClass("invalid");
                                $(this).parent().removeClass("valid");
                            }

                        }

                });

    });

})(jQuery);
