import { useEffect, useState } from 'react'
import './App.css'
import { Button, Modal } from 'flowbite-react';
import CardComponent from './component/CardComponentl'
import FormCreateProduct from './component/FormCreateProduct';


type Status = 'idle' | 'loading' | 'success' | 'error'
type Product = {
  readonly id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string
}

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<Status>('idle')
  useEffect(() => {
    setStatus('loading')
    fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {
      setProducts(data)
      setStatus('success')

    }).catch(err => {
      setStatus('error')
    });
  }, [])
  const loading = "https://solwincdn-79e1.kxcdn.com/wp-content/uploads/2020/07/Website-Loading-gif..gif";

  if(status === 'loading') {
    return (
      <div className='grid place-content-center h-screen'>
        <img src={loading} alt="loading..." />
      </div>
    )
  }

  return (
    <div className='grid place-content-center p-5'>
      <div className='flex justify-center p-6'>
          <Button onClick={()=>setCount(count+1)}>COUNT</Button>
        </div>
        <div className='text-center'>
          <h1 className='text-center'>{count}</h1>
        </div>
        <hr className='p-8'/>
      <div className='flex justify-center mb-8'>
        <Button onClick={() => setOpenModal(true)}>Add Product</Button>
      </div>
      <hr className='p-8'/>
      <div className='container mx-auto grid grid-cols-4 h-screen gap-8'>
        {products.map((product) => (
        <CardComponent
          key={product.id} 
          title={product.title}
          image={product.image}
          price={product.price}
          />
        ))}
      </div>
      
      {/* Modal */}
     
  </div>
  )
}

export default App
