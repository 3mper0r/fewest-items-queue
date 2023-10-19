import { useEffect, useState } from 'react'
import {MouseEvent} from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState<number>(0)
  const [queues, setQueue] = useState<number[][]>([[],[],[],[]])

  const onCheckout = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (items <= 0) return
    let leastAmount = 1e4
    let bestQueue: number[] | undefined = []
    for (const queue of queues) {
      const total = queue.reduce((current, value) => current + value, 0)
      if (total < leastAmount) {
        leastAmount = total
        bestQueue = queue
      }     
    }
    if(!bestQueue) return
    setQueue((prev) => 
      prev.map((newQue) => 
        newQue === bestQueue ? [...newQue, items] : newQue 
      )
    )
    setItems(0)
  }

  // useEffect(() => {
  //   if ( queues.some(qu => qu.some(q => q >0))) {
      
  //       const interval = setInterval(() => {
  //         setQueue(prev => 
  //           prev.map(queue => 
  //             [queue[0] - 1, ...queue.slice(1)]))
  //           }, 1000)
  //           return () => clearInterval(interval)
  //         }
  //       },[items, queues])

  return (
    <>
      <form>
        <input type="number" 
          value={items} 
          onChange={(e) => setItems(Number(e.target.value))}
          placeholder='0'
          />
        <button type='submit' onClick={onCheckout}>Checkout</button>
        <section>
          {
            queues.map((queue, qIdx) => (
              <div className='queue' key={qIdx}>
                {queue.map((item, iIdx) => (
                  <div className="items"key={iIdx}>{item}</div>
                ))}</div>
            ))
          }
        </section>
      </form>
     
    </>
  )
}

export default App
