require 'json'
require 'octokit'

client = Octokit::Client.new(:access_token => ENV['GITHUB_ACCESS_TOKEN'])
client.auto_paginate = true

user = client.user
p user

langs = {}

client.repos({}, query: {type: 'owner'}).each_with_index{ |repo, i|
  client.languages(repo.full_name).each{ |lang, bytes|
    next langs[lang] += bytes if langs.key?(lang)
    langs[lang] = bytes
   }
}

p langs

result = []

langs.each{ |lang, bytes|
  result.push({
    :name => lang,
    :bytes => bytes
  })  
}

File.open('languages.json', 'w') do |f|
  JSON.dump(result, f)
end
