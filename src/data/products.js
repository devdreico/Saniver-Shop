const image = (photoId) => `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=700&q=80`;

export const products = [
  { id: "vitamina-d3", name: "Vitamina D3", detail: "60 cápsulas · 1000 UI", category: "Suplementos", price: 38900, badge: "MÁS ELEGIDO", imageUrl: image("photo-1571781926291-c477ebfd024b") },
  { id: "omega-3", name: "Omega 3", detail: "60 cápsulas · aceite de pescado", category: "Suplementos", price: 52900, badge: "", imageUrl: image("photo-1550572017-edd951b55104") },
  { id: "magnesio", name: "Magnesio", detail: "60 tabletas · 500 mg", category: "Suplementos", price: 41900, badge: "", imageUrl: image("photo-1607619056574-7b8d3ee536b2") },
  { id: "vitamina-c", name: "Vitamina C", detail: "30 tabletas · 500 mg", category: "Suplementos", price: 24900, badge: "", imageUrl: image("photo-1611930022073-b7a4ba5fcccd") },
  { id: "protector-solar", name: "Protector solar SPF 50+", detail: "50 ml · amplio espectro", category: "Cuidado personal", price: 64900, badge: "DIARIO", imageUrl: image("photo-1556229010-6c3f2c9ca5f8") },
  { id: "hidratante", name: "Crema hidratante", detail: "250 ml · cuidado diario", category: "Cuidado personal", price: 45900, badge: "", imageUrl: image("photo-1608248543803-ba4f8c70ae0b") },
  { id: "limpiador", name: "Limpiador facial suave", detail: "200 ml · uso diario", category: "Cuidado personal", price: 39900, badge: "", imageUrl: image("photo-1556228720-195a672e8a03") },
  { id: "termometro", name: "Termómetro digital", detail: "Lectura digital · fácil de usar", category: "Botiquín", price: 28900, badge: "ÚTIL EN CASA", imageUrl: image("photo-1584308666744-24d5c474f2ae") },
  { id: "curitas", name: "Kit de primeros auxilios", detail: "Básicos para el hogar · 24 piezas", category: "Botiquín", price: 34900, badge: "", imageUrl: image("photo-1603398938378-e54eab446dde") },
  { id: "suero-oral", name: "Sales de rehidratación oral", detail: "Sobre · sabor neutro", category: "Botiquín", price: 5900, badge: "", imageUrl: image("photo-1547887538-e3a2f32cb1cc") },
  { id: "acetaminofen", name: "Acetaminofén", detail: "Tabletas · 500 mg", category: "Medicamentos OTC", price: 7900, badge: "CONSULTA AL FARMACÉUTICO", imageUrl: image("photo-1607619056574-7b8d3ee536b2") },
  { id: "ibuprofeno", name: "Ibuprofeno", detail: "Tabletas · 200 mg", category: "Medicamentos OTC", price: 9900, badge: "CONSULTA AL FARMACÉUTICO", imageUrl: image("photo-1584308666744-24d5c474f2ae") },
];

export const productCategories = ["Todos", "Suplementos", "Cuidado personal", "Botiquín", "Medicamentos OTC"];