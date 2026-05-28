'use client';
import { useEffect } from 'react';

export default function EventsInit() {
  useEffect(() => {
    const tabs = document.querySelectorAll<HTMLElement>('.events-tab');
    const upcomingGrid = document.getElementById('upcoming-events');
    const pastGrid = document.getElementById('past-events');
    const upcomingEmpty = document.getElementById('upcoming-empty');
    const pastEmpty = document.getElementById('past-empty');

    if (!upcomingGrid || !pastGrid || !upcomingEmpty || !pastEmpty) return;

    // Move events whose end date has passed from upcoming → past
    const now = new Date();
    const upcomingCards = upcomingGrid.querySelectorAll<HTMLElement>('.event-card');
    upcomingCards.forEach(card => {
      const endDate = new Date(card.getAttribute('data-event-end') || '');
      if (endDate < now) {
        card.classList.add('event-card-past');
        if (!card.querySelector('.event-past-badge')) {
          const badge = document.createElement('span');
          badge.className = 'event-past-badge';
          badge.textContent = 'Past Event';
          card.querySelector('.event-card-image')?.appendChild(badge);
        }
        const cta = card.querySelector('.event-card-cta');
        if (cta) cta.textContent = 'View Details →';
        pastGrid.insertBefore(card, pastGrid.firstChild);
      }
    });

    function updateEmptyStates(activeTab: string) {
      if (activeTab === 'upcoming') {
        const hasUpcoming = upcomingGrid!.querySelectorAll('.event-card').length > 0;
        upcomingGrid!.style.display = hasUpcoming ? 'grid' : 'none';
        upcomingEmpty!.style.display = hasUpcoming ? 'none' : 'block';
        pastGrid!.style.display = 'none';
        pastEmpty!.style.display = 'none';
      } else {
        const hasPast = pastGrid!.querySelectorAll('.event-card').length > 0;
        pastGrid!.style.display = hasPast ? 'grid' : 'none';
        pastEmpty!.style.display = hasPast ? 'none' : 'block';
        upcomingGrid!.style.display = 'none';
        upcomingEmpty!.style.display = 'none';
      }
    }

    updateEmptyStates('upcoming');

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        updateEmptyStates(tab.dataset.tab || 'upcoming');
      });
    });
  }, []);

  return null;
}
