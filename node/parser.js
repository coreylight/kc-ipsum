var fs = require('fs');
var path = require('path');
var totalArticles = 0;
var totalWords = 0;

//you won't have these files on github due to me not wanting to publish full articles verbatim
var files = ['scrape-1','scrape-17-17','scrape-18-19','scrape-2-6','scrape-21-21','scrape-22-22','scrape-7-16', 'scrape-23-28','scrape-29-34','scrape-34-39','scrape-39-44','scrape-44-49', 'scrape-50-54', 'scrape-56-60'];
for(var i=61;i<222;i=i+5){
  files.push('scrape-'+i+'-'+(i+4));
}

var stopWords = ["-",'--',"always","that\'s","it\'s","i\'ve","of","it","are","as","had","by","some","what","we","when","use","how","each","then","so","these","her","him","more","could","come","did","my","no","me","say","too","try","us","own","any","youll","also","than","though","thing","things","after","where","until","another"]

var others = {
  numbers:['1','2','3','4','5','6','7','8','9','0','one','two','three','four','five','six','seven','eight','nine','ten','first','second','third','fourth','fifth'],
  mostCommon:["be","to","of","and","a","in","that","have","i","it","for","not","on","with","he","as","you","do","at","this","but","his","by","from","they","we","say","her","she","or","an","will","my","one","all","would","there","their","what","so","up","out","if","about","who","get","which","go","me","when","make","can","like","time","no","just","him","know","take","people","into","year","your","good","some","could","them","see","other","than","then","now","look","only","come","its","over","think","also","back","after","use","two","how","our","work","first","well","way","even","new","want","because","any","these","give","day","most","us"],
  nouns:["time","person","year","way","day","thing","man","world","life","hand","part","child","eye","woman","place","work","week","case","point","government","company","number","group","problem","fact"],
  verbs:["be","have","do","say","get","make","go","know","take","see","come","think","look","want","give","use","find","tell","ask","work","seem","feel","try","leave","call","was",'were','click','said','going','set'],
  adjectives:["good","new","first","last","long","great","little","own","other","old","right","big","high","different","small","large","next","early","young","important","few","public","bad","same","able"],
  prepositions:["aboard", "about", "above", "absent", "across", "after", "against", "along", "alongside", "amid", "amidst", "among", "around", "as", "at", "atop", "before", "behind", "below", "beneath", "beside", "between", "by", "despite", "during", "", "except", "excepting", "following", "for", "from", "in", "inside", "into", "like", "mid", "near", "next", "of", "off", "on", "opposite", "outside", "over", "past", "plus", "regarding", "round", "save", "since", "than", "through", "till", "times", "to", "toward", "towards", "under", "underneath", "until", "up", "upon", "with", "within", "without"],
  articles:["the","and","a","that","i","it","not","he","as","you","this","but","his","they","her","she","or","an","will","my","one","all","would","there","their",'says','who','new','people','want','make','made','our','off','good','think','very','want','been','enlarge','other','really','first','now','year','years','because','most','is','while'],
  contractions:["ain't","aren't","can't","could've","couldn't","couldn't've","didn't","doesn't","don't","hadn't","hasn't","haven't","he'd","he'd've","he'll","he's","how'd","how'll","how's","i'd","i'd've","i'll","i'm","i've","isn't","it'd","it'd've","it'll","it's","let's","ma'am","might've","mustn't","must've","needn't","not've","o'clock","shan't","she'd","she'd've","she'll","she's","should've","shouldn't","shouldn't've","that's","there'd","there'd've","there's","they'd","they'd've","they'll","they're","they've","wasn't","we'd","we'd've","we'll","we're","we've","weren't","what'll","what're","what's","when's","where'd","where's","where've","who'll","who's","why's","won't","would've","wouldn't","you'd","you'd've","you'll","you're","you've"],
  days:['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
  months:['january','february','march','april','may','june','july','august','september','october','november','december'],
  others:["many","pretty","enough","should","does","again","about","abst","accordance","according","accordingly","act","actually","added","adj","affected","affecting","affects","afterwards","again","ah","almost","alone","already","although","am","amongst","and","announce","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","aren","arent","arise","as","aside","asking","auth","available","away","awfully","be","became","become","becomes","becoming","before","beforehand","begin","beginning","beginnings","begins","being","believe","beside","besides","beyond","biol","both","brief","briefly","by","ca","came","cannot","cause","causes","certain","certainly","co","com","comes","contain","containing","contains","couldnt","date","didn't","do","does","doing","done","down","downwards","due","each","ed","edu","effect","eg","eighty","either","else","elsewhere","end","ending","enough","especially","et","et-al","etc","ever","every","everybody","everyone","everything","everywhere","ex","far","ff","fix","followed","follows","former","formerly","forth","found","from","further","furthermore","gave","gets","getting","given","gives","giving","goes","gone","got","gotten","happens","hardly","has","have","having","hed","hence","here","hereafter","hereby","herein","heres","hereupon","hers","herself","hes","hi","hid","himself","hither","home","howbeit","however","hundred","id","ie","i'll","im","immediate","immediately","importance","in","inc","indeed","index","information","instead","inward","isn't","itd","its","itself","just","keep",'much','still','kind','going','said','perhaps','usually','nearly','month','today','news','sometimes','less','went','may','ago','put','later','lot','those','something','pm','am','best','why','days']
}

for(var part in others){
  //combine all the stopwords
  stopWords = stopWords.concat(others[part]);
}

var topWords = [];

function inTopWords(word){
  //test if word is already in topwords
  var len = topWords.length;
  while(len--){
    if(topWords[len].w == word){
      return len;
    }
  }
  return -1;
}

function iterator(input) {
  //split words into an array by space or newline
  var words = input.split(/[\s\n]/);
  //counting words, just for fun
  totalWords = totalWords+words.length;

  for(var i=0;i<words.length;i++){
    var word = words[i];
    //normalizing the word a bit
    word = String(word).replace(/[\/\\]/,' ').replace(/[^a-z'\- ]/gi,'').toLowerCase();
    //if the word is in the stopwords list, go on to the next word
    if(stopWords.indexOf(word) > -1){continue;}

    var found = inTopWords(word);
    if(found > -1){
      //increase count if already in topwords
      topWords[found].c = topWords[found].c+1; 
    }else{
      //push if else
      topWords.push({w:word,c:1});
    }
  }
}

function parseWords(data){
  //counting just for fun
  totalArticles = totalArticles+data.length;
  //run through each article
  for(var k=0;k<data.length;k++){
    iterator(data[k].text);
  }
}

function stripInfrequent(){
  //limit the number of words in analysis to those that are used more than 15 times total
  var len = topWords.length;
  while(len--){
    if(topWords[len].c < 15){
      topWords.splice(len,1);
    }
  }
}

function readFile(file,last){
  //this path won't work on github due to you not having files, but you could generate them with scraper.js!
  file = file != undefined ? file : 0;
  var filePath = path.normalize(__dirname+'/../'+'scrape/'+files[file]+'.json');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }
    var d = Date.now();

    //log out what file we are on
    console.log('parsing '+filePath);
    parseWords(JSON.parse(data));
    if(file+1==files.length){
      //sort words from highest frequency to lowest
      topWords.sort(function(a,b){
        return b.c-a.c;
      })
      //make file smaller
      stripInfrequent();
      //write it out
      fs.writeFile(path.normalize(__dirname+'/../analysis-1.json'), JSON.stringify(topWords));

      //extra info
      console.log('total articles: '+totalArticles);
      console.log('total words: '+totalWords);
    }else{
      //iterate again if we aren't on the last one
      readFile(file+1);
    }
    //let us know how fast/slow each file is running
    console.log('end - '+(Date.now()-d));
    //set to null for garbage collection(?)
    data = null;
  });
}

//kick it all off!
readFile();