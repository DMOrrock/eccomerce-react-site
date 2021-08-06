import React, {useContext} from 'react'
import AppContext from './context'

function Right() {
    const state = useContext(AppContext)
    // let reverseList = state.recentList.reverse()
    return (
        <div>
            <h4 className="p-3">Recent Products:</h4>
            {state.recentList.map((item) => {
                return(
                    <h5 key={item}>
                        {Object.values(state.products).find(x => x.id === item).name}
                    </h5>
                )
            })}
        </div>
    )  
}

export default Right;