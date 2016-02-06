(function(){
	$('.navres').on('click', function() {
		$('.resume').fadeIn(1400);
		$('.portfolio').hide();
		$('.intro').hide();	
	});
	$('.navport').on('click', function() {
		$('.portfolio').fadeIn(1400);
		$('.resume').hide();
		$('.intro').hide();
	});
	$('.headshot').on('click', function() {
		$('.intro').fadeIn(1400);
		$('.portfolio').hide();
		$('.resume').hide();
	});
	
	var portfolio = {
		projects: []
	};
	
	function Project(title, url, description, icon, category) {
		this.title = title;
		this.url = url;
		this.description = description;   
		this.icon = icon;
		this.category = category;
	}
	
	Project.prototype.toHTML = function() {
		var projectTemplate = $('#project').html();
		var compiledTemplate = Handlebars.compile(projectTemplate);
		var html = compiledTemplate(this);
		$('.portfolio').append(html);
	};
	
	var portfolioView = {};
	
	portfolioView.populateFilters = function() {
		var val, optionTag;
		$('article').each(function() {
			val = $(this).attr('category');
			optionTag = '<option value="' + val + '">' + val + '</option>';
			if ($('#category-filter option[value="' + val + '"]').length === 0) {
				$('#category-filter').append(optionTag);
			}
		});
	};
	
	portfolioView.handleCategoryFilter = function() {
		$('#category-filter').on('change', function() {
			if ($(this).val()) {
				$('article').hide();
				$('article[category="' + $(this).val() + '"]').fadeIn();
			} else {
				$('article').fadeIn();
				$('article.template').hide();
			}
		});
	};
	$.getJSON("js/projects.json").done(function(data) {	  
		$.each(data.rawData, function() {
			temp_project = new Project(this.title, this.url, this.description, this.icon, this.category);
			portfolio.projects.push(temp_project);
		});
		$.each(portfolio.projects, function(){
			this.toHTML();
		});
		portfolioView.populateFilters();
		portfolioView.handleCategoryFilter();
	});
	//This code is to prove I can write a reduce function
	var array1 = [
	{name: "joe", age: 32}, 
	{name: "amy", age: 12}, 
	{name: "sally", age: 75}, 
	{name: "nick", age: 27}
	];
	
	var totalAges = 0;
	totalAges = array1.reduce(function(sum, curr){
		console.log("sum: " + sum);
		console.log("curr: " + curr);
		return sum + curr.age;
	}, 0); // the 0 initialization is important when working with an array of objects
	console.log("totalAges: " + totalAges);
	
}());