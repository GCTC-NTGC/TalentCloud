var SliderAPI = {
    multi_btn_group_width:112, //width in em
    selectOption : function(parentElementId,optionNum){
        var parentElement = document.getElementById(parentElementId);
        parentElement.style.left = SliderAPI.multi_btn_group_width * optionNum + "px";
    }
};

SliderAPI.buildSlider = function(containerId){
    var container = document.getElementById(containerId);
};
