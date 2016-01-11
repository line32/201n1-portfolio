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
		title: 'REI Digital Catalog',
		url: 'http://reitrips.com/#&panel1-3',
		description: 'Integrated JSON data into google maps API and used jQuery and jQuery UI for filtering.',
		icon: 'images/rei.jpg'
	},
	{
		title: 'REI Digital Catalog2',
		url: 'http://reitrips.com/#&panel1-3',
		description: 'Integrated JSON data into google maps API and used jQuery and jQuery UI for filtering.',
		icon: 'images/rei.jpg'
	},
	{
		title: 'REI Digital Catalog3',
		url: 'http://reitrips.com/#&panel1-3',
		description: 'Integrated JSON data into google maps API and used jQuery and jQuery UI for filtering.',
		icon: 'images/rei.jpg'
	}
];
function Project(title, url, description, icon) {
	this.title = title;
	this.url = url;
	this.description = description;   
	this.icon = icon;
}

Project.prototype.toHTML = function() {
	var artHTML = '<article class="project">\n' + '	';
	artHTML += '<img src="' + this.icon + '" class="project_icon" />\n' + '	';
	artHTML += '<h3><a href="' + this.url + '">' + this.title + '</a></h3>\n' + '	';
	artHTML += '<p>' + this.description + '</p>\n' + '	';
	artHTML += '<a href="' + this.url + '">Read more &rarr;</a>\n' + '	';
	artHTML += '\n</article>';
	return artHTML;
};
//Load raw data into post array
$.each(portfolio.rawData, function() {
	temp_project = new Project(this.title, this.url, this.description, this.icon);
	portfolio.projects.push(temp_project);	
	console.log(temp_project);
});


//Array sort by date
function SortByDate(a, b){
	var d2 = a.publishedOn;
	var d1 = b.publishedOn; 
	return ((d1 < d2) ? -1 : ((d1 > d2) ? 1 : 0));
}


//Add posts to html

$.each(portfolio.projects, function(){
	$('.portfolio').append(this.toHTML());
});
