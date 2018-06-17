$(function(){
  var repoUrl = 'https://api.github.com/users/lon9/repos?sort=updated&per_page=100&page=';
  var page = 1;
  var count = 0;
  getRepos(page);

  $.get('https://api.github.com/users/lon9')
    .then(function(user){
      var txt = 'name: ' + user.name + '<br>';
      txt += 'bio: ' + user.bio + '<br>';
      txt += 'live: ' + user.location + '<br>';
      $('.info').append(txt);
      $('.avatar').attr('src', user.avatar_url);
      $('.github-link').attr('href', user.html_url);
    });

  function getRepos(page){
    u = repoUrl+page
    $.get(u)
      .then(function(repos){
        for(var i=0; i < repos.length; i++){
          addElem(repos[i]);
        }
        count += repos.length;
        if(repos.length!=0){
          page++;
          getRepos(page);
        }else{
          $('.title').append(' (' + count + ')');
        }
      });
  }

  function addElem(repo){
    var elem = ""
    if(repo.description != null){
      elem = '<li><a target="_blank" href="' + repo.html_url + '">' + repo.name + '</a> - ' + repo.language + ' ' + repo.description + '</li>';
    }else{
      elem = '<li><a target="_blank" href="' + repo.html_url + '">' + repo.name + '</a> - ' + repo.language + '</li>';
    }
    $('.repos').append(elem);
  }

  fetch('/github-info/languages.json')
    .then(res => {
      return res.json();
    })
    .then(data => {
      data = data.filter(lang => { 
        if(lang.name == 'PostScript' || lang.name == 'HTML' || lang.name == 'CSS' || lang.name == 'Jupyter Notebook') return false;
        return true;
      });
      data.sort((a,b) => {
        if(a.bytes < b.bytes){
          return 1;
        }else if(a.bytes > b.bytes){
          return -1;
        }
        return 0;
      });
      var sum = data.reduce((prevLang, currLang) => {
        return {
          bytes: prevLang.bytes + currLang.bytes
        }
      });
      var chartData = {
        datasets: [{
          data: [],
          backgroundColor: []
        }],
        labels: []
      };
      data.map(lang => {
        chartData.datasets[0].data.push(((lang.bytes/sum.bytes)*100).toFixed(2));
        chartData.datasets[0].backgroundColor.push('rgba(' + getRandomInt(256) + ',' + getRandomInt(256) + ',' + getRandomInt(256) + ', 1)');
        chartData.labels.push(lang.name);
      });
      var ctx = document.getElementById('lang-pie').getContext('2d');
      var langC = new Chart(ctx, {
        type: 'doughnut',
        data: chartData
      });
    });

  function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max));
  }
});
