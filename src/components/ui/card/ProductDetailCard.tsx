import React from 'react';
import { ShoppingCart, Package, Palette, HardDrive, Tag } from 'lucide-react';
import { Button } from '../Button';
import { ProductDetail, ProductDetailResponse } from '../../../types/Product';

interface ProductDetailCardProps {
  product: ProductDetailResponse;
  onAddToCart: (productDetailId: string) => void;
}

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ 
  product, 
  onAddToCart 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStockStatus = () => {
    if (product.stockQuantity === 0) {
      return { text: 'Out of Stock', className: 'bg-red-100 text-red-800' };
    } else if (product.stockQuantity < 10) {
      return { text: 'Low Stock', className: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { text: 'In Stock', className: 'bg-green-100 text-green-800' };
    }
  };

  const stockStatus = getStockStatus();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col h-full">
      {/* Product Image */}
      <div className="aspect-w-16 aspect-h-12 bg-gray-200 flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.variantName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {product.variantName}
          </h3>
          <span className="ml-2 text-lg font-bold text-orange-500">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Product Details */}
        <div className="space-y-2 mb-4 flex-1">
          {/* SKU */}
          <div className="flex items-center text-sm text-gray-600">
            <Tag className="h-4 w-4 mr-2 text-gray-400" />
            <span className="font-medium">SKU:</span>
            <span className="ml-1 font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {product.sku}
            </span>
          </div>

          {/* Color */}
          {product.color && (
            <div className="flex items-center text-sm text-gray-600">
              <Palette className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">Color:</span>
              <span className="ml-1">{product.color}</span>
            </div>
          )}

          {/* Storage */}
          {product.storage && (
            <div className="flex items-center text-sm text-gray-600">
              <HardDrive className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">Storage:</span>
              <span className="ml-1">{product.storage}</span>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Package className="h-4 w-4 mr-2 text-gray-400" />
              <span className="font-medium">Stock:</span>
              <span className="ml-1">{product.stockQuantity} units</span>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.className}`}>
              {stockStatus.text}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto">
          <Button
            onClick={() => onAddToCart(product.detailId)}
            className="w-full bg-orange-600 hover:bg-orange-700"
            size="sm"
            disabled={product.stockQuantity === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};