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

portfolio.rawData = [
	{
		title: 'REI Digital Catalog1',
		url: 'http://reitrips.com/#&panel1-3',
		description: 'Integrated JSON data into google maps API and used jQuery and jQuery UI for filtering.',
		icon: 'images/rei.jpg',
		category: 'web'
	},
	{
		title: 'REI Digital Catalog2',
		url: 'http://reitrips.com/#&panel1-3',
		description: 'Integrated JSON data into google maps API and used jQuery and jQuery UI for filtering.',
		icon: 'images/rei.jpg',
		category: 'email'
	},
	{
		title: 'REI Digital Catalog3',
		url: 'http://reitrips.com/#&panel1-3',
		description: 'Integrated JSON data into google maps API and used jQuery and jQuery UI for filtering.',
		icon: 'images/rei.jpg',
		category: 'web'
	}
];
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

//Load raw data into post array
$.each(portfolio.rawData, function() {
	temp_project = new Project(this.title, this.url, this.description, this.icon, this.category);
	portfolio.projects.push(temp_project);	
});

//Array sort by date
function SortByDate(a, b){
	var d2 = a.publishedOn;
	var d1 = b.publishedOn; 
	return ((d1 < d2) ? -1 : ((d1 > d2) ? 1 : 0));
}


//Add posts to html

$.each(portfolio.projects, function(){
	this.toHTML();
});

var portfolioView = {};

portfolioView.populateFilters = function() {
	var val, optionTag;
	$('article').each(function() {
		val = $(this).attr('category');
		console.log(val);
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

$(document).ready(function() {
	portfolioView.populateFilters();
	portfolioView.handleCategoryFilter();
});