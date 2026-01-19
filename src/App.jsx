import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';

// Initialize EmailJS with your public key (you'll add this after setting up EmailJS)
emailjs.init("cfbRe3pJc2BrExC6b");

function App() {
  const [selectedKids, setSelectedKids] = useState({
    elea: false,
    malo: false
  });
  
  const [pickupDate, setPickupDate] = useState('');
  
  const [recipients, setRecipients] = useState({
    ecole_anse: true,
    eloise: false,  // Elea's teacher #1 (3/4e année)
    joanne: false,  // Elea's teacher #2 (3/4e année)
    valerie: false, // Malo's teacher #1 (1ere année)
    adele: false    // Malo's teacher #2 (1ere année)
  });

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  
  // State for custom editable subject and body
  const [customSubject, setCustomSubject] = useState('');
  const [customBody, setCustomBody] = useState('');

  // Auto-update recipients based on selected kids
  useEffect(() => {
    setRecipients(prev => ({
      ...prev,
      eloise: selectedKids.elea,
      joanne: selectedKids.elea,
      valerie: selectedKids.malo,
      adele: selectedKids.malo
    }));
  }, [selectedKids]);

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPickupDate(tomorrow.toISOString().split('T')[0]);
  }, []);
  
  // Auto-update custom subject and body when kids or date change
  useEffect(() => {
    // Generate subject
    let kidsText = '';
    if (selectedKids.elea && selectedKids.malo) {
      kidsText = 'Elea (3-4e année) et Malo (1ère année) Coppens';
    } else if (selectedKids.elea) {
      kidsText = 'Elea (3-4e année) Coppens';
    } else if (selectedKids.malo) {
      kidsText = 'Malo (1ère année) Coppens';
    }
    
    if (kidsText && pickupDate) {
      const date = new Date(pickupDate + 'T00:00:00');
      const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
      const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
      const dayName = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const formattedDate = `${dayName} ${day} ${month} ${year}`;
      
      const subject = `Pas de bus (205) pour ${kidsText} - ${formattedDate}`;
      setCustomSubject(subject);
      
      // Generate body
      const verb = (selectedKids.elea && selectedKids.malo) ? 'ne prendront pas' : 'ne prendra pas';
      const body = `Bonjour !

Veuillez s'il vous plaît prendre note que ${kidsText} ${verb} le bus (205) ce ${formattedDate}.

Merci d'avance et excellent début de semaine !

Jerome et Stephanie Coppens - Lesieur`;
      setCustomBody(body);
    } else {
      setCustomSubject('');
      setCustomBody('');
    }
  }, [selectedKids, pickupDate]);

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

  const getRecipientEmails = () => {
    const emails = [];
    if (recipients.ecole_anse) emails.push('ecole_anse_au_sable@csf.bc.ca');
    if (recipients.eloise) emails.push('eloise_lescaut@csf.bc.ca');
    if (recipients.joanne) emails.push('joanne_booth@csf.bc.ca');
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

    setSending(true);
    setMessage('');

    try {
      // EmailJS template parameters
      const recipientEmails = getRecipientEmails();
      const templateParams = {
        to_email: recipientEmails || 'jerome.coppens@gmail.com',
        cc_email: 'jerome.coppens@gmail.com, stephanie.lesieur@gmail.com',
        subject: customSubject,
        message: customBody
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_u2gb2og',
        'template_8svi0g9',
        templateParams
      );

      setMessage('✅ Email envoyé avec succès !');
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSelectedKids({ elea: false, malo: false });
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setPickupDate(tomorrow.toISOString().split('T')[0]);
        setCustomSubject('');
        setCustomBody('');
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
                checked={recipients.joanne}
                onChange={() => handleRecipientChange('joanne')}
              />
              <span>Joanne Booth - Enseignante Elea (joanne_booth@csf.bc.ca)</span>
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
              <span>Adèle Anctil - Enseignante Malo (adele_anctil@csf.bc.ca)</span>
            </label>
          </div>
          <p className="helper-text">CC: jerome.coppens@gmail.com, stephanie.lesieur@gmail.com</p>
        </div>

        {customSubject && (
          <div className="section preview">
            <h2>Aperçu de l'email (modifiable)</h2>
            <div className="email-preview">
              <p><strong>To:</strong> {getRecipientEmails() || 'jerome.coppens@gmail.com, stephanie.lesieur@gmail.com'}</p>
              <p><strong>Cc:</strong> jerome.coppens@gmail.com, stephanie.lesieur@gmail.com</p>
              <p><strong>Sujet:</strong></p>
              <input
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="subject-input"
              />
              <p><strong>Message:</strong></p>
              <textarea
                value={customBody}
                onChange={(e) => setCustomBody(e.target.value)}
                className="body-textarea"
                rows="8"
              />
            </div>
          </div>
        )}

        <button 
          onClick={handleSend} 
          disabled={sending || (!selectedKids.elea && !selectedKids.malo)}
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
