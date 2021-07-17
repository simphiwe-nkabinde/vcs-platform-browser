import React from "react";

function Commit(props) {
    let message;
    let author;
    let date;
    if (props.vcs === 'github') {
        message = props.commit.commit.message;
        author = props.commit.commit.author.name;
        date = props.commit.commit.author.date;
    } else if (props.vcs === 'gitlab') {
        message = props.commit.message;
        author = props.commit.author_name;
        date = props.commit.authored_date;
    } else {
        //bitbucket
    }

    return (
        <div className="d-flex justify-content-between flex-wrap p-2 border border-secondary bg-light m-1">
            <p className="mb-0 text-start text-secondar">
                {message}
            </p>
            <p className="mb-0 d-flex flex-column text-start" style={{fontSize:'11px'}}>
                <span className="fw-bold">{author}</span> 
                <span className="text-muted" > commited on {new Date(date).toDateString()}</span>
            </p>
        </div>
    )
}

export default Commit