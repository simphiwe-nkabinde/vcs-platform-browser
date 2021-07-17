import React from "react";
import ProfileCard from "./ProfileCard";
import RepoContainer from "./RepoContainer";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingProfile: false,
            isFetchingRepos: false,
            vcsSelected: '',
            username: '',
            githubProfile: {},
            bitbutcketProfile: {},
            gitlabProfile: {}
        };
        this.handleClickOnSearch = this.handleClickOnSearch.bind(this);
        this.handleClickOnRepos = this.handleClickOnRepos.bind(this);
        this.handleClickOnProfiles = this.handleClickOnProfiles.bind(this)

    }
    /* 
    *   fetches github & gitlab VCS profiles of entered user from backend
    *   and sets them to state
    */ 
    handleClickOnSearch() {
        this.setState({isFetchingRepos: false});
        this.setState({isFetchingProfile: true})
        var user = document.getElementById('search-input').value;
        this.setState({username: user})
        
        //GET GitHub profile
        fetch('/search/github/' + user)
        .then(res => res.json())
        .then(data => {
            this.setState({githubProfile: data})
        }).catch(err => {
            console.log(err)
        })  
        
        //GET GitLab Profile
        fetch('/search/gitlab/' + user)
        .then(res => res.json())
        .then(data => {
            if (typeof data[0] === 'object') {
                this.setState({gitlabProfile: data[0]})
            } else {
                this.setState({gitlabProfile: null})
            }
            
        }).catch(err => {
            console.log(err)
        })  

        this.setState({username: user})
    }
    /**
     * triggered when 'see Repos' button clicked.
     * gets VCS provider name(github, gitlab or bitbucket) from button id.
     * changes state values so that <ProfileCard>'s are unmounted and <RepoContainer> is rendered and mounted
     * @param {DOM event} e used to get id name
     */
    handleClickOnRepos(e) {
        let btnId = e.target.id;
        let vscName = btnId.split('-')[1];

        this.setState({vcsSelected: vscName})
        this.setState({isFetchingRepos: true});
        this.setState({isFetchingProfile: false});
    }

    /**
     * triggered when 'back to profiles' button is clicked.
     * changes state values so that <RepoContainer> is unmounted and <ProfileCard>'s are rendered and mounted
     */
    handleClickOnProfiles() {
        this.setState({isFetchingRepos: false});
        this.setState({isFetchingProfile: true});
    }



    render() {
        
        return (
            <div>
                <header className="bg-dark py-4 shadow">
                    <a href='/' className="display-5 text-decoration-none text-light">
                         <span className="fw-bold">V</span>ersion <span className="fw-bold">C</span>ontrol <span className="fw-bold">S</span>ystem <br/>
                         Browser
                    </a>
                </header> 
                <div className="container">
                    <p className="lead my-3">
                        a full-stack web application that interfaces with the three most popular VCS
                        providers to facilitate a seamless browsing experience. Integrated with the GitHub,
                        GitLab, and BitBucket API’s 
                    </p>

                    <div>
                        <div className="d-flex my-5 mx-auto" style={{width: '18rem'}}>
                           <input type="search" id="search-input" className="form-control me-2 rounded-0" placeholder="search for a user..."></input> 
                           <button className="btn btn-outline-success rounded-0" href="/github" type="button" onClick={this.handleClickOnSearch}>Search</button>
                        </div>
                        
                    </div>
                    

                    {this.state.isFetchingProfile ?
                        <div>
                            <p>Showing results for {this.state.username}: </p>
                            <div className="d-flex flex-wrap justify-content-around">
                                <ProfileCard fetchRepos={this.handleClickOnRepos} profile={this.state.githubProfile} vcs='GitHub'/>
                                <ProfileCard fetchRepos={this.handleClickOnRepos}  profile={this.state.gitlabProfile} vcs='GitLab'/>
                                <ProfileCard fetchRepos={this.handleClickOnRepos} vcs='BitBucket'/>
                            </div>                            
                        </div>
                        : <div></div>
                    }
                    {this.state.isFetchingRepos ? 
                        <div>
                            <button className="btn btn-success my-3" onClick={this.handleClickOnProfiles}>
                                <i className="bi bi-chevron-left"> </i>
                                Back to profiles
                            </button>
                            <RepoContainer username={this.state.username} vcs={this.state.vcsSelected}/>
                        </div>    
                        : <div></div>                        
                    }
                </div>             
            </div>

        )
    }
}

export default Main