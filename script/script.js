$(function(){
    $(".tool-list-wrapper").click(function() {
       $tool = $(this).find('.toollist');
       $button = $(this).find('.tool-button');
       $header = $(this).find('.tool-header-wrapper');
       console.log($tool);
       if($tool.hasClass('open-toollist')) {
           //$tool.slideUp();
           $tool.removeClass('open-toollist');
           $header.removeClass('tool-header-open');
           $button.text('+');
           
       } else {
           //$tool.slideDown();
           $tool.addClass('open-toollist');
           $header.addClass('tool-header-open');
           $button.text('-');
          
       }
    });
});