// Admizz offices in Nepal. Addresses mirror src/data/cities/*.ts and GlobalPresence.tsx;
// kept as a small list so client pages don't pull in the full city landing data.

export interface NepalOffice {
  city: string;
  area: string;
  address: string;
  directionsUrl: string;
  pageHref?: string;
}

export const NEPAL_OFFICES: NepalOffice[] = [
  {
    city: "Kathmandu",
    area: "Putalisadak",
    address: "Sita Ram Square (4th Floor), Putalisadak, Opp. Nabil Bank",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Admizz+Education+Nepal,+Sita+Ram+Square,+Putalisadak,+Kathmandu",
  },
  {
    city: "Birgunj",
    area: "Ghanta Ghar",
    address: "Ghanta Ghar, Link Rd, Birgunj 44300",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Admizz+Education+Birgunj,+Ghanta+Ghar,+Link+Rd,+Birgunj+44300,+Nepal",
    pageHref: "/birgunj",
  },
  {
    city: "Janakpur",
    area: "Vishwakarma Chowk",
    address: "Vishwakarma Chowk-04, Janakpurdham (Near Sarhanchiya Kuti)",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Admizz+Education+Janakpur,+Vishwakarma+Chowk,+Janakpurdham,+Nepal",
    pageHref: "/janakpur",
  },
];
