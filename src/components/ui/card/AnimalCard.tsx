import React from 'react';
import { Eye, Edit, Trash2, Calendar, Tag, User, Heart } from 'lucide-react';
import { Button } from '../Button';
import { AnimalResponse } from '../../../types/Animal';

interface AnimalCardProps {
  animal: AnimalResponse;
  onViewDetail: (animal: AnimalResponse) => void;
  onEdit: (animal: AnimalResponse) => void;
  onDelete: (animalId: string) => void;
  showShelterInfo?: boolean;
}

export const AnimalCard: React.FC<AnimalCardProps> = ({
  animal,
  onViewDetail,
  onEdit,
  onDelete,
  showShelterInfo = true
}) => {
  const getStatusBadge = () => {
    switch (animal.status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'ADOPTED':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'RESCUED':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex-shrink-0">
        <img
          src={animal.imgUrl}
          alt={animal.name}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {animal.name}
          </h3>
          <span className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge()}`}>
            {animal.status}
          </span>
        </div>

        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{animal.breed}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{animal.age} years old</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{animal.gender}</span>
            </div>
            {animal.categoryAnimals && (
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                <span>{animal.categoryAnimals.categoryName}</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mt-2">
            {animal.description}
          </p>
        </div>

        {/* Actions - always at bottom */}
        <div className="flex space-x-2 mt-auto">
          <Button
            onClick={() => onViewDetail(animal)}
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          
          <Button
            onClick={() => onEdit(animal)}
            size="sm"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          <Button
            onClick={() => onDelete(animal.animalUuid)}
            variant="outline"
            size="sm"
            className="flex items-center justify-center text-red-600 hover:bg-red-50 border-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};