var SliderAPI = {
    multi_btn_group_width:112, //width in em
    selectOption : function(parentElementId,optionNum){
        var parentElement = document.getElementById(parentElementId);
        parentElement.style.left = SliderAPI.multi_btn_group_width * optionNum + "px";
    },
    selectOptionByValue : function(groupName, selectedValue, sliderId){
        //console.log(groupName);
        //get radio group collection
        var group = document.getElementsByName(groupName);
        
        //get slider overlay div
        var slider = document.getElementById(sliderId);
        //iternate through group
        for(var g = 0; g < group.length; g++){
            var option = group[g];
            option.checked = false;
            //if radio button value = data driven value or selected value change slider style to the option index and ensure it is checked.
            console.log(option.value === selectedValue);
            if(option.value === selectedValue) {
                option.checked = true;
                slider.className = 'option'+g;
            }
        }
    }
};