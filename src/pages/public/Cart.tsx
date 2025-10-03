import React, { useState, useMemo } from 'react';
import { Search, Filter, Trash2, Plus, Minus } from 'lucide-react';
import { AnimalCard } from '../../components/ui/card/Card';
import { Button } from '../../components/ui/Button';

export const Cart: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // const filteredAnimals = useMemo(() => {
  //   return animals.filter(animal => {
  //     const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                          animal.breed.toLowerCase().includes(searchQuery.toLowerCase());
  //     const matchesSpecies = selectedSpecies === '' || animal.species === selectedSpecies;
  //     const matchesSize = selectedSize === '' || animal.size === selectedSize;
  //     const matchesAge = selectedAge === '' || 
  //                       (selectedAge === '0-2' && animal.age <= 2) ||
  //                       (selectedAge === '3-5' && animal.age >= 3 && animal.age <= 5) ||
  //                       (selectedAge === '6+' && animal.age >= 6);
      
  //     return matchesSearch && matchesSpecies && matchesSize && matchesAge;
  //   });
  // }, [animals, searchQuery, selectedSpecies, selectedSize, selectedAge]);

  // const totalPrice = cartItems.reduce((sum, item) => sum + (item.animal.price * item.quantity), 0);
  // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const species = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish'];
  const sizes = ['Small', 'Medium', 'Large'];
  const ageRanges = [
    { value: '0-2', label: '0-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '6+', label: '6+ years' }
  ];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecies('');
    setSelectedSize('');
    setSelectedAge('');
  };

  return (
    <></>
    // <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //   <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
    //     {/* Sidebar - Filters and Cart Summary */}
    //     <div className="lg:col-span-1">
    //       <div className="space-y-6">
    //         {/* Cart Summary */}
    //         <div className="bg-white p-6 rounded-lg shadow-md">
    //           <h3 className="text-lg font-semibold mb-4">Cart Summary</h3>
    //           <div className="space-y-2 mb-4">
    //             <div className="flex justify-between text-sm">
    //               <span>Items:</span>
    //               <span>{totalItems}</span>
    //             </div>
    //             <div className="flex justify-between text-sm">
    //               <span>Total:</span>
    //               <span className="font-semibold">${totalPrice}</span>
    //             </div>
    //           </div>
    //           <Button className="w-full mb-2" disabled={cartItems.length === 0}>
    //             Proceed to Adoption
    //           </Button>
    //           <Button
    //             variant="outline"
    //             className="w-full"
    //             onClick={onClearCart}
    //             disabled={cartItems.length === 0}
    //           >
    //             Clear Cart
    //           </Button>
    //         </div>

    //         {/* Search */}
    //         <div className="bg-white p-6 rounded-lg shadow-md">
    //           <h3 className="text-lg font-semibold mb-4">Search Animals</h3>
    //           <div className="relative">
    //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    //             <input
    //               type="text"
    //               placeholder="Search by name or breed..."
    //               value={searchQuery}
    //               onChange={(e) => setSearchQuery(e.target.value)}
    //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    //             />
    //           </div>
    //         </div>

    //         {/* Filters */}
    //         <div className="bg-white p-6 rounded-lg shadow-md">
    //           <div className="flex items-center justify-between mb-4">
    //             <h3 className="text-lg font-semibold">Filters</h3>
    //             <button
    //               onClick={() => setShowFilters(!showFilters)}
    //               className="lg:hidden flex items-center text-orange-600"
    //             >
    //               <Filter className="h-4 w-4 mr-1" />
    //               {showFilters ? 'Hide' : 'Show'}
    //             </button>
    //           </div>
              
    //           <div className={`space-y-4 ${showFilters || 'hidden lg:block'}`}>
    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-2">
    //                 Species
    //               </label>
    //               <select
    //                 value={selectedSpecies}
    //                 onChange={(e) => setSelectedSpecies(e.target.value)}
    //                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    //               >
    //                 <option value="">All Species</option>
    //                 {species.map(s => (
    //                   <option key={s} value={s}>{s}</option>
    //                 ))}
    //               </select>
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-2">
    //                 Size
    //               </label>
    //               <select
    //                 value={selectedSize}
    //                 onChange={(e) => setSelectedSize(e.target.value)}
    //                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    //               >
    //                 <option value="">All Sizes</option>
    //                 {sizes.map(s => (
    //                   <option key={s} value={s}>{s}</option>
    //                 ))}
    //               </select>
    //             </div>

    //             <div>
    //               <label className="block text-sm font-medium text-gray-700 mb-2">
    //                 Age
    //               </label>
    //               <select
    //                 value={selectedAge}
    //                 onChange={(e) => setSelectedAge(e.target.value)}
    //                 className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    //               >
    //                 <option value="">All Ages</option>
    //                 {ageRanges.map(age => (
    //                   <option key={age.value} value={age.value}>{age.label}</option>
    //                 ))}
    //               </select>
    //             </div>

    //             <Button
    //               variant="outline"
    //               className="w-full"
    //               onClick={clearFilters}
    //             >
    //               Clear Filters
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Main Content */}
    //     <div className="lg:col-span-3">
    //       <div className="mb-8">
    //         <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Animals</h1>
    //         <p className="text-gray-600">
    //           Showing {filteredAnimals.length} of {animals.length} animals
    //         </p>
    //       </div>

    //       {/* Cart Items */}
    //       {cartItems.length > 0 && (
    //         <div className="mb-8">
    //           <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart</h2>
    //           <div className="space-y-4">
    //             {cartItems.map(({ animal, quantity }) => (
    //               <div key={animal.id} className="bg-white p-4 rounded-lg shadow-md">
    //                 <div className="flex items-center space-x-4">
    //                   <img
    //                     src={animal.image}
    //                     alt={animal.name}
    //                     className="w-16 h-16 object-cover rounded-lg"
    //                   />
    //                   <div className="flex-1">
    //                     <h3 className="font-semibold text-gray-900">{animal.name}</h3>
    //                     <p className="text-sm text-gray-600">{animal.breed}</p>
    //                     <p className="text-sm text-orange-600">${animal.price}</p>
    //                   </div>
    //                   <div className="flex items-center space-x-2">
    //                     <button
    //                       onClick={() => onUpdateQuantity(animal.id, quantity - 1)}
    //                       className="p-1 rounded-md text-gray-500 hover:text-gray-700"
    //                     >
    //                       <Minus className="h-4 w-4" />
    //                     </button>
    //                     <span className="w-8 text-center">{quantity}</span>
    //                     <button
    //                       onClick={() => onUpdateQuantity(animal.id, quantity + 1)}
    //                       className="p-1 rounded-md text-gray-500 hover:text-gray-700"
    //                     >
    //                       <Plus className="h-4 w-4" />
    //                     </button>
    //                     <button
    //                       onClick={() => onRemoveFromCart(animal.id)}
    //                       className="p-1 rounded-md text-red-500 hover:text-red-700"
    //                     >
    //                       <Trash2 className="h-4 w-4" />
    //                     </button>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       )}

    //       {/* Animal Grid */}
    //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    //         {filteredAnimals.map((animal) => (
    //           <AnimalCard
    //             key={animal.id}
    //             animal={animal}
    //             onAddToCart={onAddToCart}
    //           />
    //         ))}
    //       </div>

    //       {filteredAnimals.length === 0 && (
    //         <div className="text-center py-16">
    //           <p className="text-gray-500 text-lg mb-4">No animals found matching your criteria</p>
    //           <Button onClick={clearFilters} variant="outline">
    //             Clear Filters
    //           </Button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
   );
};