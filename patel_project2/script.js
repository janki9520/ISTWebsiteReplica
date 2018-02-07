$(document).ready(function(){

    // browser detection
    //Check if browser is IE
    if (navigator.userAgent.search("MSIE") >= 0) {
      //if IE lower than 7 then redirect to download mozilla firefox
      if($.browser.versionNumber <=7){
        alert("You are using old IE browser. We will redirect you to latest browser");
        window.location.href = "https://www.mozilla.org/en-US/firefox/new/";
      } else {
         alert("You are using IE: " + $.browser.versionNumber);
      }
    }
    //Check if browser is Chrome
    else if (navigator.userAgent.search("Chrome") >= 0) {
      alert("You are using Chrome: " + $.browser.versionNumber);
    }
    //Check if browser is Firefox 
    else if (navigator.userAgent.search("Firefox") >= 0) {
       alert("You are using Firefox: " + $.browser.versionNumber);
    }
    //Check if browser is Safari
    else if (navigator.userAgent.search("Safari") >= 0) {
        alert("You are using Safari: " + $.browser.versionNumber);
    }
    //Check if browser is Opera
    else if (navigator.userAgent.search("Opera") >= 0) {
        alert("You are using Opera: " + $.browser.versionNumber);
    }
    


		//animate navigation bar on scroll
	  window.sr = new ScrollReveal();
	  sr.reveal('#degreesDiv');
	  sr.reveal('#employmentDiv');
	  sr.reveal('#peopleDiv');
	  sr.reveal('#resourcesDiv');
	  sr.reveal('#newsDiv');
	  sr.reveal('#contactDiv');


		// grab the initial top offset of the navigation 
	  var stickyNavTop = $('nav').offset().top;
		// our function that decides whether the navigation bar should have "fixed" css position or not.
		var stickyNav = function(){
		var scrollTop = $(window).scrollTop(); // our current vertical position from the top
						 
		// if we've scrolled more than the navigation, change its position to fixed to stick to top,
		// otherwise change it back to relative
		if (scrollTop > stickyNavTop) { 
			 $('nav').addClass('sticky');
			 } else {
				$('nav').removeClass('sticky'); 
			 }
				};

			stickyNav();
			// and run it again every time you scroll
			$(window).scroll(function() {
					stickyNav();
			});

	   //applying tabs plugin to resources section
	   $('.tabs').tabslet();

		//applying anchor scroll plugin ease motion when clicking on anchor reference links
	   $('.link-scroll').anchorScroll({
		  scrollSpeed: 850, // scroll speed
		  offsetTop: 0, // offset for fixed top bars
	   });
	  

	  //toggle function for Faculty vs Staff
	   $("#fac-link").on("click", function(e){
		   $("#staff-grid").hide(); //when faculty button is clicked -> hide the staff content
		   $("#faculty-grid").fadeIn(); //fade faculty content

		   $("#staff-link").removeClass("selected"); //remove 'selected' styles from the staff link
		   $("#fac-link").addClass("selected"); //apply to faculty

	   });

	   $("#staff-link").on("click", function(e){
		   $("#faculty-grid").hide(); //when staff button is clicked -> hide the faculty content
		   $("#staff-grid").fadeIn(); //fade staff content

		   $("#fac-link").removeClass("selected"); // remove 'selected' styles from the staff link
		   $("#staff-link").addClass("selected"); //apply to faculty
	   });

	   //toggle function for the News section for this year vs older stories
	   $("#year-link").on("click", function(e){
		   $("#older-content").hide(); //when year link is selected ->hide the older stories
		   $("#year-content").fadeIn(); //fade in stories from this year

		   $("#older-link").removeClass("selected"); //remove 'selected' styles for the older stories link
		   $("#year-link").addClass("selected"); //apply to this year link

	   });

	   $("#older-link").on("click", function(e){
		   $("#year-content").hide(); //when older stories link is selected -> hide the stories from this year
		   $("#older-content").fadeIn(); //fade in older stories

		   $("#year-link").removeClass("selected"); //remove 'selected' styles for this year stories link
		   $("#older-link").addClass("selected"); //apply to older stories link
	   });


	  
	  // fetch api data for the about section div 
	  //about div contains title, description, author and quote 
	  xhr('get',{path:'/about/'},'#aboutDiv').done(function(json){
		  var x="<h2 class='lightHeading'>"+json.title+"</h2>";
		  x+="<p class='lightBody'>"+json.description+"</p>";
		  x+="<p class='quoteObj'><i class='fa fa-quote-left' aria-hidden='true' style='color:#f78b35;margin-left:5px;font-size:22px;'></i>"+" "+json.quote+" "+"<i class='fa fa-quote-right' aria-hidden='true' style='color:#f78b35;margin-right:5px;font-size:22px;'></i></p>";
		  x+="<p class='authorObj'>"+"- "+json.quoteAuthor+"</p>";
		  $('#aboutDiv').html(x);
	  });

	  
	  //fetch api data for undergraduate degrees
	  //iterate through the info to create each block for each degrees
	  //assign specific symbol to specific degree
	  xhr('get',{path:'/degrees/undergraduate/'},'#ug-grid').done(function(json){
		var symbol='';
		  $.each(json.undergraduate,function(i, item){
			if(item.degreeName == 'wmc'){
			  symbol = '<i class="fa fa-globe" aria-hidden="true" style="color:#FF0066; font-size:1.5em;"></i><br/>'
			}
			else if(item.degreeName == 'hcc'){
			  symbol = '<i class="fa fa-hand-paper-o" aria-hidden="true" style="color:#FFCC99; font-size:1.5em;"></i><br/>'
			}
			else if(item.degreeName == 'cit'){
			  symbol ='<i class="fa fa-laptop" aria-hidden="true" style="color:#EE7600; font-size:1.5em;"></i><br/>'
			}
			  $('#ug-grid').append("<div class='card-flip'><div class='front'><h2 class='degreeTitle'>"+symbol+item.title+"</h2></div><div class='back'><p class='degreeDescrip'>"+item.description+"</p><p class='concentrationList'>Concentrations:<br/>"+item.concentrations+"</p></div></div>");
		})
		//apply the card flip plugin to the boxes
		$(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:true});
	  });


	  //fetch api data for graduate degrees
	  //iterate through the info to create each block for each degrees
	  //assign specific symbol to specific degree
	  xhr('get',{path:'/degrees/graduate/'},'#graduate-grid').done(function(json){
		var symbol='';
		  $.each(json.graduate,function(i, item){
			 if(item.degreeName != "graduate advanced certificates"){

			   if(item.degreeName == 'ist'){
				 symbol = '<i class="fa fa-keyboard-o" aria-hidden="true" style="color:#FF0066; font-size:1.5em;"></i><br/>'
			   }
			   else if(item.degreeName == 'hci'){
				 symbol = '<i class="fa fa-sticky-note-o" aria-hidden="true" style="color:#f39f4c; font-size:1.5em;"></i><br/>'
			   }
			   else if(item.degreeName == 'nsa'){
				 symbol = '<i class="fa fa-server" aria-hidden="true" style="color:#19198c; font-size:1.5em;"></i><br/>'
			   }
			  $('#graduate-grid').append("<div class='card-flip'><div class='front'><h2 class='degreeTitle'>"+symbol+item.title+"</h2></div><div class='back'><p class='degreeDescrip'>"+item.description+"</p><p class='concentrationList'>Concentrations:<br/>"+item.concentrations+"</p></div></div>");
			   }
		})
		//apply the card flip plugin to each degree box
		$(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:true});
	  });


	//fetch api data for minor degrees
	  xhr('get',{path:'/minors/'},'#minorsGrid').done(function(json){
		var symbol='';
		  $.each(json.UgMinors,function(i, item){
			if(item.name == 'DBDDI-MN'){
			  symbol = '<i class="fa fa-database" aria-hidden="true"></i><br/>'
			}
			else if(item.name == 'GIS-MN'){
			  symbol = '<i class="fa fa-map-marker" aria-hidden="true"></i><br/>'
			}
			else if(item.name == 'MEDINFO-MN'){
			  symbol = '<i class="fa fa-medkit" aria-hidden="true"></i><br/>'
			}
			else if(item.name=='MDDEV-MN'){
			  symbol = '<i class="fa fa-code" aria-hidden="true"></i><br/>'
			}
			else if(item.name == 'MDEV-MN'){
			  symbol = '<i class="fa fa-mobile" aria-hidden="true"></i><br/>'
			}
			else if(item.name == 'NETSYS-MN'){
			  symbol = '<i class="fa fa-sitemap" aria-hidden="true"></i><br/>'
			}
			else if(item.name == 'WEBDD-MN'){
			  symbol = '<i class="fa fa-html5" aria-hidden="true"></i><br/>'
			}
			else if(item.name == 'WEBD-MN'){
			  symbol = '<i class="fa fa-object-group" aria-hidden="true"></i><br/>'
			}
			  $('#minorsGrid').append("<a href='#"+item.name+"-popup' class='popup-minor'><div class='minors-flip'><h2 class='minor-title'>"+symbol+item.title+"</h2></div><a><div id='"+item.name+"-popup' class='white-popup-minors mfp-hide'><h2 class='dark-subhead'>Description</h2><p class='darkCopy'>"+item.description+"</p><br/><h2 class='dark-subhead'>Courses:</h2><p class='darkCopy'>"+item.courses+"</p></div>");
		})
		$('.popup-minor').magnificPopup({type:'inline', midClick: true });
	  });


	   //add in introductory employment content to the employment div section
	  xhr('get',{path:'/employment/'},'#employmentDiv').done(function(json){
		$('#employmentDiv').append("<h2 class='lightHeading'>"+json.introduction.title+"</h2>");

		$.each(json.introduction.content,function(i, item){
		  $('#employmentDiv').append("<h3 class='dark-subhead'>"+item.title+"</h3><p class='darkCopy'>"+item.description+"</p>");
		})

		//loop through the degree statistics and create a grid with each content
		$('#employmentDiv').append("<h2 class='dark-subhead'>"+json.degreeStatistics.title+"</h2><p class='darkCopy'>Hover over a number to learn more!</p>")
		$.each(json.degreeStatistics.statistics,function(i, item){
		  $('#employmentDiv').append("<div class='stat-box'><h3 class='emp-stat'>"+item.value+"</h3><br/><p class='stat-desc'>"+item.description+"</p></div>");
	  })

	  //add in the list of employers to the employment div section
	  $('#employmentDiv').append("<h2 class='dark-subhead'>"+json.employers.title+"</h2>");
	  $.each(json.employers.employerNames,function(i, item){
		$('#employmentDiv').append("<p class='employer-list'>"+item+"</p>");
	  })

	  //add in the list of careers to the employment div section
	  $('#employmentDiv').append("<h2 class='dark-subhead'>"+json.careers.title+"</h2>");
	  $.each(json.careers.careerNames,function(i, item){
		$('#employmentDiv').append("<p class='employer-list'>"+item+"</p>");
	  })

	  //create a table based on the data from the co-op table API data
	  var x="<h2 class='light-subhead'>Co-Op Table</h2><div class='table-div' id='coop-table-div'><table id='co-op' class='tablesorter'><thead><tr class='table-head'><th>Employer <i class='fa fa-sort' aria-hidden='true'></i></th><th>Degree <i class='fa fa-sort' aria-hidden='true'></i></th><th>City <i class='fa fa-sort' aria-hidden='true'></i></th><th>Term <i class='fa fa-sort' aria-hidden='true'></i></th></tr></thead><tbody>"
	  $.each(json.coopTable.coopInformation,function(i,item){
		x+="<tr><td>"+item.employer+"</td><td>"+item.degree+"</td><td>"+item.city+"</td><td>"+item.term+"</td></tr>";
	  })
	  x+="</tbody></table></div>";
	  $('#mapDiv').append(x);

	  //adding the sticky table header function and the table sorter function plugins
	  $("#co-op").tablesorter();
	  $('#co-op').stickyTableHeaders({scrollableArea: $('#coop-table-div')});


	  //create a table based on the data from the employment table API data
	  var y="<h2 class='light-subhead'>Employment Table</h2><div class='table-div' id='emp-table-div'><table id='emp' class='tablesorter'><thead><tr class='table-head'><th>Employer <i class='fa fa-sort' aria-hidden='true'></i></th><th>Degree <i class='fa fa-sort' aria-hidden='true'></i></th><th>City <i class='fa fa-sort' aria-hidden='true'></i></th><th>Start Date <i class='fa fa-sort' aria-hidden='true'></i></th></tr></thead><tbody>"
	  $.each(json.employmentTable.professionalEmploymentInformation,function(i,item){
		y+="<tr><td>"+item.employer+"</td><td>"+item.degree+"</td><td>"+item.city+"</td><td>"+item.startDate+"</td></tr>";
	  })
	  y+="</tbody></table></div>";
	  $('#mapDiv').append(y);
	  //adding sticky table header function and the table sorter function plugins
	  $("#emp").tablesorter();
	  $('#emp').stickyTableHeaders({scrollableArea: $('#emp-table-div')});
	});

		//looping through the faculty content to create a grid of faculty members
		//adding to the people section
		xhr('get',{path:'/people/faculty/'},'#peopleDiv').done(function(json){
		  $.each(json.faculty,function(i, item){
			  $('#faculty-grid').append("<div class='card-flip'><div class='front'><div class='fac-pic' style='background-image:url("+item.imagePath+")'></div><h2 class='degreeTitle'>"+item.name+"</h2></div><div class='back'><p class='degreeDescrip'><i class='fa fa-envelope-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degreeDescrip'><i class='fa fa-building-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degreeDescrip'><i class='fa fa-phone' aria-hidden='true'></i>"+" "+item.phone+"</p></div></div>");
		})
		$(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:true});
	  });

	  //loop through the staff content to create a grid of staff members
	  //add to the people section
	  xhr('get',{path:'/people/staff/'},'#peopleDiv').done(function(json){
		$.each(json.staff,function(i, item){
			$('#staff-grid-content').append("<div class='card-flip'><div class='front'><div class='fac-pic' style='background-image:url("+item.imagePath+")'></div><h2 class='degreeTitle'>"+item.name+"</h2></div><div class='back'><p class='degreeDescrip'><i class='fa fa-envelope-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degreeDescrip'><i class='fa fa-building-o' aria-hidden='true'></i>"+" "+item.office+"</p><br /><p class='degreeDescrip'><i class='fa fa-phone' aria-hidden='true'></i>"+" "+item.phone+"</p></div></div>");
	  })
	  $(".card-flip").flip({forceHeight:true,forceHeight:true,autoSize:true});
	  });

	  //create a grid of research by faculty
	  //buttons will open up as dialog popups for each category
	  xhr('get',{path:'/research/byFaculty/'}, '#research-grid').done(function(json){
	  $.each(json.byFaculty,function(i,item){
		$('#research-grid').append("<a href='#"+item.username+"-popup' class='open-popup-link'>"+item.facultyName+"</a><p><div id='"+item.username+"-popup' class='white-popup mfp-hide'>"+item.citations+"</div></p>");
	  })

	  $('.open-popup-link-contact').magnificPopup({
	  type:'inline',
	  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	  });
	  });

	  //add in the iframe for the contact form and create a button that will open the form in a popup
		$('#contact-form').append("<a href='#contact-form-popup' class='open-popup-link-contact'>Contact Form</a><div id='contact-form-popup' class='white-popup mfp-hide'><iframe src='https://ist.rit.edu/api/contactForm/' id='contact-form-id'> <p>Your browser does not support iframes.</p></iframe></div>");

	  $('.open-popup-link').magnificPopup({
	  type:'inline',
	  midClick: true
	  });

	  //create a grid of research by faculty
	  //buttons will open up as dialog popups for each category
	  xhr('get',{path:'/research/byInterestArea/'}, '#interest-grid').done(function(json){
	  $.each(json.byInterestArea,function(i,item){

		var area = item.areaName.replace(' ','_');
		$('#interest-grid').append("<a href='#"+area+"-popup' class='open-popup-link'>"+item.areaName+"</a><p><div id='"+area+"-popup' class='white-popup mfp-hide'>"+item.citations+"</div></p>");
	  })

	  $('.open-popup-link').magnificPopup({
	  type:'inline',
	  midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	  });
	  });

	  //add resources for each section
	  xhr('get',{path:'/resources/studyAbroad/'},'#study-abroad').done(function(json){
		$('#study-abroad').append("<h2 class='lightHeading'>"+json.studyAbroad.title+"</h2><p class='lightBody'>"+json.studyAbroad.description+"</p>");
	  });

	  xhr('get',{path:'/resources/studyAbroad/places'},"#study-abroad").done(function(json){
		$.each(json.places, function(i,item){
		  $("#study-abroad").append("<h2 class='light-subhead'>"+item.nameOfPlace+"</h2><p class='lightBody'>"+item.description+"</p>");
		})

	  });

	  xhr('get',{path:'/resources/studentServices'},"#student-services").done(function(json){
		$('#student-services').append("<h2 class='lightHeading'>"+json.studentServices.title+"</h2>");
	  });

	  xhr('get',{path:'/resources/studentServices/academicAdvisors'},"#student-services").done(function(json){
		$("#student-services").append("<h2 class='light-subhead'>"+json.academicAdvisors.title+"</h2><p class='lightBody'>"+json.academicAdvisors.description+"</p>");
	  });

	  xhr('get',{path:'/resources/studentServices/academicAdvisors/faq'},"#student-services").done(function(json){
		$("#student-services").append("<a href='"+json.faq.contentHref+"'>"+json.faq.title+"</a>");
	  });

	  xhr('get',{path:'/resources/studentServices/professonalAdvisors'},"#student-services").done(function(json){
		var x="<h2 class='light-subhead'>"+json.professonalAdvisors.title+"</h2>";
		x+="<table><thead><tr><th>Name</th><th>Department</th><th>Email</th></tr></thead><tbody>"
		$.each(json.professonalAdvisors.advisorInformation, function(i,item){
		  x+="<tr><td>"+item.name+"</td><td>"+item.department+"</td><td>"+item.email+"</td></tr>"
		})
		x+="</tbody></table>"
		$("#student-services").append(x);
	  });

	  xhr('get',{path:'/resources/studentServices/facultyAdvisors'},"#student-services").done(function(json){
		var x="<h2 class='light-subhead'>"+json.facultyAdvisors.title+"</h2><p class='lightBody'>"+json.facultyAdvisors.description+"</p>";
		$("#student-services").append(x);
	  });


	  xhr('get',{path:'/resources/studentServices/istMinorAdvising'},"#student-services").done(function(json){
		var x = "<table><thead><tr><th>Name</th><th>Department</th><th>Email</th></tr></thead><tbody>"
		$.each(json.istMinorAdvising.minorAdvisorInformation, function(i,item){
		  x+="<tr><td>"+item.title+"</td><td>"+item.advisor+"</td><td>"+item.email+"</td></tr>"
		})
		x+="</tbody></table>";
		$("#student-services").append(x);
	  });

	  xhr('get',{path:'/resources/tutorsAndLabInformation/'},"#tutors-and-lab-info").done(function(json){
		$("#tutors-and-lab-info").append("<h2 class='lightHeading'>"+json.tutorsAndLabInformation.title+"</h2><p class='lightBody'>"+json.tutorsAndLabInformation.description+"</p><a href='"+json.tutorsAndLabInformation.tutoringLabHoursLink+"'>Tutoring Hours Link</a>");
	  });

	  xhr('get',{path:'/resources/studentAmbassadors/'},"#student-ambassadors").done(function(json){
		$("#student-ambassadors").append("<h2 class='lightHeading'>"+json.studentAmbassadors.title+"</h2>");
		$.each(json.studentAmbassadors.subSectionContent, function(i,item){
		  $("#student-ambassadors").append("<h2 class='light-subhead'>"+item.title+"</h2><p class='lightBody'>"+item.description+"</p>");
		})
	  });

	  xhr('get',{path:'/resources/forms/'},"#forms").done(function(json){
		$("#grad-forms").before("<h2 class='lightHeading'>Forms</h2>");
		$("#grad-forms").before("<h2 class='light-subhead'>Graduate Forms</h2>");
	  });

	  xhr('get',{path:'/resources/forms/'},"#grad-forms").done(function(json){
		$.each(json.forms.graduateForms, function(i,item){
		  $("#grad-forms").append("<li><a href='"+item.href+"'>"+item.formName+"</a></li>");
		})
	  });

	  xhr('get',{path:'/resources/forms/'},"#undergrad-forms").done(function(json){
		$("#grad-forms").after("<h2 class='light-subhead'>Undergraduate Forms</h2>");
		$.each(json.forms.undergraduateForms, function(i,item){
		  $("#undergrad-forms").append("<li><a href='"+item.href+"'>"+item.formName+"</a></li>");
		})
	  });

	  xhr('get',{path:'/resources/coopEnrollment/'},"#coopEnrollment").done(function(json){
		$("#coopEnrollment").append("<h2 class='lightHeading'>"+json.coopEnrollment.title+"</h2>");
		$.each(json.coopEnrollment.enrollmentInformationContent, function(i,item){
		  $("#coopEnrollment").append("<h2 class='light-subhead'>"+item.title+"</h2><p class='lightBody'>"+item.description+"</p>");
		})
	  });

	  //add in the news data based on yearly and older content
	  xhr('get',{path:'/news/'},"#newsDiv").done(function(json){
		$.each(json.year, function(i,item){
		  $("#year-content").append("<h2 class='dark-subhead'>"+item.title+"</h2><p class='darkCopy'>"+item.date+"</p>");

		  if(item.description != null){
			$("#year-content").append("<div class='read-more-div'><p class='darkCopy'>"+item.description+"</p></div>");
		  }
		})
		//read in plugin will truncate longer lists and will open when clicked 
		$('.read-more-div').readmore({
		speed: 75,
		lessLink: '<a href="#">Read less</a>',
		collapsedHeight: 50
		});
	  });

	  xhr('get',{path:'/news/'},"#newsDiv").done(function(json){
		$.each(json.older, function(i,item){
		  $("#older-content").append("<h2 class='dark-subhead'>"+item.title+"</h2><p class='darkCopy'>"+item.date+"</p>");

		  if(item.description != null){
			$("#older-content").append("<div class='read-more-div'><p class='darkCopy'>"+item.description+"</p></div>");
		  }
		})
	  });

	  //add in the social links to the footer
	  xhr('get',{path:'/footer/'},"#contactDiv").done(function(json){
		$("#social").append("<h2 class='light-subhead'>"+json.social.title+"</h2>");
		$("#social").append("<a href='"+json.social.twitter+"'><i class='fa fa-twitter fa-2x' aria-hidden='true'></i></a>");
		$("#social").append("<a href='"+json.social.facebook+"'><i class='fa fa-facebook fa-2x' aria-hidden='true'></i></a>");
	  });

	  //add the contact information and quick links in the footer
	  xhr('get',{path:'/footer/'},"#contactDiv").done(function(json){
		$.each(json.quickLinks, function(i,item){
		  $("#quick-links").append("<a href='"+item.href+"'>"+item.title+"</a>")
		})
	  });

	  //add the copyright info into the footer
	  xhr('get',{path:'/footer/'},"#copyrightDiv").done(function(json){
		$("#copyrightDiv").append("<p class='lightBody'>"+json.copyright.html+"</p>");
	  });


	});



////////////////////////////////////////////////////////////////////
	///ajax util
	///		arguments:
	///		getPost - get or post
	///		d - {path:'/about/'}
	///		idForSpinner - #parent (optional)
	///			the id of the container I want the spinner to go into
	///
	///			use: xhr('get',{path:'/about/'}, '#id').done(function(){//code});
	
	function xhr(getPost,d,idForSpinner){
		return $.ajax({
			type:getPost,
			url:'proxy.php',
			dataType:'json',
			data:d,
			cache:false,
			async:true,
			beforeSend:function(){
				$(idForSpinner).append('<img src="images/gears.gif" class="spin"/>');
			}
		}).always(function(){
			//remove spinner?
			$(idForSpinner).find('.spin').fadeOut(500,function(){
				$(this).remove();
			});
		}).fail(function(err){
			console.log(err);
		});
	}
	
