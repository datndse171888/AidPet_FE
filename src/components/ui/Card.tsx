import React from 'react';
import { Animal } from '../../types';
import { Button } from './Button';

interface AnimalCardProps {
  animal: Animal;
  onAddToCart: (animal: Animal) => void;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{animal.name}</h3>
          <span className="text-lg font-bold text-orange-500">${animal.price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-1">{animal.breed}</p>
        <p className="text-sm text-gray-500 mb-2">
          {animal.age} year{animal.age !== 1 ? 's' : ''} old • {animal.size}
        </p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{animal.description}</p>
        <div className="flex items-center gap-2 mb-3">
          {animal.vaccinated && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Vaccinated
            </span>
          )}
          {animal.neutered && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              ✓ Neutered
            </span>
          )}
        </div>
        <Button
          onClick={() => onAddToCart(animal)}
          className="w-full"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};