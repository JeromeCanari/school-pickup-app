import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

// Initialize EmailJS with your public key (you'll add this after setting up EmailJS)
emailjs.init("YOUR_PUBLIC_KEY"); // We'll replace this later

function App() {
  const [selectedKids, setSelectedKids] = useState({
    elea: false,
    malo: false
  });
  
  const [pickupDate, setPickupDate] = useState('');
  
  const [recipients, setRecipients] = useState({
    ecole_anse: true,
    eloise: false,  // Elea's teacher (3/4e année)
    valerie: false, // Malo's teacher (1ere année)
    adele: true     // Admin
  });

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-update recipients based on selected kids
  useEffect(() => {
    setRecipients(prev => ({
      ...prev,
      eloise: selectedKids.elea,
      valerie: selectedKids.malo
    }));
  }, [selectedKids]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPickupDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleKidChange = (kid) => {
    setSelectedKids(prev => ({
      ...prev,
      [kid]: !prev[kid]
    }));
  };

  const handleRecipientChange = (recipient) => {
    setRecipients(prev => ({
      ...prev,
      [recipient]: !prev[recipient]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName} ${day} ${month} ${year}`;
  };

  const getKidsText = () => {
    if (selectedKids.elea && selectedKids.malo) {
      return 'Elea et Malo Coppens';
    } else if (selectedKids.elea) {
      return 'Elea Coppens';
    } else if (selectedKids.malo) {
      return 'Malo Coppens';
    }
    return '';
  };

  const getSubjectLine = () => {
    const kidsText = getKidsText();
    if (!kidsText || !pickupDate) return '';
    
    const date = new Date(pickupDate);
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('fr-FR', { month: 'long' });
    const year = date.getFullYear();
    
    return `Pas de bus (205) pour ${kidsText} - ${formatDate(pickupDate)}`;
  };

  const getEmailBody = () => {
    const kidsText = getKidsText();
    if (!kidsText || !pickupDate) return '';

    const date = new Date(pickupDate);
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('fr-FR', { month: 'long' });
    const year = date.getFullYear();
    
    const verb = (selectedKids.elea && selectedKids.malo) ? 'ne prendront pas' : 'ne prendra pas';
    
    return `Bonjour !

Veuillez s'il vous plaît prendre note que ${kidsText} ${verb} le bus (205) ce ${formatDate(pickupDate)}.

Merci d'avance et excellent début de semaine !

Jerome et Stephanie Coppens - Lesieur`;
  };

  const getRecipientEmails = () => {
    const emails = [];
    if (recipients.ecole_anse) emails.push('ecole_anse_au_sable@csf.bc.ca');
    if (recipients.eloise) emails.push('eloise_lescaut@csf.bc.ca');
    if (recipients.valerie) emails.push('valerie_desnoyers@csf.bc.ca');
    if (recipients.adele) emails.push('adele_anctil@csf.bc.ca');
    return emails.join(', ');
  };

  const handleSend = async () => {
    if (!selectedKids.elea && !selectedKids.malo) {
      setMessage('❌ Veuillez sélectionner au moins un enfant');
      return;
    }

    if (!pickupDate) {
      setMessage('❌ Veuillez sélectionner une date');
      return;
    }

    const selectedRecipients = Object.values(recipients).filter(Boolean).length;
    if (selectedRecipients === 0) {
      setMessage('❌ Veuillez sélectionner au moins un destinataire');
      return;
    }

    setSending(true);
    setMessage('');

    try {
      // EmailJS template parameters
      const templateParams = {
        to_email: getRecipientEmails(),
        cc_email: 'jerome.coppens@gmail.com, stephanie.lesieur@gmail.com',
        subject: getSubjectLine(),
        message: getEmailBody()
      };

      // Send email using EmailJS
      await emailjs.send(
        'YOUR_SERVICE_ID',  // We'll replace this
        'YOUR_TEMPLATE_ID', // We'll replace this
        templateParams
      );

      setMessage('✅ Email envoyé avec succès !');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSelectedKids({ elea: false, malo: false });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPickupDate(tomorrow.toISOString().split('T')[0]);
        setMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🚌 Notification de Ramassage</h1>
        <p className="subtitle">École L'Anse-au-sable</p>

        <div className="section">
          <h2>Enfants</h2>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedKids.elea}
                onChange={() => handleKidChange('elea')}
              />
              <span>Elea (3/4e année)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedKids.malo}
                onChange={() => handleKidChange('malo')}
              />
              <span>Malo (1ère année)</span>
            </label>
          </div>
        </div>

        <div className="section">
          <h2>Date de ramassage</h2>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="date-input"
          />
        </div>

        <div className="section">
          <h2>Destinataires</h2>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={recipients.ecole_anse}
                onChange={() => handleRecipientChange('ecole_anse')}
              />
              <span>École (ecole_anse_au_sable@csf.bc.ca)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={recipients.eloise}
                onChange={() => handleRecipientChange('eloise')}
              />
              <span>Éloise Lescaut - Enseignante Elea (eloise_lescaut@csf.bc.ca)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={recipients.valerie}
                onChange={() => handleRecipientChange('valerie')}
              />
              <span>Valérie Desnoyers - Enseignante Malo (valerie_desnoyers@csf.bc.ca)</span>
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={recipients.adele}
                onChange={() => handleRecipientChange('adele')}
              />
              <span>Adèle Anctil - Admin (adele_anctil@csf.bc.ca)</span>
            </label>
          </div>
          <p className="helper-text">CC: jerome.coppens@gmail.com, stephanie.lesieur@gmail.com</p>
        </div>

        {getSubjectLine() && (
          <div className="section preview">
            <h2>Aperçu de l'email</h2>
            <div className="email-preview">
              <p><strong>Sujet:</strong> {getSubjectLine()}</p>
              <p><strong>Message:</strong></p>
              <div className="email-body">{getEmailBody()}</div>
            </div>
          </div>
        )}

        <button 
          onClick={handleSend} 
          disabled={sending || !selectedKids.elea && !selectedKids.malo}
          className="send-button"
        >
          {sending ? 'Envoi en cours...' : 'Envoyer l\'email'}
        </button>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
