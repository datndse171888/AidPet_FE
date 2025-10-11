import { Eye, Heart, PawPrint } from "lucide-react";
import { AnimalResponse } from "../../../types/Animal";
import { Button } from "../Button";

// Create a custom card component for public view
interface PublicAnimalCardProps {
  animal: AnimalResponse;
  onViewDetail: (animal: AnimalResponse) => void;
  onAdopt: (animal: AnimalResponse) => void;
  isLoading?: boolean;
}

export const PublicAnimalCard: React.FC<PublicAnimalCardProps> = ({
  animal,
  onViewDetail,
  onAdopt,
  isLoading = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex-shrink-0">
        <img
          src={animal.imgUrl}
          alt={animal.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">
            {animal.name}
          </h3>
          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Available
          </span>
        </div>

        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <PawPrint className="h-4 w-4 mr-1" />
              <span>{animal.breed}</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              <span>{animal.age} years old</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">{animal.gender}</span>
            {animal.categoryAnimals && (
              <>
                <span className="mx-2">•</span>
                <span>{animal.categoryAnimals.categoryName}</span>
              </>
            )}
          </div>

          {animal.shelter && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">Shelter:</span>
              <span className="ml-1">{animal.shelter.shelterName}</span>
            </div>
          )}

          <p className="text-sm text-gray-600 line-clamp-2 mt-2">
            {animal.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-auto">
          <Button
            onClick={() => onViewDetail(animal)}
            variant="outline"
            size="sm"
            className="flex-1 flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>

          <Button
            onClick={() => {onAdopt(animal)}}
            size="sm"
            className="flex-1 flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Heart className="h-4 w-4 mr-1" />
            {isLoading ? 'Submitting...' : 'Adopt Me'}
          </Button>
        </div>
      </div>
    </div>
  );
};