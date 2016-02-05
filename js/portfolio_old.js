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

/*portfolio.rawData = [
	{
		title: 'Paypal statement email',
		url: 'http://cbusch.net/work/paypal_p2p-d_received_en.html',
		description: 'Responsive email for PayPal statements.',
		icon: 'images/paypal_stmt.jpg',
		category: 'email'
	},
	{
		title: 'REI digital catalog map',
		url: 'http://reitrips.com/#&panel1-3',
		description: 'Integrated JSON data into google maps API and used jQuery and jQuery UI for filtering.',
		icon: 'images/rei.jpg',
		category: 'web'
	},
	{
		title: 'REI promotional email',
		url: 'http://cbusch.net/work/rei/member_tents/membertents.html',
		description: 'Responsive promotional email for REI.',
		icon: 'images/rei_tent.jpg',
		category: 'email'
	},
	{
		title: 'REI refer landing page',
		url: 'http://cbusch.net/work/rei/refer_friend/refer_a_friend.html',
		description: 'Responsive landing page with form and validation.',
		icon: 'images/rei_refer.jpg',
		category: 'web'
	},
	{
		title: 'Tablespoon promotional email',
		url: 'http://cbusch.net/work/tbsp/0811_newsletter.html',
		description: 'Responsive promotional email for Tablespoon.',
		icon: 'images/tbsp.jpg',
		category: 'email'
	},
	{
		title: 'Gamestop RFP',
		url: 'http://cbusch.net/work/gamestop/gamestop_rfp.html',
		description: 'Basic site template for RFP',
		icon: 'images/gamestop.gif',
		category: 'web'
	}
];*/
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
//Load raw data into post array
/*$.each(portfolio.rawData, function() {
	temp_project = new Project(this.title, this.url, this.description, this.icon, this.category);
	portfolio.projects.push(temp_project);	
});


//Add posts to html


$(document).ready(function() {
	portfolioView.populateFilters();
	portfolioView.handleCategoryFilter();
});*/