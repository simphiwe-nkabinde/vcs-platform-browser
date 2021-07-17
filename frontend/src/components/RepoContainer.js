import React from "react";
import Repo from "./Repo";

class RepoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            reposCommits: []
        }

    }
    /**
     * when component mounts,
     * gets user repos & repo commits of each repo from backend.
     * Each [{repo-obj}, [repo-commits]] array is .pushed() to state.reposCommits[]
     */
    componentDidMount() {
        let reposArr;
        fetch('/repos/'+ this.props.vcs+'/' + this.props.username)
        .then(res => res.json())
        .then(repos => {
            reposArr = repos;

            reposArr.forEach(repo => {
                let commits;
                let user;
                if (this.props.vcs === 'github') {user = repo.owner.login}
                else if (this.props.vcs === 'gitlab') {user = 'gitlab'}

                fetch('/commits/'+ this.props.vcs +'/'+ user +'/'+ repo.name + '/' + repo.id)
                .then(res => res.json())
                .then(data => {
                    commits = data;
                    this.state.reposCommits.push([repo, commits]);
                }).catch(err => {
                    console.log(err)
                })
            });
        }).catch(err => {
            console.log(err)
        })
        /*
        *when state.isLoaded === true, <Repo> components will be rendered. setTimeout callback 
        *is made so that the rendering does not occurr before the fetch api's have all recevived response
        *data that must all be pushed to state.reposCommit[]
        */ 
        setTimeout(()=> {
           this.setState({isloaded:true}) 
        }, 3000)
    }


    render() {
        let reposList;
        if (this.state.reposCommits.length > 0) {
            reposList = this.state.reposCommits.map((item, index) => (<Repo key={index} repo={item} vcs={this.props.vcs}/>))
        } else {
            reposList = 'No Repositories found';
        }

        return (
            <div className="border border-dark rounded-0">
                <div className="card-header mb-3 bg-dark text-light rounded-0">
                    <h4>Repositories</h4>  
                </div>
                {!this.state.isloaded ? 
                    <div>
                        <p>Loading Repos</p>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>                    
                    </div>
                :    
                    <div className="p-3">
                        {reposList}
                    </div>               
                }
            </div>
        )        
    }

}

export default RepoContainer