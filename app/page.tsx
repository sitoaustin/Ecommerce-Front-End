'use client';

export default function Home() {
  const postData = async () => {
    const newCustomer = await fetch('https://api.paystack.co/customer', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'naka2@email.com',
        first_name: 'Zero',
        last_name: 'Sum',
        phone: '+2348123456789',
      }),
    });
    const data = await newCustomer.json();
    console.log(data.data.id);
  };

  const getCustomers = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const customers = await fetch(
      'https://api.paystack.co/customer/naka@email.com',
      options
    );
    const data = await customers.json();
    console.log(data);
  };

  return (
    <main className='h-screen w-full bg-white text-black'>
      <h1 onClick={postData}>Hello World</h1>
      <h1 onClick={getCustomers}>getCustomers</h1>
    </main>
  );
}
