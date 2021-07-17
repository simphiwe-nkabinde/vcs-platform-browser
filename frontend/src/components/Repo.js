import React from "react";
import Commit from "./commit";

class Repo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.showCommits = this.showCommits.bind(this);
        this.showInfo = this.showInfo.bind(this);
    }
    /**
     * switch to the 'recent commits' tab and hide 'Repo Info' tab,
     * by traversing the DOM
     * @param {DOM event} e used to get the 'recent commits' tab button element
     */
    showCommits(e) {
        e.target.classList.add('active')
        e.target.parentNode.previousSibling.firstChild.classList.remove('active')
        e.target.parentNode.parentNode.parentNode.nextSibling.classList.add('d-none')
        e.target.parentNode.parentNode.parentNode.nextSibling.nextSibling.classList.remove('d-none')
    }
    /**
     * switch to the 'repo info' tab and hide the 'recent commits' tab,
     * by traversing the DOM
     * @param {DOM event} e used to get the 'repo info' tab button element
     */
    showInfo(e) {
        e.target.classList.add('active')
        e.target.parentNode.nextSibling.firstChild.classList.remove('active')
        e.target.parentNode.parentNode.parentNode.nextSibling.classList.remove('d-none')
        e.target.parentNode.parentNode.parentNode.nextSibling.nextSibling.classList.add('d-none')
    }

    render() {
        const repoData = this.props.repo;
        let commitsList;
        //create <Commit> component for each repoData[1] object
        if (Array.isArray(repoData[1])) {
            commitsList = repoData[1].map((item, index) => (<Commit key={index} commit={item} vcs={this.props.vcs}/>));
        } else {
            commitsList = 'No Commits';
        }


        return (
            <div>
                <div className="card text-center rounded-0 my-3 border-secondary">
                    <div className="card-header d-flex justify-content-between align-items-center flex-wrap border-warning">
                        <h5>{repoData[0].name}</h5>
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <button className="nav-link active" aria-current="true" onClick={this.showInfo}>Repo Info</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={this.showCommits}>Recent Commits</button>
                            </li>
                        </ul>
                    </div>
                    {/* repo info tab */}
                    <div className="card-body text-start" id="repo-info">
                        <p className="card-text">{repoData[0].description}</p>
                        <p className="badge bg-success">{repoData[0].language}</p>
                        <p className="text-muted m-0">
                            <span className="fst-italic">Created on</span> 
                            {' ' + new Date(repoData[0].created_at).toDateString() + ', ' + new Date(repoData[0].created_at).toLocaleTimeString()}
                        </p>
                        <p className="text-muted">
                            <span className="fst-italic">Last updated on</span>
                            {' ' + new Date(repoData[0].updated_at || repoData[0].last_activity_at).toDateString() 
                            + ', ' + new Date(repoData[0].updated_at || repoData[0].last_activity_at).toLocaleTimeString()}
                        </p>
                        <a href={repoData[0].html_url || repoData[0].web_url} target="_blank" className="">Open repo</a>
                    </div>
                    {/* recent commits tab */}
                    <div className="card-body d-none" id="repo-commits">
                    {typeof repoData[1] === 'object' ? commitsList : 'no commits'}
                    </div>
                </div>
            </div>
        )
    }
}

export default Repo;