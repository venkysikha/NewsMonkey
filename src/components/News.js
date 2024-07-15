import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTyes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
    static defaultProps={
      country:'in',
      pageSize:6,
      category:'science'
        }
    static propTypes={
      country:PropTyes.string,
      pageSize:PropTyes.number,
      category:PropTyes.string
    }


    capitilize=(string)=>
    {
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
   
    constructor(props)
    {
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitilize(this.props.category)}-Newsmonkey`
    }




  async updateNews()
  {
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({
        loading:true
    })
    let data=await fetch(url);
    let parseData=await data.json();
    this.setState(
      {
        articles:parseData.articles,
        loading:false,
        totalResults:parseData.totalResults
      }
    )
  }
  async componentDidMount()
  {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
    // let data=await fetch(url);
    // let parseData=await data.json();
    // this.setState({articles:parseData.articles,
    // }) 
    this.updateNews();
  }
  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
        this.setState({ page: 1, articles: [] }, this.updateNews);
    }
}

  handlenext=async()=>
  {

    
    if(this.state.page+1>Math.ceil(this.state.totalResults/20))
    {
      console.log("next");
    }
    else
    {
    this.setState({page:this.state.page+1});
    this.updateNews();
  }
  }
  handleprev=async()=>
  {
    console.log("previous");
    this.setState({page:this.state.page-1});
    this.updateNews();

  }

fetchData=async ()=>
{
  this.setState({page:this.state.page+1});
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({
        loading:true
    })
    let data=await fetch(url);
    let parseData=await data.json();
    this.setState(
      {
        articles:this.state.articles.concat(parseData.articles),
        loading:false,
        totalResults:parseData.totalResults
      }
    )
}
  render() {
    return (
      <div className='container'>
        <h2 style={{textAlign:"center",margin:"35px 0px"}}> NewsMonkey-trending newsApp</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length} 
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Spinner/>}
          >
      <div className='container'>
        <div className='row'>
        {this.state.articles.map((element)=>
        {
           return <div className='col-md-4' key={element.url} >
                  <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
               </div >
        })}
        </div>
        </div>
        </InfiniteScroll>
      </div>
    )
  }
}

export default News
