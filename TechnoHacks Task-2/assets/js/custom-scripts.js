(function($) {
  "use strict";
  
    $.fn.andSelf = function() {
      return this.addBack.apply(this, arguments);
    }
      $(window).on("load", function() { 
          $(".section-loader").fadeOut("slow");
          
          var $container = $('.portfolioContainer');
          $container.isotope({
              filter: '*',
              animationOptions: {
                  queue: true
              }
          });
       
          $('.portfolio-nav li').click(function(){
              $('.portfolio-nav .current').removeClass('current');
              $(this).addClass('current');
       
              var selector = $(this).attr('data-filter');
              $container.isotope({
                  filter: selector,
                  animationOptions: {
                      queue: true
                  }
               });
               return false;
          });
        });

    
    var trigger = $('.navbar-toggler'),
      overlay     = $('.overlay'),
      navc     = $('.navbar-collapse'),
      active      = false;
  

      $('.navbar-toggler, .navbar-nav li a, .overlay').on('click', function () {
          $('.navbar-toggler').toggleClass('active')
          overlay.toggleClass('active');
          navc.toggleClass('active');
      });  
      
        
      $('#mh-header').onePageNav({
          currentClass: 'active', 
          changeHash: false,
          scrollSpeed: 750,
          scrollThreshold: 0.5,
      });
    
 
      $("[data-fancybox]").fancybox({});
      
      
    	var wow = new WOW({
          mobile: false  
      });
      wow.init();
      
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $(".nav-scroll").addClass("nav-strict");
        } else {
            $(".nav-scroll").removeClass("nav-strict");
        }
    });
       
    $(".determinate").each(function(){
      var width = $(this).text();
      $(this).css("width", width)
        .empty()
        .append('<i class="fa fa-circle"></i>');                
    });

    $('#portfolio-item').mixItUp();
    

        
      $("#contactForm").validator().on("submit", function (event) {
          if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
          } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
          }
       });
    
        function submitForm(){
          var name = $("#name").val();
          var email = $("#email").val();
          var message = $("#message").val();
          $.ajax({
              type: "POST",
              url: "process.php",
              data: "name=" + name + "&email=" + email + "&message=" + message,
              success : function(text){
                  if (text == "success"){
                      formSuccess();
                    } else {
                      formError();
                      submitMSG(false,text);
                    }
                }
            });
        }
        function formSuccess(){
            $("#contactForm")[0].reset();
            submitMSG(true, "Message Sent!")
        }
    	  function formError(){   
    	    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
    	        $(this).removeClass();
    	    });
    	  }
        function submitMSG(valid, msg){
          if(valid){
            var msgClasses = "h3 text-center fadeInUp animated text-success";
          } else {
            var msgClasses = "h3 text-center shake animated text-danger";
          }
          $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        }
    

    
}(jQuery));
