import React, {useContext} from 'react'
import { Link } from "react-router-dom"
import AppContext from './context'



export default function Left() {
  const state = useContext(AppContext)    
  if  (!state.categories){
    return <div><img src={require('./loading.gif')} alt="loading..."/></div>
  }
  else{
    const categories = {}
    let total = 0
    for (const p of Object.values(state.products)){
      total += 1
      if (p.category.title in categories){
        categories[p.category.title] = categories[p.category.title] + 1
      }
      else {
        categories[p.category.title] = 1
      }
      // categories[p.category] = (categories[p.category] || 0) + 1 // this is the best javascript practice
    }
    return (
        <div>
          <h3>
            Product Categories:
          </h3>
          <div className="p-2 border rounded" style={{backgroundColor:'royalBlue'}}>
            <Link to={{
              pathname: '/',
              }} className="" style={{color:'white'}}>All Catergories ({total})
            </Link>
          </div>
          {Object.entries(categories).map(([key, value]) => {
              return(
                <div className="p-2 border rounded" style={{backgroundColor:'royalBlue'}} key={key}>
                  <Link key={key} to={{
                      pathname: '/type/'+key,
                    }} className="" style={{color:'white'}}>{key}({value})
                  </Link>
                </div>
              )
          })}
        </div>      
      )
    }
  }

    
    
