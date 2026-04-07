import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function Flashcard({ card, onDelete, onEdit, onLearn }) {
  const [flip, setFlip] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm("Delete this card?")) onDelete(card.id);
  };

  const handleLearn = (e) => {
    e.stopPropagation();
    onLearn(card.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(card); // Pass card data back to parent for editing
  };

  return (
    <div className={`card ${flip ? 'flip' : ''}`} onClick={() => setFlip(!flip)}>
      <div className="front">
        <button className="delete-btn" onClick={handleDeleteClick}>&times;</button>
        <button className="edit-icon-btn" onClick={handleEditClick}>✎</button>
        <div className="category">#{card.category || 'General'}</div>
        <div className="content"><strong>Q:</strong> {card.question}</div>
        <div className="hint">Click to see answer</div>
      </div>
      <div className="back">
        <div className="content">
          <strong>A:</strong> {card.answer}
          <button className="learn-btn" onClick={handleLearn}>Got it! Hide this.</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({ question: '', answer: '', category: '' });
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  //moddal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('ADD');
  const [currentEditId, setCurrentEditId] = useState(null);

  //read
  const fetchCards = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/cards');
      setCards(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleAddCard = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/cards', newCard);
      console.log("Success:", response.data);
      
      setNewCard({ question: '', answer: '', category: '' });
      fetchCards();
      alert("Card added successfully!");
    } catch (err) {
      console.error("Add failed:", err);
      alert("Failed to add card: " + err.message);
    }
  };

  const updateCard = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:8080/api/cards/${id}`, updatedData);
      fetchCards();
      alert("Updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update.");
    }
  }

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:8080/api/cards/${id}`);
      fetchCards();
    }catch (err){
      console.error('Delete error:', err);
      alert("Failed to delete card.");
    }
  }

  //hide card
  const learnCard = async (id) => {
    try{
      await axios.patch(`http://localhost:8080/api/cards/${id}/learn`, { is_learned: 1 });
      fetchCards();
    } catch (err) {
      console.error(err);
    }
  }

  const resetAllCards = async () => {
    try {
      await axios.put(`http://localhost:8080/api/cards/reset`);
      fetchCards();
      alert("All cards are back!")
    } catch (err) {
      console.error("Reset failed:", err);
      alert("Reset failed. Check server console.");
    }
  }
  
  // Open Edit Modal
  const openEditModal = (card) => {
    setModalMode('EDIT');
    setCurrentCard(card);
    setIsModalOpen(true);
  };

  // Open Add Modal
  const openAddModal = () => {
    setModalMode('ADD');
    setCurrentCard({ question: '', answer: '', category: '' });
    setIsModalOpen(true);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'ADD') {
        await axios.post('http://localhost:8080/api/cards', currentCard);
      } else {
        await axios.put(`http://localhost:8080/api/cards/${currentCard.id}`, currentCard);
      }
      setIsModalOpen(false);
      setCurrentCard({ question: '', answer: '', category: '' });
      fetchCards();
    } catch (err) {
      console.error("Operation failed:", err);
    }
  };
  

  const categories = [
    'ALL',
    ...new Set(cards.map(card => card.category).filter(cat => cat && cat.trim() !== ''))
  ];

  // Filter cards based on selection
  const filteredCards = selectedCategory === 'ALL'
    ? cards
    : cards.filter(card => card.category === selectedCategory);

  return (
    <div className="dashboard">
      {/* Top Navigation */}
      <header className="navbar">
        <div className="logo">My Flashcards</div>
        <nav className="category-nav">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`nav-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <button onClick={openAddModal} className="add-main-btn">+ New Card</button>
          <button onClick={resetAllCards} className="reset-btn">Reset All</button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="content">
        <div className="card-grid">
          {filteredCards.map(card => (
            <Flashcard key={card.id} card={card} onDelete={handleDelete} onEdit={openEditModal} onLearn={learnCard} />
          ))}
        </div>
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalMode === 'ADD' ? 'Create New Card' : 'Update Card'}</h2>
            <form onSubmit={handleSubmit}>
              <input 
                placeholder="Question" 
                value={currentCard.question} 
                onChange={e => setCurrentCard({...currentCard, question: e.target.value})} 
                required 
              />
              <input 
                placeholder="Answer" 
                value={currentCard.answer} 
                onChange={e => setCurrentCard({...currentCard, answer: e.target.value})} 
                required 
              />
              <input 
                placeholder="Category" 
                value={currentCard.category} 
                onChange={e => setCurrentCard({...currentCard, category: e.target.value})} 
              />
              <div className="modal-actions">
                <button type="submit" className="confirm-btn">Confirm</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App