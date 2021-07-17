import React from "react";

function ProfileCard(props) {
    let iconClass = '';
    if (props.vcs === 'GitHub') {
        iconClass = 'bi bi-github';
    }

    return (

        <div className="card rounded-0 my-2 shadow-sm">
            <div className="card-header bg-dark text-light d-flex justify-content-between">
                <div>
                    <i className={iconClass}> </i>
                    {props.vcs}                    
                </div>
                <div>
                    {props.profile ? props.profile.login || props.profile.username : ''}
                </div>

            </div>
            {!props.profile ?
                 <div className="card-body rounded-0">No Profile found </div>
            :
                <div className="d-md-flex justify-content-around card-body rounded-0">
                    <div className="mx-aut">
                        <img src={props.profile.avatar_url} alt="profile" className="rounded-circle mx-3"  style={{width:'10rem'}}/>   
                        <p className="card-title">{props.profile.name}</p>
                    </div>
                    <div className="text-start">
                        <p className="card-text">
                            {props.profile.bio || props.profile.state || ''}
                        </p>
                        <p>
                            {props.profile.followers ? props.profile.followers + '  Followers' : ''} 
                        </p>
                        <p>
                            <span className="bg-success badge rounded-circle p-2 me-2 border border-success bg-light text-dark">{props.profile.public_repos}</span>
                            {props.profile.public_repos ? 'Repositories' : ''}
                        </p>

                        <button className="btn btn-outline-primary rounded-0" id={'repoBtn-' + props.vcs.toLowerCase()} onClick={props.fetchRepos}>
                            View Repos
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProfileCard