var timer;
var photos;
var index;
var per_page = 5;
var page = 1;
var is_paused = false;

$(document).ready(start_program);

function start_program()
{
  $('#search_button').click(search_flickr);
  $('#pause_button').click(pause);
}

function pause()
{
  if(is_paused)
    timer = setInterval(display_photo, 250);
  else
    clearInterval(timer);
  is_paused = !is_paused;
}

function search_flickr()
{
  var query = $('input').val();
  $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d2872938fb260c57358ce0da4d43da58&text=' + query + '&per_page=' + per_page + '&page=' + page + '&format=json&jsoncallback=?', flickr_finished);
}

function flickr_finished(data)
{
  index = 0;
  photos = data.photos.photo;
  timer = setInterval(display_photo, 250);
 //_.each(data.photos.photo, display_photo);
}

function display_photo()
{
  var photo = photos[index];
  var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
  $('body').css('background-image', url);
  // var img = $('<div>');
  // img.css('background-image', url);
  // img.addClass('photo');
  // $('#photos').empty().prepend(img);
  index++;
  if (index == per_page)
  {
    clearInterval(timer);
    page++;
    search_flickr();

  }
}