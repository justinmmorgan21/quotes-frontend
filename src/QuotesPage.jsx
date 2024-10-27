import axios from 'axios'
import { useState, useEffect } from 'react'
export function QuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [maxPages, setMaxPages] = useState(1);
  const [filterType, setFilterType] = useState("");
  const quotesPerPage = 15;

  const handleQuoteGeneration = () => {
    console.log("UPDATING QUOTES")
    axios.get("https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json").then(response => {
      console.log(response.data)
      filterType === "" ? setQuotes(response.data) : setQuotes(response.data.filter(quote => quote.theme === filterType))
      console.log(maxPages);
    })
  }

  const updateMaxPages = () => {
    setMaxPages(Math.floor(quotes.length / quotesPerPage + 1))
  }

  useEffect(handleQuoteGeneration, [filterType])
  useEffect(updateMaxPages, [quotes])
  const rows = []
  for (let i = (pageNumber-1)*15; i < quotes.length && i < (pageNumber-1)*15+15; i++) {
    const quote = quotes[i];
    rows.push(
      <div key={i}>
        <h3>Quote {i+1}:</h3>
        <p>{quote.quote}</p>
          <p><span>-{quote.source},</span><span style={{marginLeft: 20}}> {quote.theme.slice(0,-1)}: {quote.context}</span></p>
          <hr />
      </div>
    )
    console.log()
  }

  const updatePage = numChange => {
    const newPage = pageNumber + numChange
    if (newPage >= 1 && newPage <= maxPages)
      setPageNumber(pageNumber + numChange)
  }

  const updateFilter = (filter => {
    setFilterType(filter);
    setPageNumber(1);
  })


  return (
    <main>
      <h1>Quotes</h1>
      <button onClick={()=>updateFilter('')}>All Quotes</button>
      <button onClick={()=>updateFilter('movies')}>Movies</button>
      <button onClick={()=>updateFilter('games')}>Games</button>
      {rows}
      <p style={{textAlign:'center'}}><span style={{textDecoration:'underline', cursor:'pointer'}} onClick={()=>updatePage(-1)}>{'<<'}</span><span style={{margin:10}}> Page  {pageNumber} </span><span style={{textDecoration:'underline', cursor:'pointer'}} onClick={()=>updatePage(1)}>{'>>'}</span></p>
    </main>
  )
}

// DONE
// Required: Fetch quotes from the source quotes.json and display the available information in a list-like structure (table/list)
// quote, context, source, theme:movies/games
// Required: Provide client-side pagination (up to 15 quotes per page)



// Required: Provide a way to filter between game and movie quotes

// Required: Provide a client-side search that filters by the quote text
