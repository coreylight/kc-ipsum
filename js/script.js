var app = angular.module('app', []);

app.controller('site',['$scope', '$rootScope', '$window', 'hoods', 'bbq', 'ipsum', function($scope, $rootScope, $window, hoods, bbq, ipsum){

  $scope.generate = function(){
    $scope.ipsum = ipsum.generate();
  }
  $scope.generate();

  $rootScope.bbqLevel = 1;
  $rootScope.wordsLevel = 10;
  $scope.$watch(function(){return $scope.bbqLevel},function(newVal,oldVal){
    $rootScope.bbqLevel = $scope.bbqLevel;
    $scope.generate();
  })
  
}]);//end site controller

app.service('ipsum',['$rootScope', '$sce', 'hoods', 'words', 'bbq', 'attractions', 'food','businesses', function($rootScope, $sce, hoods, words, bbq, attractions, food, businesses){
  return {
    areas:[food,attractions,hoods,bbq,businesses,words],
    makeSentences:function(words){
      var string = '';
      while(words.length){
        //pick rand number of words between 8-16
        var numberOfWords = Math.floor(Math.random()*10)+8;
        //extract from array
        var array = words.splice(0,numberOfWords);
        //make spaces
        var s = array.join(' ');
        //capitalize first word and add period
        s = s.charAt(0).toUpperCase() + s.slice(1) + '. ';
        //add to string
        //string+='<p>'+s+'</p>';
        string+=s;
      }
      return string;
    },
    pickArea:function(){
      var areaDistributions = [];
      for(var j=0;j<this.areas.length;j++){
        var level = $rootScope[this.areas[j].title+'Level'] != undefined ? $rootScope[this.areas[j].title+'Level'] : 1;
        if(level < 1){continue;}
        areaDistributions.push([]);
        for(var k=0;k<level;k++){
         areaDistributions[j].push(Math.floor(Math.random()*1000000));
        }
        areaDistributions[j] = Math.max.apply(Math,areaDistributions[j]);
      }
      var winner = Math.max.apply(Math,areaDistributions);
      return areaDistributions.indexOf(winner);
    },
    generate:function(length){
      length = length ? length : 200;
      var areas = this.areas;
      var picked = [];

      for(var i = 0; i < length; i++){
        var pickedArea = this.pickArea();
        var randAreaWord = Math.floor(Math.random()*areas[pickedArea].data.length);
        //pick out word and push
        var word = areas[pickedArea].data[randAreaWord];
        //don't repeat yourself
        // if(picked.indexOf(word) == -1){
          picked.push(areas[pickedArea].data[randAreaWord]);
        // }
      }
      return $sce.trustAsHtml(this.makeSentences(picked));
    }
  }
}])

app.service('words',['$window', function($window){
  var words = [];
  $window.words.forEach(function(word){
    words.push(word.w);
  })
  return {
    title:'words',
    data:words
  }
}]);

app.service('bbq',[function(){
  return {
    title:'bbq',
    data:['Arthur Bryant\'s','Gates','Oklahoma Joe\'s','LC\'s','Jack Stack','Woodyard', 'BB\'s Lawnside', 'Zarda\'s','American Royal World Series of BBQ','burnt ends','pulled-pork','Z-Man','onion rings','fries','sausage','sauce','smoked turkey', 'smoked ham', 'beef brisket','hog heaven','smoked chicken dinner','baby back ribs','pork spare ribs','KC Strip','short end','long end','beef on bun','chicken wings','mixed plate','bbq beans','cole slaw','potato salad','Hi, may I help you']
  }
}])


app.service('food',[function(){
  return {
    title:'food',
    data:["Vietnam Cafe","El Camino Real","Happy Gillis Cafe & Hangout","The Rieger Hotel Grill & Exchange","Le Fou Frog","Novel Restaurant","Filling Station","Bluestem","Pandolfi’s Deli","Genessee Royale Bistro","Grünauer","Room 39","Potpie","Beer Kitchen","Pigwich","Habashi House","Empanada Madness","Blue Koi","La Bodega","Tannin Wine Bar and Kitchen","Westport Cafe & Bar","Cafe Gratitude","Town Topic","You Say Tomato","Bread For All Bakery and Cafe","Cupini’s","Tortilleria San Antonio","Arthur Bryant’s Barbeque","Bristol Seafood Grill","The Brick","Blue Nile Cafe","The Westside Local","Los Alamos Market","Affäre","Garozzo’s Ristorante","Flying Saucer Draught Emporium","McCoy’s Public House","Aladdin Cafe","Boulevard Wheat","Boulevard Pale Ale","Boulevard Tank 7"]
  }
}])

app.service('businesses',[function(){
  return {
    title:'businesses',
    data:["360 Architecture","Adknowledge","American Century Investments","AMC Theatres","Andrews McMeel Universal","Applebee's","Assurant Employee Benefits","Barkley Inc.","Bernstein-Rein","Black & Veatch","BNIM","Boulevard Brewing Company","Burns and McDonnell Engineering","Cerner Corporation","Children International","Commerce Bancshares","Copaken, White & Blitt","DST Systems","Freightquote.com","Great Plains Energy","Hallmark Cards","H&R Block","HNTB","Hostess Brands","J.E. Dunn Construction Group","Kansas City Southern Railway","Lockton Companies","McCownGordon Construction","MMG Worldwide","The Music & More Foundation","Novastar Financial","Populous","Russell Stover Candies","Smith Electric Vehicles","UMB Financial Corporation","Veterans of Foreign Wars","VML, Inc.","Walton Construction","Birdies","Fable","Halls", 'Google Fiber']
  }
}])

app.service('attractions',[function(){
  return {
    title:'attractions',
    data:["National World War I Museum","Nelson-Atkins Museum of Art","Kauffman Center for the Performing Arts","Kauffman Stadium","The Steamboat Arabia Museum","Kaleidoscope","The Midland by AMC","The Ewing and Muriel Kauffman Memorial Garden","Starlight Theatre","Negro Leagues Baseball Museum","Kansas City Symphony","KC Fountains","Arrowhead Stadium","Loose Park","Loose Park Rose Garden","Kansas City Public Library","Union Station","Coterie Theatre","Airline History Museum","Alamo Drafthouse Cinema","Sprint Center","The National Museum of Toys and Miniatures","The Money Museum","Kansas City Repertory Theatre","The College Basketball Experience","Kemper Museum of Contemporary Art","Hallmark Visitors Center","Thomas Hart Benton Home and Studio State Historic Site","Science City at Union Station","Kansas City Zoo","The Beast","Crown Center","J.C. Nichols Memorial Fountain","American Jazz Museum","Shoal Creek Living History Museum","Heart of America Shakespeare Festival","National Archives at Kansas City","TWA Museum","Worlds Of Fun","Sea Life Kansas City Aquarium","American Heartland Theatre","Belger Arts Center","Screenland Crown Center","LEGOLAND Discovery Center","The Bay Water Park","World Revival Church","Old Trolley Trail","Romey Hills Park","Stanford's Comedy Club","Brush Creek Waterway","Kansas City Convention Center","Anita B. Gorman Conservation Discovery Center", "City Market"]
  }
}])

app.service('hoods',[function(){
  var data = {
    title:'hoods',
    data:["18th and Vine","Columbus Park","Crown Center","Crossroads","Hospital Hill","Quality Hill","River Market","Union Hill","West Side","Hyde Park","Roanoke","Southmoreland","Squier Park","Valentine","Volker","Westport","Pendleton Heights","Scarritt Point","Briarcliff","Brookside","Country Club Plaza","Rockhill","Crestwood","Morningside","Oak Meyer Garden","Troost Avenue Lawn","Waldo","Ward Parkway","Wornall Homestead","Rosedale","Strawberry Hill","Swope Park","Longview","West Bottoms","East Bottoms","Downtown"]
  }
  return data;
}]);