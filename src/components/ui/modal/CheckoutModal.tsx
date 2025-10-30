import React, { useEffect } from 'react';
import { X, User, Phone, Mail } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../input/Input';
import { OrderRequest, OrderDetailItem } from '../../../types/Order';
import { ProductResponse } from '../../../types/Product';
import { useAuth, useData } from '../../../hooks/AuthorizationRoute';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: OrderDetailItem[];
    products: ProductResponse[];
    onSubmitOrder: (orderData: OrderRequest) => void;
    totalPrice: number;
    isSubmitting?: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
    isOpen,
    onClose,
    cartItems,
    products,
    onSubmitOrder,
    totalPrice,
    isSubmitting = false
}) => {

    //=====================
    // State & Hooks
    //=====================

    // User info
    const user = useAuth();
    const userInfo = useData();

    //====================
    // fetch data & effects
    //====================

    useEffect(() => {

    }, []);

    //====================
    // Handlers & Helpers
    //====================

    const getProductById = (productId: string): ProductResponse | undefined => {
        return products.find(p => p.productId === productId);
    };

    //====================
    // Calculate totals
    //====================

    const subtotal = cartItems.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const orderData: OrderRequest = {
            userId: user?.uuid || '',
            orderDetails: cartItems
        };

        onSubmitOrder(orderData);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 backdrop-blur-sm bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden pointer-events-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                disabled={isSubmitting}
                            >
                                <X className="h-6 w-6 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                        <form onSubmit={handleSubmit} className="p-6 space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column - Order Summary */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                            {cartItems.map((item) => {
                                                const product = getProductById(item.productId);
                                                if (!product) return null;

                                                return (
                                                    <div key={item.productId} className="flex items-center space-x-4">
                                                        <img
                                                            src={product.imgUrl || 'https://via.placeholder.com/150'}
                                                            alt={product.variant_name}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-gray-900">{product.variant_name}</h4>
                                                            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-medium text-gray-900">
                                                                ${(product.price * item.quantity).toFixed(2)}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                ${product.price.toFixed(2)} each
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Totals */}
                                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>Subtotal:</span>
                                                    <span>${subtotal.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span>Tax:</span>
                                                    <span>${tax.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2">
                                                    <span>Total:</span>
                                                    <span>${total.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Customer & Shipping Info */}
                                <div className="space-y-6">
                                    {/* Customer Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                                        <div className="space-y-4">
                                            <Input
                                                label="Full Name"
                                                value={userInfo?.fullName}
                                                icon={<User/>}
                                                disabled
                                            />

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                    label="Email"
                                                    type="email"
                                                    value={userInfo?.email}
                                                    icon={<Mail />}
                                                    disabled
                                                />
                                                <Input
                                                    label="Phone"
                                                    value={userInfo?.phone}
                                                    icon={<Phone />}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-gray-900">
                                Total: ${total.toFixed(2)}
                            </div>
                            <div className="flex space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-orange-600 hover:bg-orange-700"
                                    disabled={isSubmitting || cartItems.length === 0}
                                    loading={isSubmitting}
                                >
                                    {isSubmitting ? 'Processing...' : 'Place Order'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};