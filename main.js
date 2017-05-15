$(function(){
  var repoUrl = 'https://api.github.com/users/Rompei/repos?sort=updated&per_page=100&page=';
  var page = 1;
  var count = 0;
  getRepos(page);

  $.get('https://api.github.com/users/Rompei')
    .then(function(user){
      var txt = 'name: ' + user.name + '<br>';
      txt += 'bio: ' + user.bio + '<br>';
      txt += 'live: ' + user.location + '<br>';
      $('.info').append(txt);
      $('.avatar').attr('src', user.avatar_url)
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
      elem = '<li><a href="' + repo.html_url + '">' + repo.name + '</a> - ' + repo.language + ' ' + repo.description + '</li>';
    }else{
      elem = '<li><a href="' + repo.html_url + '">' + repo.name + '</a> - ' + repo.language + '</li>';
    }
    $('.repos').append(elem);
  }
});
