import { useState, useEffect } from 'react';
import { X, Save, Store } from 'lucide-react';
import { whatsappService } from '../../infrastructure/dependencies';
import './SettingsModal.css';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [businessNumber, setBusinessNumber] = useState('');

    useEffect(() => {
        if (isOpen) {
            setBusinessNumber(whatsappService.getBusinessPhoneNumber());
        }
    }, [isOpen]);

    const handleSave = () => {
        // Remove any non-digit characters except +
        const cleanedNumber = businessNumber.replace(/[^\d+]/g, '');
        if (cleanedNumber.length >= 10) {
            whatsappService.setBusinessPhoneNumber(cleanedNumber);
            onClose();
        } else {
            alert('Por favor ingresa un número válido (mínimo 10 dígitos)');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="settings-overlay" onClick={onClose}>
            <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
                <div className="settings-header">
                    <h2>Configuración</h2>
                    <button className="settings-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="settings-body">
                    <div className="settings-field">
                        <label htmlFor="whatsapp-business-number">
                            <Store size={18} />
                            Número de WhatsApp del Negocio
                        </label>
                        <input
                            id="whatsapp-business-number"
                            type="tel"
                            className="input"
                            placeholder="Ej: 51999999999"
                            value={businessNumber}
                            onChange={(e) => setBusinessNumber(e.target.value)}
                        />
                        <p className="settings-hint">
                            Ingresa el número de WhatsApp del negocio donde recibirás las cotizaciones de los clientes.
                            <br />
                            Formato: código de país + número (sin el símbolo +).
                            <br />
                            <strong>Ejemplo:</strong> 51 999 999 999 (Perú)
                        </p>
                    </div>
                </div>

                <div className="settings-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save size={18} />
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
