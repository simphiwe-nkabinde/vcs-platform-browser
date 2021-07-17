var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

//GET USER=========================================
    //gitHub
router.get('/search/github/:user', (req, res) => {
    let name = req.params.user;
    fetch('https://api.github.com/users/'+ name)
    .then(res => res.json())
    .then(data => {
        return res.send(data)
    }).catch(err => {
        console.log(err)
    })
})
    //gitLab
router.get('/search/gitlab/:user', (req, res) => {
    let user = req.params.user;
    fetch('https://gitlab.com/api/v4/users?username='+ user)
    .then(res => res.json())
    .then(data => {
        return res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

//Get REPOS==========================================
    //github
router.get('/repos/github/:user', (req, res) => {
    let user = req.params.user
    fetch('https://api.github.com/users/'+ user + '/' + 'repos')
    .then(res => res.json())
    .then(data => {
        return res.send(data)
    }).catch(err => {
        console.log(err)
    })
})
    //gitlab
router.get('/repos/gitlab/:user', (req, res) => {
    let user = req.params.user
    fetch('https://gitlab.com/api/v4/users/'+ user + '/' + 'projects')
    .then(res => res.json())
    .then(data => {
        return res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

//GET COMMITS==========================================
    //github
router.get('/commits/github/:user/:repo/:repoId', (req,res) => {
    let user = req.params.user
    let repo = req.params.repo

    fetch('https://api.github.com/repos/'+ user +'/'+ repo +'/commits')
    .then(res => res.json())
    .then(data => {
        return res.send(data)
    })
    .catch(err => {
        console.log(err)
    })
})
    //gitlab
router.get('/commits/gitlab/gitlab/:repoName/:repoId', (req,res) => {
    let repoId = req.params.repoId

    fetch('https://gitlab.com/api/v4//projects/'+ repoId +'/repository/commits')
    .then(res => res.json())
    .then(data => {
        return res.send(data)
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router;