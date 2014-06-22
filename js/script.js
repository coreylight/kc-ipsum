var bp = '../bower_components/';
var dir = {path:'/julep'}
if(!window.location.href.match('coreylight')){dir.path = '';}
require.config({
  baseUrl:dir.path+'/js',
  paths:{
    angular:[
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0-rc.2/angular.min',
      bp+'angular/angular.min'
    ]
  }
});


require(['angular'],function(){
  var app = angular.module('app', []);

  app.controller('site',['$scope', 'Project', function($scope, Project){
    
    $scope.standards = [
    ]
    
  }]);//end site controller
  
  app.directive('mark',function(){
    return {
      restrict:'A',
      link:function($scope,element,attrs){
        $scope.project.contents.push([attrs.id,element[0].innerHTML]);
      }
    }
  });

  app.controller('planning-estimate',['$scope', 'Project', function($scope, Project){
    $scope.project = Project;
    $scope.planning ={
      sections:[
      {
        t:'Planning',
        f:[Project.people.Developer.name + ' will communicate with '+$scope.project.people.Client.name+' in a reasonable and timely manner to assess the features needed for the project as a whole.'],
        h:4
      },
      {
        t:'Technical Architecture',
        f:[Project.people.Developer.name + ' will assess the technical needs of the project on the basis of features needed.'],
        h:4
      },
      {
        t:'Site Design + Revisions',
        f:[Project.people.Developer.name + ' will work with '+Project.people.Client.name+' to adequately provide visuals for the site that '+Project.people.Client.name+' is ultimately satisfied with. These visuals could include but are not limited to typography, color choice, layout positioning, interactive features, logo treatment and positioning, and the selection of images (stock or otherwise). The process of designing the site will be an iterative experience in which consistent weekly communication will be initiated by '+Project.people.Developer.name+' until the design portion of the project is deemed complete. No set amount of revisions will be estimated, as this number is highly variable.'],
        h:30
      },
      {
        t:'Back-end, Server Development',
        f:[Project.people.Developer.name + ' will work with whatever technology chosen during the Technical Architecture stage to properly configure domain names, hosting, server architecture, and language-specific features that will support the site as a whole.'],
        h:10
      },
      {
        t:'Administrator Configuration',
        f:[Project.people.Developer.name+ ' will set up access credentials for individuals that '+Project.people.Client.representative+' would like to be able to access the administrative functions of the site. These user accounts will allow administrators to create and manage content on the web site.'],
        h:3
      },
      {
        t:'User Account Development',
        f:['User accounts that the general public will be able to either purchase or freely sign up for that will allow them access to restricted portions of the site, including but not limited to trainer videos and exercise pages.'],
        h:4
      },
      {
        t:'Site Photography',
        f:[Project.people.Developer.name + ' will provide access to a photographer who will photograph the interior and exterior of the physical space, along with portraits of '+Project.people.Client.name+' senior personnel and the staff of 6-10 trainers. These photos can be used for all marketing material, including website needs.'],
        h:12
      },
      {
        t:'Site Copy',
        f:[Project.people.Developer.name + ' will provide access to a copywriter who will help '+Project.people.Client.name+ ' write copy that will be displayed on the site. Example areas of writing are: introduction copy on the landing page, about copy on the about page, and marketing copy on the ecommerce area of the site.'],
        h:8
      },
      {
        t:'Site Feature: General Information',
        f:['This includes physical location hours, an about page, a map of the physical location, and other general information for promotion of '+Project.people.Client.name+'.'],
        h:6
      },
      {
        t:'Site Feature: Contact Page',
        f:['This page will allow the general public to fill out a form to be contacted by a member of '+Project.people.Client.name+'.'],
        h:4
      },
      {
        t:'Site Feature: Ecommerce',
        f:['This will allow '+Project.people.Client.name+' to sell products online. Product management, product display, a cart feature, a checkout feature, and a customer contact feature are included.'],
        h:15
      },
      {
        t:'Site Feature: Trainer Page',
        f:['A page including information about the trainers that will be working at '+Project.people.Client.name+'. General information, embedded videos and photos introducing individuals are estimated to be in this section.'],
        h:8
      },
      {
        t:'Site Feature: Training Videos and Informative Materials',
        f:['A page or pages that allow the general public to (with or without a user account, dependent on the information being presented) access custom content that '+Project.people.Client.name+' will produce.'],
        h:8
      },
      {
        t:'Site Feature: Blog/Customer Interaction Area',
        f:['A site section that will allow users to interact with content created by CMS administrators and '+Project.people.Client.name+' staffers - ie comments.'],
        h:8
      },
      {
        t:'Analytics',
        f:['Before project launch, '+Project.people.Developer.name+' will install and configure an analytics solution provided by Google that will allow '+Project.people.Client.name+ ' administrators to understand website traffic in key areas such as referrals, session count, and page content statistics. This will allow '+Project.people.Client.name+' to efficiently determine the value of the content they will produce in the future.'],
        h:4
      },
      {
        t:'Search Engine Optimization',
        f:['While search engine rankings cannot be controlled by a developer alone, '+Project.people.Developer.name+' will develop with SEO best-practices in mind such as proper title tags, proper heading structure, and properly robot-discoverable text on appropriate pages. '+Project.people.Developer.name+' will also configure Google Webmaster Tools to understand the impacts of future content creation. Additionally, Open Graph and Twitter tags will be properly configured for proper display of images and text when users share content on Facebook and Twitter.'],
        h:6
      },
      {
        t:'Quality Assurance',
        f:[Project.people.Developer.name+ ' will use various physical and virtual devices to ensure that the project meets agreed upon browser standards.'],
        h:6
      },
      {
        t:'Google Ad Words Configuration',
        f:[Project.people.Developer.name+ ' will configure an account for Google Ad Words, that will allow '+Project.people.Client.name+ ' to get started with an ad campaign to drive online traffic based on selected keywords.'],
        h:2
      },
      {
        t:'Hosting',
        f:[Project.people.Developer.name+ ' will provide a server in which the site will be installed and accessed by the general public. The amount of this service will be billed yearly until '+Project.people.Client.name+ ' submits in writing a cancellation of this service. As of writing, the hosting service projected for use is a Digital Ocean VPS that includes redudancy features such as RAID5 replication.'],
        h:1
      },
      {
        t:'Backup Solution',
        f:[Project.people.Developer.name+ ' will provide a solution for creating automated weekly backups of database data and certain files that will allow for fresh, snapshot installation of the website if there is data loss or corruption.'],
        h:1
      },
      ]
    }

    $scope.discount = 0;
    $scope.fees = [
      //['Annual recurring hosting agreement',60]
    ]

    $scope.totalFees = function(){
      var t = 0;
      angular.forEach($scope.fees,function(value){
        t+=value[1];
      });
      return t;
    }
    
    $scope.totalHours = function(){
      var t = 0;
      angular.forEach($scope.planning.sections,function(v,k){
        t+=v.h;
      });
      return t;
    }

  }]);

  app.service('Project', [function(){
  
    var $scope = {
      title:'The Port KC Website Design and Development',
      completionDate:'October, 2014',
      contents:[],
      hourlyRate:'100',
      people:{
        // Designer:{
        //   name:'Adam Elwell',
        //   email:'aelwell@barkleyus.com'
        // },
        Developer:{
          name:'Corey Light',
          email:'coreylight@gmail.com',
          phone:'816-812-3623',
          county:'Jackson County',
          state:'Missouri'
        },
        Client:{
          name:'The Port KC',
          representative:'Justin Barth',
          //address:'5721 Charlotte Street, Kansas City MO, 64110',
          email:'theportkc@gmail.com',
          address:'',
          phone:'913-378-8469'
        }
      },
      sections:[
        {t:'Home',f:['Parallax + Special Effects, Single Page Application']},
        // {t:'About',f:['Biography', 'Whiskey Locker Availability', 'Whiskey History and Knowledge', 'Image Gallery']},
        // {t:'Join',f:['Weekly Specials', 'Hours', 'Reservations']},
        // {t:'Menu',f:['Drinks', 'Food']},
        // {t:'Location',f:['Google Map', 'Written Directions']}
      ]
    }

    return $scope;
  }]);
//end project service
  
  angular.bootstrap(document.getElementsByTagName('body'), ['app']);
});