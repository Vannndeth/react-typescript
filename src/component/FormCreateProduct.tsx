
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';

type ErrorType = {
    title: string,
    price: string
}

export default function FormCreateProduct({getDataForm}: any) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [descriptin, setDescrption] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("https://vai.placeholder.com/150");

    const [error, setError] = useState<ErrorType>({
        title: "",
        price: ""
    });

    // Validation title and price
    useEffect(() => {
        if(title.length < 3){
            setError((prev) => {
                // console.log(prev)
                return {
                    ...prev, title: "Title must be at least 3 characters"
                    // , descriptin: "At least 10 characters"
                };
            })
        }else{
            setError((prev) => {
                return {
                    ...prev, title: ""
                };
            })
        }
        if(price < 0){
            setError((prev) => {
                // console.log(prev)
                return {
                    ...prev,price: "Price must be greater than 0$"
                };
            })
        }else{
            setError((prev) => {
                return {
                    ...prev, price: ""
                };
            })
        }
    }, [title, price])

    // Side effect to parent component
    useEffect(() => {
        getDataForm({title, price, descriptin, category, image})
    }, [title, price, descriptin, category, image])


  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Product title" />
        </div>
        <TextInput id="title" type="text" placeholder="Apple Vision Pro" required
        onChange={(e) => setTitle(e.target.value)}
         />
         {error.title && <p className='text-red-500'>{error.title}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Product price" />
        </div>
        <TextInput id="price" type="number" required 
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        {error.price && <p className='text-red-500'>{error.price}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="descriptin" value="Product descriptin" />
        </div>
        <Textarea id="descriptin" 
        onChange={(e) => setDescrption(e.target.value)}
        />
      </div>
    </form>
  );
}
