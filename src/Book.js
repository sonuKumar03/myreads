import React from 'react'

export default function Book({ book:{id, imageLinks, title, authors },handleMove}) {
    return (
        <div  className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${!(typeof imageLinks==='undefined')?(imageLinks.thumbnail):''}")` }} />
          <div className="book-shelf-changer">
            <select name='moveBook' onChange={e=>handleMove(e,id)} value='move'>
                {/* add selected:true to the option so that option becomes  avaialble 
                    or 
                    add defaultValue for the select
                */}
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{(authors)?authors.map((author) => author):null}</div>
      </div>
    )
}
