import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageurl,newsurl,author,date}=this.props
    return (
      <div>
        <div className="card" style={{width:"18rem"}}>
   <img src={imageurl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className='card-text'><small className='text-muted'>by {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsurl} target='_blank' rel="noreferrer" className="btn btn-dark">readmore</a>
  </div>
</div>
</div>
    )
  }
}

export default NewsItem
