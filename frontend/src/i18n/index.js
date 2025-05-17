import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      'nav.events': 'Events',
      'nav.dashboard': 'Dashboard',
      'nav.admin': 'Admin',
      'nav.login': 'Login',
      'nav.signup': 'Sign Up',
      'nav.logout': 'Logout',
      'events.title': 'Browse Events',
      'events.search': 'Search events...',
      'events.category': 'Category',
      'events.sortBy': 'Sort By',
      'events.noEvents': 'No events available at the moment.',
      'events.noMatches': 'No events match your search.',
      'events.book': 'Book Now',
      'events.booked': 'Booked',
    }
  },
  es: {
    translation: {
      'nav.events': 'Eventos',
      'nav.dashboard': 'Panel',
      'nav.admin': 'Admin',
      'nav.login': 'Iniciar Sesión',
      'nav.signup': 'Registrarse',
      'nav.logout': 'Cerrar Sesión',
      'events.title': 'Explorar Eventos',
      'events.search': 'Buscar eventos...',
      'events.category': 'Categoría',
      'events.sortBy': 'Ordenar Por',
      'events.noEvents': 'No hay eventos disponibles en este momento.',
      'events.noMatches': 'Ningún evento coincide con tu búsqueda.',
      'events.book': 'Reservar',
      'events.booked': 'Reservado',
    }
  },
  fr: {
    translation: {
      'nav.events': 'Événements',
      'nav.dashboard': 'Tableau de Bord',
      'nav.admin': 'Admin',
      'nav.login': 'Connexion',
      'nav.signup': "S'inscrire",
      'nav.logout': 'Déconnexion',
      'events.title': 'Parcourir les Événements',
      'events.search': 'Rechercher des événements...',
      'events.category': 'Catégorie',
      'events.sortBy': 'Trier Par',
      'events.noEvents': 'Aucun événement disponible pour le moment.',
      'events.noMatches': 'Aucun événement ne correspond à votre recherche.',
      'events.book': 'Réserver',
      'events.booked': 'Réservé',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 