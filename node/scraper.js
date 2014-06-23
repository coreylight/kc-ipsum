var casper = require('casper').create();
var fs = require('fs');

var settings = {
  debug:true,
  console:true,
  base:'http://www.pitch.com/kansascity/ArticleArchives/',
  //how many pages per file do we want to include?
  interval:5,
  //what page do we want to start on?
  start:226,
  end:0
}

//set programaticaly throughout
settings.end = settings.start+settings.interval;

var data = {
  words:[],
  links:[]
}

function getLinks() {
    var a = document.querySelectorAll('h4.headline a');
    var array = Array.prototype.map.call(a, function(e) {
      //normalize href a bit
      var href = e.getAttribute('href');
      href = !href.match('http:\/\/') ? 'http://www.pitch.com'+href : href;
      href = !href.match(/\?/) ? href+'?showFullText=true' : href+'&showFullText=true';
      return href;
    });
    return array;
}

function getWords(){
  //grab the article text!
  var story = document.querySelector('#storyBody');
  story = story ? story : document.querySelector('.postBody');
  return story ? story.innerText : '';
}

function reset(){
  var data = {
    words:[],
    links:[]
  };
  //reset for next round of pages
  settings.start = settings.start+settings.interval;
  settings.end = settings.start+settings.interval;
  console.log('reset');
}

function iterate(){
  for(var i = settings.start;i<settings.end;i++){
    casper.thenOpen(settings.base+'?page='+i,function(self,link){
      casper.echo(casper.getCurrentUrl());
      var resp = casper.evaluate(getLinks);
      data.links = data.links.concat(resp);

      casper.each(resp,function(self,link){
        casper.thenOpen(link,function(a){
          casper.echo('opening '+link.substr(20));
          //push each article into the file to be written later
          data.words.push({link:link,text:casper.evaluate(getWords)});
        });
      });

    });
  }
}

function writeOut(){
  var file = JSON.stringify(data.words);
  var end = settings.end-1;
  fs.write('./data/scrape-'+settings.start+'-'+end+'.json', file, 'w');
}


if(settings.console){
  casper.on('remote.message', function(msg){
    casper.echo('From browser: '+msg);
  })
}

casper.start();
//might not have needed this, but I didn't want the server to interpret me as mobile
casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36");

//this will do 30 iterations of 5 pages of approx 20 articles per page each
//takes a while.
for(var k=0;k<30;k++){
  casper.then(function(){iterate()});
  casper.then(function(){writeOut()});
  casper.then(function(){reset()});
}

//kick it all off
casper.run(function(){
  this.exit();
});