import axios from 'axios'
import { useState, useEffect } from 'react'
export function QuotesPage() {
  const [originalQuotes, setOriginalQuotes] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [maxPages, setMaxPages] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");
  const [paginatedQuotes, setPaginatedQuotes] = useState([])
  const quotesPerPage = 15;

  const handleQuoteGeneration = () => {
    console.log("Stage 1")
    axios.get("https://gist.githubusercontent.com/benchprep/dffc3bffa9704626aa8832a3b4de5b27/raw/quotes.json").then(response => {
      setOriginalQuotes(response.data)
    })
  }

  const updateQuotes = () => {
    let filteredQuotes = filterType === "" ? originalQuotes : originalQuotes.filter(quote => quote.theme === filterType)
    filteredQuotes = filteredQuotes.filter(quote => quote.quote.toLowerCase().includes(search.toLowerCase()))
    filteredQuotes = filteredQuotes.map((quote,i) => ({actualQuote: quote, number:i+1}))
    
    setMaxPages(Math.ceil(filteredQuotes.length / quotesPerPage))
    setPaginatedQuotes(filteredQuotes.slice(
      (pageNumber - 1) * quotesPerPage,
      pageNumber * quotesPerPage))
  }

  useEffect(handleQuoteGeneration, [])
  useEffect(updateQuotes, [filterType, search, originalQuotes, pageNumber])

  const rows = []
  paginatedQuotes.map((quote,i) => {
    rows.push(
      <div key={i}>
        <h3>Quote {quote.number}:</h3>
        <p>{quote.actualQuote.quote}</p>
          <p><span>-{quote.actualQuote.source},</span><span style={{marginLeft: 20}}> {quote.actualQuote.theme.slice(0,-1)}: {quote.actualQuote.context}</span></p>
          <hr />
      </div>
    )
  })

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
      <div>
      <label htmlFor='search'>Search </label>
      <input type='text' name='search' id='search' value={search} onChange={event=>setSearch(event.target.value)}></input>
      </div>
      <br />
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
