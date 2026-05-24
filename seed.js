// Native fetch is available in Node 22

async function seedData() {
  console.log("Seeding data via API...");
  const baseUrl = "http://localhost:5069/api/v1";

  // Register a new user to get token
  let token;
  const registerRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      businessName: "Seeder Business " + Date.now(), 
      name: "Seeder", 
      email: "seeder" + Date.now() + "@willovate.com", 
      password: "Password123!" 
    })
  });
  
  const registerData = await registerRes.json();
  if (!registerRes.ok) {
    console.error("Register failed:", registerData);
    return;
  }
  
  token = registerData.data?.token || registerData.token;
  if (!token) {
      console.log("No token after register", registerData);
      return;
  }

  console.log("Logged in!");

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Create 2 offers
  const offers = [
    {
      title: "Spa Day Promo",
      description: "Relaxing full body spa",
      category: "Wellness",
      originalPrice: 150,
      offerPrice: 99,
      discountPercentage: 34,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      startTime: "09:00:00",
      endTime: "18:00:00",
      totalCapacity: 20,
      maxBookingPerCustomer: 1,
      termsAndConditions: "Non-refundable.",
      status: "Active"
    },
    {
      title: "Gym Trial Week",
      description: "1 week free gym trial",
      category: "Fitness",
      originalPrice: 50,
      offerPrice: 0,
      discountPercentage: 100,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      startTime: "06:00:00",
      endTime: "22:00:00",
      totalCapacity: 100,
      maxBookingPerCustomer: 1,
      termsAndConditions: "New members only.",
      status: "Active"
    }
  ];

  const createdOffers = [];
  for (const offer of offers) {
    const res = await fetch(`${baseUrl}/offers`, { method: 'POST', headers, body: JSON.stringify(offer) });
    const data = await res.json();
    if (res.ok) {
        console.log(`Created offer: ${offer.title}`);
        createdOffers.push(data.data || data);
    } else {
        console.error("Failed to create offer:", data);
    }
  }

  // If no offers, abort
  if (createdOffers.length === 0) return;

  // Create slots
  const slots = [];
  for (const offer of createdOffers) {
      // Add 2 slots for each
      for (let i = 1; i <= 2; i++) {
          const res = await fetch(`${baseUrl}/slots`, {
              method: 'POST', headers, body: JSON.stringify({
                  offerId: offer.id,
                  slotDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                  startTime: "10:00:00",
                  endTime: "11:00:00",
                  capacity: 10,
                  status: "Available"
              })
          });
          const data = await res.json();
          if (res.ok) {
              slots.push(data.data || data);
              console.log(`Created slot for ${offer.title}`);
          }
      }
  }

  // Create bookings
  for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const res = await fetch(`${baseUrl}/bookings`, {
          method: 'POST', headers, body: JSON.stringify({
              offerId: slot.offerId,
              slotId: slot.id,
              customerName: `Customer ${i}`,
              customerPhone: `123456789${i}`,
              customerEmail: `customer${i}@example.com`,
              peopleCount: 2,
              specialNote: "Please confirm"
          })
      });
      if (res.ok) {
          console.log(`Created booking for slot ${slot.id}`);
      }
  }

  console.log("Seeding complete!");
}

seedData().catch(console.error);
