'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, X, ShoppingCart, Zap } from 'lucide-react';

interface QuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    imageUrl?: string | null;
  } | null;
  onConfirm: (quantity: number) => void;
}

export default function QuantityModal({ isOpen, onClose, product, onConfirm }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);

  // Resetear cantidad a 1 al abrir o cambiar de producto
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleQtyChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) {
        alert(`El stock máximo disponible es de ${product.stock} unidades.`);
        return product.stock;
      }
      return next;
    });
  };

  const handleConfirm = () => {
    onConfirm(quantity);
    onClose();
  };

  return (
    <div className="quantity-modal-overlay" onClick={onClose}>
      <div className="quantity-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="quantity-modal-header">
          <h3>Seleccionar Cantidad</h3>
          <button className="close-modal-btn" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="quantity-modal-body">
          <div className="modal-product-info">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="modal-product-img" />
            ) : (
              <div className="modal-product-placeholder">
                <Zap size={20} style={{ color: 'var(--primary)' }} />
              </div>
            )}
            <div className="modal-product-details">
              <h4>{product.name}</h4>
              <span className="modal-product-price">
                ${product.price.toLocaleString('es-CL')}
              </span>
              <span className="modal-product-stock">
                Stock disponible: <strong>{product.stock}</strong> unidades
              </span>
            </div>
          </div>

          <div className="quantity-selection-wrapper">
            <span className="qty-label">Cantidad a llevar:</span>
            <div className="modal-qty-selector">
              <button 
                type="button" 
                className="modal-qty-btn"
                onClick={() => handleQtyChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus size={12} />
              </button>
              <span className="modal-qty-value">{quantity}</span>
              <button 
                type="button" 
                className="modal-qty-btn"
                onClick={() => handleQtyChange(1)}
                disabled={quantity >= product.stock}
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <div className="modal-total-price">
            Total estimado: <strong>${(product.price * quantity).toLocaleString('es-CL')}</strong>
          </div>
        </div>

        <div className="quantity-modal-footer">
          <button className="modal-btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="modal-btn-confirm" onClick={handleConfirm}>
            <ShoppingCart size={16} /> Añadir al Carro
          </button>
        </div>
      </div>
    </div>
  );
}
