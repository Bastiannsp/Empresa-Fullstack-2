import React, { useCallback, useEffect, useMemo, useState } from 'react';
import UserService from '../services/UserService';
import { useAuth } from '../context/AuthContext';

const PAYMENT_TYPES = [
  { value: 'CREDIT_CARD', label: 'Tarjeta de crédito' },
  { value: 'DEBIT_CARD', label: 'Tarjeta de débito' },
  { value: 'PAYPAL', label: 'PayPal' },
  { value: 'BANK_TRANSFER', label: 'Transferencia bancaria' },
  { value: 'OTHER', label: 'Otro' }
];

const emptyMethodForm = {
  id: null,
  type: 'CREDIT_CARD',
  provider: '',
  holderName: '',
  lastFour: '',
  expirationMonth: '',
  expirationYear: '',
  defaultMethod: false
};

function Profile() {
  const { user, updateSessionUser } = useAuth();
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', address: '' });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [methodForm, setMethodForm] = useState(() => ({ ...emptyMethodForm }));
  const [methodSaving, setMethodSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);
  const [methodMessage, setMethodMessage] = useState(null);

  const sortedMethods = useMemo(() => {
    const copy = [...paymentMethods];
    copy.sort((a, b) => Number(b.defaultMethod) - Number(a.defaultMethod));
    return copy;
  }, [paymentMethods]);

  const loadProfile = useCallback(async () => {
    try {
      const { data } = await UserService.getProfile();
      setProfile({
        fullName: data.fullName ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        address: data.address ?? ''
      });
      setPaymentMethods(data.paymentMethods ?? []);
    } catch (error) {
      setProfileMessage({ type: 'danger', text: 'No pudimos cargar tu perfil. Intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileMessage(null);
    setProfileSaving(true);
    try {
      const payload = {
        fullName: profile.fullName?.trim() || '',
        email: profile.email?.trim() || '',
        phone: profile.phone?.trim() || '',
        address: profile.address?.trim() || ''
      };
      const { data } = await UserService.updateProfile(payload);
      setProfile({
        fullName: data.fullName ?? '',
        email: data.email ?? '',
        phone: data.phone ?? '',
        address: data.address ?? ''
      });
      setPaymentMethods(data.paymentMethods ?? []);
      setProfileMessage({ type: 'success', text: 'Perfil actualizado correctamente.' });
      updateSessionUser({ fullName: data.fullName ?? '', email: data.email ?? '' });
    } catch (error) {
      const apiMessage = error?.response?.data?.message || 'No se pudo guardar el perfil.';
      setProfileMessage({ type: 'danger', text: apiMessage });
    } finally {
      setProfileSaving(false);
    }
  };

  const resetMethodForm = useCallback(() => {
    setMethodForm({ ...emptyMethodForm });
  }, []);

  const handleMethodChange = (event) => {
    const { name, value, type, checked } = event.target;
    setMethodForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const upsertPaymentMethod = (method) => {
    setPaymentMethods((current) => {
      const cleared = method.defaultMethod
        ? current.map((item) => ({ ...item, defaultMethod: false }))
        : current.slice();

      const exists = cleared.some((item) => item.id === method.id);
      if (exists) {
        return cleared.map((item) => (item.id === method.id ? method : item));
      }
      return [...cleared, method];
    });
  };

  const handleMethodSubmit = async (event) => {
    event.preventDefault();
    setMethodMessage(null);
    setMethodSaving(true);
    try {
      const payload = {
        type: methodForm.type,
        provider: methodForm.provider.trim(),
        holderName: methodForm.holderName.trim(),
        lastFour: methodForm.lastFour.trim(),
        expirationMonth: methodForm.expirationMonth ? Number(methodForm.expirationMonth) : null,
        expirationYear: methodForm.expirationYear ? Number(methodForm.expirationYear) : null,
        defaultMethod: Boolean(methodForm.defaultMethod)
      };

      const response = methodForm.id
        ? await UserService.updatePaymentMethod(methodForm.id, payload)
        : await UserService.createPaymentMethod(payload);

      upsertPaymentMethod(response.data);
      setMethodMessage({
        type: 'success',
        text: methodForm.id ? 'Método de pago actualizado.' : 'Método de pago guardado.'
      });
      resetMethodForm();
    } catch (error) {
      const apiMessage = error?.response?.data?.message || 'No se pudo guardar el método de pago.';
      setMethodMessage({ type: 'danger', text: apiMessage });
    } finally {
      setMethodSaving(false);
    }
  };

  const handleEditMethod = (method) => {
    setMethodMessage(null);
    setMethodForm({
      id: method.id,
      type: method.type,
      provider: method.provider,
      holderName: method.holderName,
      lastFour: method.lastFour,
      expirationMonth: method.expirationMonth ?? '',
      expirationYear: method.expirationYear ?? '',
      defaultMethod: method.defaultMethod
    });
  };

  const handleDeleteMethod = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este método de pago?')) {
      return;
    }
    try {
      await UserService.deletePaymentMethod(id);
      setPaymentMethods((current) => current.filter((method) => method.id !== id));
      if (methodForm.id === id) {
        resetMethodForm();
      }
    } catch (error) {
      setMethodMessage({ type: 'danger', text: 'No se pudo eliminar el método de pago.' });
    }
  };

  const handleMarkDefault = async (id) => {
    try {
      const { data } = await UserService.markDefaultPaymentMethod(id);
      upsertPaymentMethod(data);
      setMethodMessage({ type: 'success', text: 'Método marcado como principal.' });
    } catch (error) {
      setMethodMessage({ type: 'danger', text: 'No se pudo actualizar el método de pago.' });
    }
  };

  if (loading) {
    return (
      <div className="container my-5">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Mi perfil</h1>

      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Información de la cuenta</h2>
          {user?.username && (
            <span className="badge text-bg-secondary">Usuario: {user.username}</span>
          )}
        </div>

        {profileMessage && (
          <div className={`alert alert-${profileMessage.type}`} role="alert">
            {profileMessage.text}
          </div>
        )}

        <form className="card p-4" onSubmit={handleProfileSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                maxLength={100}
                placeholder="Nombre y apellido"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                maxLength={30}
                placeholder="Ej: +56 9 1234 5678"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
                maxLength={200}
                placeholder="Calle, número y comuna"
              />
            </div>
          </div>
          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={profileSaving}>
              {profileSaving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <button type="button" className="btn btn-outline-secondary" disabled={profileSaving} onClick={loadProfile}>
              Restablecer
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="h4 mb-3">Métodos de pago</h2>

        {methodMessage && (
          <div className={`alert alert-${methodMessage.type}`} role="alert">
            {methodMessage.text}
          </div>
        )}

        <div className="row g-3 mb-4">
          {sortedMethods.map((method) => (
            <div className="col-md-6" key={method.id}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h3 className="h5 mb-1">{PAYMENT_TYPES.find((opt) => opt.value === method.type)?.label ?? method.type}</h3>
                      <p className="mb-1 text-muted">{method.provider} · {method.holderName}</p>
                      <p className="mb-1">Terminada en •••• {method.lastFour}</p>
                      {method.expirationMonth && method.expirationYear && (
                        <p className="mb-1 text-muted">Vence: {String(method.expirationMonth).padStart(2, '0')}/{method.expirationYear}</p>
                      )}
                    </div>
                    {method.defaultMethod && (
                      <span className="badge text-bg-primary">Principal</span>
                    )}
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => handleEditMethod(method)}>
                      Editar
                    </button>
                    {!method.defaultMethod && (
                      <button className="btn btn-sm btn-outline-success" type="button" onClick={() => handleMarkDefault(method.id)}>
                        Marcar principal
                      </button>
                    )}
                    <button className="btn btn-sm btn-outline-danger" type="button" onClick={() => handleDeleteMethod(method.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {sortedMethods.length === 0 && (
            <div className="col-12">
              <div className="alert alert-secondary" role="alert">
                Aún no tienes métodos de pago registrados.
              </div>
            </div>
          )}
        </div>

        <div className="card p-4">
          <h3 className="h5 mb-3">{methodForm.id ? 'Editar método' : 'Agregar método'}</h3>
          <form onSubmit={handleMethodSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tipo de pago</label>
              <select
                className="form-select"
                name="type"
                value={methodForm.type}
                onChange={handleMethodChange}
                required
              >
                {PAYMENT_TYPES.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Proveedor</label>
              <input
                type="text"
                className="form-control"
                name="provider"
                value={methodForm.provider}
                onChange={handleMethodChange}
                maxLength={80}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Titular</label>
              <input
                type="text"
                className="form-control"
                name="holderName"
                value={methodForm.holderName}
                onChange={handleMethodChange}
                maxLength={100}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Últimos 4 dígitos</label>
              <input
                type="text"
                className="form-control"
                name="lastFour"
                value={methodForm.lastFour}
                onChange={handleMethodChange}
                maxLength={4}
                pattern="\\d{4}"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Mes vencimiento</label>
              <input
                type="number"
                className="form-control"
                name="expirationMonth"
                value={methodForm.expirationMonth}
                onChange={handleMethodChange}
                min={1}
                max={12}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Año vencimiento</label>
              <input
                type="number"
                className="form-control"
                name="expirationYear"
                value={methodForm.expirationYear}
                onChange={handleMethodChange}
                min={2024}
                max={2100}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="form-check mt-3 mt-md-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="defaultMethod"
                  name="defaultMethod"
                  checked={Boolean(methodForm.defaultMethod)}
                  onChange={handleMethodChange}
                />
                <label className="form-check-label" htmlFor="defaultMethod">
                  Marcar como método principal
                </label>
              </div>
            </div>
            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-success" disabled={methodSaving}>
                {methodSaving ? 'Guardando...' : methodForm.id ? 'Guardar cambios' : 'Agregar método'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={resetMethodForm} disabled={methodSaving}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Profile;
