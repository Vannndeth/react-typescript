import { useEffect, useState } from 'react'
import './App.css'
import { Button, Modal } from 'flowbite-react';
import CardComponent from './component/CardComponent'
import FormCreateProduct from './component/FormCreateProduct';
import NavbarComponent from './component/NavbarComponent';
import FooterComponent from './component/FooterComponent';


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
  const [dataForm, setDataForm] = useState({});

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
  // get data from children component
  function getDataForm(product:any){
    // console.log(product)
    setDataForm(product)
  }

  const createProduct = () => {
    fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(dataForm),
      headers: {
        'content-type': 'application/json;',
      },
    }).then((res) => res.json()).then((data) => {
      console.log('Create Product Successfully..!')
      console.log(data)
    }).catch((err) => {
      console.log(err);
    })
    setOpenModal(false);

  }

  return (
    <div className='grid place-content-center p-5'>
      {/* Navbar */}
      <NavbarComponent/>

        <div className='flex justify-center p-6'>
          <Button onClick={()=>setCount(count+1)}>COUNT</Button>
        </div>
      <div className='text-center'>
        <h1 className='text-center'>{count}</h1>
      </div>
      <hr className='p-8'/>
      <div className='flex justify-center mb-8'>
        <Button onClick={() => setOpenModal(true)}>Create Product</Button> 
      </div>
      <hr className='p-8'/>
      <div className='container mx-auto grid grid-cols-4 gap-8 my-8'>
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create new product</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <FormCreateProduct getDataForm={getDataForm}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => createProduct()}>Add Product</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <FooterComponent/>
  </div>
  )
}

export default App
