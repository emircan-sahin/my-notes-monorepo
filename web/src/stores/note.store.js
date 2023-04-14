import create from 'zustand';

const useNoteStore = create((set) => ({
    notes: [],
    activeNote: null,
    setActiveNote: (note) => set(() => ({ activeNote: note })),
    setNotes: (notes) => set(() => ({ notes: notes })),
    
    // activeNote: null,
    // addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    // removeNote: (note) => set((state) => ({ notes: state.notes.filter((n) => n.id !== note.id) })),
    // updateNote: (note) => set((state) => ({ notes: state.notes.map((n) => (n.id === note.id ? note : n)) })),
    // clearNotes: () => set((state) => ({ notes: [] })),
}));

export default useNoteStore;